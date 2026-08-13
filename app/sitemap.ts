import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { posts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  // The homepage, the standalone content pages, the blog index, and every post. Fragment URLs
  // (#how, #compare) are stripped by crawlers and would just duplicate the homepage, so they are not
  // listed. Post lastmod uses the post's own date so crawlers see accurate freshness.
  const now = new Date()
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date((p.updated || p.date) + 'T00:00:00Z'),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))
  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    ...postEntries,
  ]
}
