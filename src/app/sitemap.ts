import { MetadataRoute } from 'next';
import { SEED_BOOKS } from '@/lib/data/seedData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pataghor.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/track`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/wishlist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const bookRoutes: MetadataRoute.Sitemap = SEED_BOOKS.map((book) => ({
    url: `${baseUrl}/book/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...bookRoutes];
}

