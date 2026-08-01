import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIconUrl, getThumbnailUrl } from '@adelfeyz/sdk';
import { blogAPI, blogUtils } from '@/lib/blog';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

async function getCategoryData(slug: string, page: number = 1) {
  try {
    const [categoryResponse, postsResponse] = await Promise.all([
      blogAPI.getCategories(),
      blogAPI.getPosts({ 
        status: 'published', 
        category: slug,
        page,
        limit: 12,
        sort_by: 'published_at',
        sort_order: 'desc'
      })
    ]);

    const category = categoryResponse.categories.find(cat => cat.slug === slug);
    const otherCategories = categoryResponse.categories.filter(cat => cat.slug !== slug);
    
    if (!category) {
      return null;
    }

    return {
      category,
      otherCategories,
      posts: postsResponse.posts,
      totalPosts: postsResponse.total,
      currentPage: page,
      totalPages: Math.ceil(postsResponse.total / 12)
    };
  } catch (error) {
    console.error('Error fetching category data:', error);
    return null;
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryData = await getCategoryData(slug);
  
  if (!categoryData) {
    return {
      title: 'Category Not Found - لبخند',
      description: 'The requested category could not be found.'
    };
  }

  const { category, totalPosts } = categoryData;

  const { getCanonicalUrl, generateCollectionPageSchema, generateBreadcrumbSchema } = await import('@/lib/seo');
  
  return {
    title: `${category.name} Articles - لبخند Blog`,
    description: category.description || `Browse ${totalPosts} articles in the ${category.name} category. Dental health tips and insights from لبخند.`,
    alternates: {
      canonical: `/blog/category/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} Articles - لبخند Blog`,
      description: category.description || `Browse ${totalPosts} articles in the ${category.name} category.`,
      type: 'website',
      url: getCanonicalUrl(`/blog/category/${category.slug}`),
    }
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  
  const categoryData = await getCategoryData(slug, currentPage);

  if (!categoryData) {
    notFound();
  }

  const { category, otherCategories, posts, totalPosts, totalPages } = categoryData;

  // Generate structured data
  const { generateCollectionPageSchema, generateBreadcrumbSchema } = await import('@/lib/seo');
  const collectionPageSchema = generateCollectionPageSchema(
    category.name,
    `/blog/category/${category.slug}`,
    totalPosts
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: category.name, url: `/blog/category/${category.slug}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {/* Category Hero Section */}
      <section 
        className="relative py-20"
        style={{ backgroundColor: `${category.color}20` }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center gap-2 text-sm mb-6">
              <Link href="/blog" className="text-gray-600 hover:text-primary-600 transition">
                Blog
              </Link>
              <i className="fa-solid fa-chevron-left text-gray-400 text-xs"></i>
              <span className="text-gray-900 font-medium">Categories</span>
              <i className="fa-solid fa-chevron-left text-gray-400 text-xs"></i>
              <span className="text-gray-900 font-medium">{category.name}</span>
            </nav>

            <div className="flex items-center justify-center gap-4 mb-6">
              {category.icon && (
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: category.color }}
                >
                  <i className={`fa-solid ${category.icon} text-white text-2xl`}></i>
                </div>
              )}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h1>
                <p className="text-lg text-gray-600">
                  {totalPosts} {totalPosts === 1 ? 'article' : 'articles'}
                </p>
              </div>
            </div>
            
            {category.description && (
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {posts.length > 0 ? (
              <>
                {/* Articles Grid */}
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
                          <span 
                            className="px-2 py-1 text-xs font-medium rounded-full"
                            style={{ 
                              backgroundColor: `${category.color}20`,
                              color: category.color
                            }}
                          >
                            {category.name}
                          </span>
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
                        href={`/blog/category/${slug}?page=${currentPage - 1}`}
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
                              href={`/blog/category/${slug}?page=${pageNum}`}
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
                        href={`/blog/category/${slug}?page=${currentPage + 1}`}
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
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon ? (
                    <i className={`fa-solid ${category.icon} text-3xl`} style={{ color: category.color }}></i>
                  ) : (
                    <i className="fa-solid fa-newspaper text-3xl text-gray-400"></i>
                  )}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No articles in this category yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Check back soon for new content in {category.name}.
                </p>
                <Link 
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition font-medium"
                >
                  <i className="fa-solid fa-arrow-start"></i>
                  Browse All Articles
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Other Categories</h2>
              <div className="h-1 w-24 bg-secondary-500 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* All Articles Link */}
              <Link 
                href="/blog"
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition group text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-list text-primary-600 text-xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition mb-2">
                  All Articles
                </h3>
                <p className="text-gray-600">Browse all blog posts</p>
              </Link>

              {/* Other Categories */}
              {otherCategories.slice(0, 5).map((cat) => (
                <Link 
                  key={cat.id}
                  href={`/blog/category/${cat.slug}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.icon && (
                        <i className={`${cat.icon} text-white text-xl`}></i>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition">
                      {cat.name}
                    </h3>
                  </div>
                  {cat.description && (
                    <p className="text-gray-600">{cat.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
