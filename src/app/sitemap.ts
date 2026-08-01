import { MetadataRoute } from 'next';
import { config } from '@/lib/config';
import { blogAPI } from '@/lib/blog';

const siteUrl = config.siteUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const response = await blogAPI.getPosts({
      status: 'published',
      limit: 1000,
      sort_by: 'published_at',
      sort_order: 'desc',
    });

    if (response.posts && Array.isArray(response.posts)) {
      blogPosts = response.posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  let blogCategories: MetadataRoute.Sitemap = [];
  try {
    const categoriesResponse = await blogAPI.getCategories();
    if (categoriesResponse.categories && Array.isArray(categoriesResponse.categories)) {
      blogCategories = categoriesResponse.categories.map((category) => ({
        url: `${siteUrl}/blog/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Error fetching blog categories for sitemap:', error);
  }

  return [...staticPages, ...blogPosts, ...blogCategories];
}
