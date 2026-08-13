import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  // The homepage plus the standalone content pages. Fragment URLs (#how, #compare) are stripped by
  // crawlers and would just show up as duplicates of the homepage, so they are not listed.
  const now = new Date()
  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ]
}
