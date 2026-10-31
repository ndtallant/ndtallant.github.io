import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'

export const dynamic = 'force-static'

function escapeXml(value: string) {
  return value.replace(/[<>&"']/g, (char) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
  })[char]!)
}

export function GET() {
  const items = getBlogPosts()
    .sort((a, b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt))
    .map(({ metadata, slug }) => `<item>
      <title>${escapeXml(metadata.title)}</title>
      <link>${baseUrl}/blog/${slug}/</link>
      <guid>${baseUrl}/blog/${slug}/</guid>
      <description>${escapeXml(metadata.summary || '')}</description>
      <pubDate>${new Date(metadata.publishedAt).toUTCString()}</pubDate>
    </item>`).join('\n')

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"><channel>
      <title>Nick Tallant</title>
      <link>${baseUrl}</link>
      <description>Writing by Nick Tallant on software and civic technology.</description>
      ${items}
    </channel></rss>`, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
