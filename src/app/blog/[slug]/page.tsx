import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIconUrl, getOptimizedImageUrl } from '@adelfeyz/sdk';
import { blogAPI, blogUtils } from '@/lib/blog';
import BlogContentRenderer from '@/components/blog/BlogContentRenderer';
import NewsletterSignup from '@/components/newsletter/NewsletterSignup';
import Link from 'next/link';
import BlogViewTracker from '@/components/blog/BlogViewTracker';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlogPost(slug: string) {
  try {
    const post = await blogAPI.getPost(slug);
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - کادوسا',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: post.seo_title || `${post.title} - کادوسا`,
    description: post.seo_description || post.excerpt || blogUtils.getExcerpt(post.content, 160),
    keywords: post.meta_keywords,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || blogUtils.getExcerpt(post.content, 160),
      type: 'article',
      publishedTime: post.published_at,
      authors: post.author ? [post.author.name] : undefined,
      images: post.featured_image_url ? [post.featured_image_url] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || blogUtils.getExcerpt(post.content, 160),
      images: post.featured_image_url ? [post.featured_image_url] : undefined,
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Track post view
  try {
    await blogAPI.trackPostView(post.id);
  } catch (error) {
    console.error('Error tracking post view:', error);
  }

          // Parse the TipTap content for validation
        let isValidContent = false;
        try {
          JSON.parse(post.content);
          isValidContent = true;
        } catch (error) {
          console.error('Error parsing TipTap content:', error);
        }

  // Generate JSON-LD for article
  const { getCanonicalUrl, generateBreadcrumbSchema } = await import('@/lib/seo');
  const { config } = await import('@/lib/config');
  const siteUrl = config.siteUrl;
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);
  
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo_description || post.excerpt || post.title,
    image: post.featured_image_url ? [post.featured_image_url] : [`${siteUrl}/og-image.jpg`],
    author: {
      '@type': 'Person',
      name: post.author?.name || 'تیم لبخند',
      ...(post.author?.bio && { description: post.author.bio }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'لبخند',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getCanonicalUrl(`/blog/${post.slug}`),
    },
    ...(post.categories && post.categories.length > 0 && {
      articleSection: post.categories.map(cat => cat.name),
    }),
    ...(post.tags && post.tags.length > 0 && {
      keywords: post.tags.map(tag => tag.name).join(', '),
    }),
    wordCount: post.content ? post.content.length / 5 : 0, // Rough estimate
    ...(post.reading_time && { timeRequired: `PT${post.reading_time}M` }),
  };

  return (
    <>
      {/* GA4 Blog View Tracking */}
      <BlogViewTracker 
        postSlug={post.slug}
        postTitle={post.title}
        category={post.categories && post.categories[0] ? post.categories[0].name : undefined}
      />
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              {post.categories && post.categories.map((category) => (
                <span 
                  key={category.id}
                  className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${category.color}40` }}
                >
                  {category.name}
                </span>
              ))}
              <span className="text-white/80 text-sm">
                {post.reading_time || blogUtils.calculateReadingTime(post.content)} min read
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                {post.excerpt}
              </p>
            )}

            {post.author && (
              <div className="flex items-center justify-center gap-4">
                {post.author.avatar_url ? (
                  <img src={getIconUrl(post.author.avatar_url)} alt={post.author.name} className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {post.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="text-start">
                  <p className="font-semibold text-white">{post.author.name}</p>
                  {post.author.title && (
                    <p className="text-white/80 text-sm">{post.author.title}</p>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8 text-white/60 text-sm">
              Published on {blogUtils.formatDate(post.published_at || post.created_at)}
              {post.view_count > 0 && (
                <span className="ms-4">
                  {post.view_count.toLocaleString()} views
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image_url && (
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <img 
                src={getOptimizedImageUrl(post.featured_image_url)} 
                alt={post.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>
      )}

                   {/* Article Content */}
             <section className="py-16 bg-white">
               <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="max-w-4xl mx-auto">
                   <article className="prose prose-lg max-w-none">
                     {isValidContent ? (
                       <BlogContentRenderer content={post.content} />
                     ) : (
                       <div className="text-center py-12">
                         <i className="fa-solid fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                         <h3 className="text-lg font-medium text-gray-900 mb-2">Content could not be loaded</h3>
                         <p className="text-gray-600">The article content is not available in the expected format.</p>
                       </div>
                     )}
                   </article>
                 </div>
               </div>
             </section>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-medium">Tags:</span>
                {post.tags.map((tag) => (
                  <span 
                    key={tag.id}
                    className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border border-gray-200"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Author Bio */}
      {post.author && post.author.bio && (
        <section className="py-12 bg-white border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-start gap-6">
                  {post.author.avatar_url ? (
                    <img src={getIconUrl(post.author.avatar_url)} alt={post.author.name} className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 font-medium text-xl">
                        {post.author.name ? post.author.name.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">About {post.author.name || 'Unknown Author'}</h3>
                    <p className="text-gray-600 mb-3">{post.author.bio}</p>
                    {post.author.credentials && (
                      <p className="text-sm text-gray-500">{post.author.credentials}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup 
              variant="inline"
              title="Enjoyed this article?"
              description="Get more dental health tips and insights delivered to your inbox weekly."
            />
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition font-medium"
            >
              <i className="fa-solid fa-arrow-start"></i>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
