import { Metadata } from 'next';
import { getIconUrl, getThumbnailUrl } from '@adelfeyz/sdk';
import { blogAPI, blogUtils } from '@/lib/blog';
import Link from 'next/link';
import { Suspense } from 'react';



interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    category?: string;
  }>;
}

async function getSearchResults(query: string, page: number = 1, category?: string) {
  if (!query || query.trim().length === 0) {
    return {
      posts: [],
      total: 0,
      currentPage: page,
      totalPages: 0,
      searchQuery: query
    };
  }

  try {
    const searchParams = {
      status: 'published' as const,
      search: query.trim(),
      page,
      limit: 12,
      sort_by: 'published_at' as const,
      sort_order: 'desc' as const,
      ...(category && { category })
    };

    const postsResponse = await blogAPI.getPosts(searchParams);

    return {
      posts: postsResponse.posts,
      total: postsResponse.total,
      currentPage: page,
      totalPages: Math.ceil(postsResponse.total / 12),
      searchQuery: query
    };
  } catch (error) {
    console.error('Error fetching search results:', error);
    return {
      posts: [],
      total: 0,
      currentPage: page,
      totalPages: 0,
      searchQuery: query
    };
  }
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q || '';

  if (!query) {
    const { getCanonicalUrl } = await import('@/lib/seo');
    return {
      title: 'Search - لبخند Blog',
      description: 'Search for articles on dental health, oral care, and dental services.',
      alternates: {
        canonical: '/blog/search',
      },
      openGraph: {
        title: 'Search - لبخند Blog',
        description: 'Search for articles on dental health, oral care, and dental services.',
        url: getCanonicalUrl('/blog/search'),
      },
    };
  }

  const { getCanonicalUrl } = await import('@/lib/seo');
  
  return {
    title: `Search results for "${query}" - لبخند Blog`,
    description: `Search results for "${query}". Find articles on dental health, oral care, and dental services.`,
    alternates: {
      canonical: `/blog/search?q=${encodeURIComponent(query)}`,
    },
    openGraph: {
      title: `Search results for "${query}" - لبخند Blog`,
      description: `Search results for "${query}". Find articles on dental health, oral care, and dental services.`,
      url: getCanonicalUrl(`/blog/search?q=${encodeURIComponent(query)}`),
    }
  };
}

async function SearchResults({ searchParams }: { searchParams: { q?: string; page?: string; category?: string } }) {
  const query = searchParams.q || '';
  const currentPage = parseInt(searchParams.page || '1', 10);
  const category = searchParams.category;

  const { posts, total, totalPages, searchQuery } = await getSearchResults(query, currentPage, category);

  if (!searchQuery || searchQuery.trim().length === 0) {
    return (
      <div className="text-center py-16">
        <i className="fa-solid fa-search text-4xl text-gray-300 mb-4"></i>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Search our blog</h3>
        <p className="text-gray-600 mb-6">Enter a search term to find relevant articles</p>
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition font-medium"
        >
          <i className="fa-solid fa-arrow-start"></i>
          Browse All Articles
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Search Results Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Search Results for &ldquo;{searchQuery}&rdquo;
        </h2>
        <p className="text-gray-600">
          {total > 0 ? (
            <>
              Found {total} {total === 1 ? 'article' : 'articles'}
              {category && (
                <span className="ms-1">in category &ldquo;{category}&rdquo;</span>
              )}
            </>
          ) : (
            <>No articles found for your search</>
          )}
        </p>
      </div>

      {posts.length > 0 ? (
        <>
          {/* Results Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
                {post.featured_image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={getThumbnailUrl(post.featured_image_url)} 
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {post.categories && post.categories[0] && (
                      <Link
                        href={`/blog/category/${post.categories[0].slug}`}
                        className="px-2 py-1 text-xs font-medium rounded-full hover:opacity-80 transition"
                        style={{ 
                          backgroundColor: `${post.categories[0].color}20`,
                          color: post.categories[0].color
                        }}
                      >
                        {post.categories[0].name}
                      </Link>
                    )}
                    <span className="text-gray-500 text-xs">
                      {post.reading_time || blogUtils.calculateReadingTime(post.content)} min read
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt || blogUtils.getExcerpt(post.content, 120)}
                  </p>
                  <div className="flex items-center justify-between">
                    {post.author && (
                      <div className="flex items-center gap-2">
                        {post.author.avatar_url ? (
                          <img src={getIconUrl(post.author.avatar_url)} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="text-primary-600 font-medium text-xs">
                              {post.author.name ? post.author.name.charAt(0).toUpperCase() : '?'}
                            </span>
                          </div>
                        )}
                        <span className="text-sm text-gray-700">{post.author.name || 'Unknown Author'}</span>
                      </div>
                    )}
                    <span className="text-sm text-gray-500">
                      {blogUtils.formatDate(post.published_at || post.created_at)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4">
              {currentPage > 1 && (
                <Link 
                  href={`/blog/search?q=${encodeURIComponent(searchQuery)}&page=${currentPage - 1}${category ? `&category=${category}` : ''}`}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                >
                  <i className="fa-solid fa-chevron-start text-sm"></i>
                  Previous
                </Link>
              )}
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <Link
                        key={pageNum}
                        href={`/blog/search?q=${encodeURIComponent(searchQuery)}&page=${pageNum}${category ? `&category=${category}` : ''}`}
                        className={`px-3 py-2 rounded-lg transition ${
                          pageNum === currentPage
                            ? 'bg-primary-600 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <span key={pageNum} className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              {currentPage < totalPages && (
                <Link 
                  href={`/blog/search?q=${encodeURIComponent(searchQuery)}&page=${currentPage + 1}${category ? `&category=${category}` : ''}`}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                >
                  Next
                  <i className="fa-solid fa-chevron-left text-sm"></i>
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <i className="fa-solid fa-search text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-6">
            Try different keywords or browse our categories instead.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/blog"
              className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition font-medium"
            >
              Browse All Articles
            </Link>
            <Link 
              href="/blog#categories"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition font-medium"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      {/* Search Hero */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Search Articles
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find articles on aging at home, caregiving, health, and wellness
            </p>

            {/* Search Form */}
            <form action="/blog/search" method="GET" className="max-w-2xl mx-auto">
              <div className="relative">
                <input 
                  type="text" 
                  name="q"
                  defaultValue={resolvedSearchParams.q || ''}
                  placeholder="Search articles..." 
                  className="w-full px-6 py-4 pe-16 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg shadow-sm"
                  autoComplete="off"
                />
                <button 
                  type="submit"
                  className="absolute end-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition"
                >
                  <i className="fa-solid fa-search text-lg"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Suspense fallback={
              <div className="text-center py-12">
                <i className="fa-solid fa-spinner fa-spin text-4xl text-primary-600 mb-4"></i>
                <p className="text-gray-600">Searching...</p>
              </div>
            }>
              <SearchResults searchParams={resolvedSearchParams} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
