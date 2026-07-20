'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getThumbnailUrl } from '@adelfeyz/sdk';
import { blogAPI } from '@/lib/blog';
import NewsletterSignup from '@/components/newsletter/NewsletterSignup';
import type { BlogPost } from '@/types/blog';

const BlogPostsSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogAPI.getPosts({
          status: 'published',
          limit: 5,
          sort_by: 'published_at',
          sort_order: 'desc'
        });
        setPosts(response.posts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, posts.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, posts.length - 2)) % Math.max(1, posts.length - 2));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getExcerpt = (content: string, maxLength: number = 120) => {
    // Remove HTML tags and get plain text
    const plainText = content.replace(/<[^>]*>/g, '');
    if (plainText.length <= maxLength) {
      return plainText;
    }
    return plainText.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-iran-sans">مرکز دانش</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-iran-sans">
              آخرین مقالات، راهنماها و نکات کاربردی در زمینه مدیریت استراتژیک، OKR و ارزیابی عملکرد
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  const visiblePosts = posts.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-iran-sans">مرکز دانش</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-iran-sans">
            آخرین مقالات، راهنماها و نکات کاربردی در زمینه مدیریت استراتژیک، OKR و ارزیابی عملکرد
          </p>
        </div>
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 overflow-hidden">
            {visiblePosts.map((post, index) => (
              <div key={post.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Featured Image */}
                <div className="rounded-xl overflow-hidden mb-6 relative h-64">
                  {post.featured_image_url ? (
                    <Image
                      src={getThumbnailUrl(post.featured_image_url)}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold font-iran-sans">مقاله</span>
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="space-y-4">
                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500 font-iran-sans">
                    <span>{post.author?.name || 'مدیر'}</span>
                    <span>{post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 font-iran-sans">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 line-clamp-3 font-iran-sans">
                    {post.excerpt || getExcerpt(post.content)}
                  </p>

                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map((category) => (
                        <span
                          key={category.id}
                          className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Link */}
                  <div className="pt-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary hover:text-primary/80 font-semibold text-sm transition-colors font-iran-sans"
                    >
                      ادامه مطلب ←
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          {posts.length > 3 && (
            <div className="flex justify-center items-center gap-4 mb-8">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="مقالات قبلی"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <span className="text-sm text-gray-500 font-iran-sans">
                {currentIndex + 1} از {Math.max(1, posts.length - 2)}
              </span>
              
              <button
                onClick={nextSlide}
                disabled={currentIndex >= posts.length - 3}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="مقالات بعدی"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mb-8">
            <NewsletterSignup 
              variant="compact"
              title="می‌خواهید از آخرین مطالب و راهنماهای مدیریت استراتژیک باخبر شوید؟"
              description="با عضویت در خبرنامه، هفتگی آخرین مقالات، نکات کاربردی و محتوای اختصاصی را دریافت کنید."
            />
          </div>

          {/* View More Posts Button */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block bg-primary text-primary-foreground text-sm font-iran-sans font-semibold py-5 px-10 rounded-[30px] transition-colors hover:bg-primary/90"
            >
              مشاهده مقالات بیشتر
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostsSection;
