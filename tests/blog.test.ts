import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { getBlogPosts, formatDate } from '../app/blog/utils'
import { GET } from '../app/rss/route'
import sitemap from '../app/sitemap'
import { thoughtsEnabled } from '../app/site-config'
import { education, experience } from '../app/data/resume'

test('MDX discovery, metadata, RSS escaping, and sitemap entries', async () => {
  const originalDirectory = process.cwd()
  const directory = mkdtempSync(path.join(tmpdir(), 'portfolio-test-'))
  const posts = path.join(directory, 'app/blog/posts')
  mkdirSync(posts, { recursive: true })
  try {
    process.chdir(directory)
    assert.deepEqual(getBlogPosts(), [])
    writeFileSync(path.join(posts, 'ignored.txt'), 'Not a post')
    writeFileSync(path.join(posts, 'test-post.mdx'), `---
title: 'Tools & systems: <an example>'
publishedAt: '2026-01-01'
summary: 'Testing & learning'
---
# A heading

Some **MDX** content.
`)
    const [post] = getBlogPosts()
    assert.equal(post.slug, 'test-post')
    assert.equal(post.metadata.title, 'Tools & systems: <an example>')
    assert.match(post.content, /Some \*\*MDX\*\* content/)
    const response = GET()
    assert.match(response.headers.get('Content-Type')!, /application\/rss\+xml/)
    const xml = await response.text()
    const urls = (await sitemap()).map((entry) => entry.url)
    if (thoughtsEnabled) {
      assert.match(xml, /Tools &amp; systems: &lt;an example&gt;/)
      assert.match(xml, /https:\/\/nicktallant.com\/blog\/test-post\//)
      assert.ok(urls.includes('https://nicktallant.com/blog/test-post'))
      assert.equal(urls.length, 3)
      assert.ok(urls.includes('https://nicktallant.com/blog'))
    } else {
      assert.doesNotMatch(xml, /<item>|test-post|Tools/)
      assert.deepEqual(urls, ['https://nicktallant.com'])
    }
  } finally {
    process.chdir(originalDirectory)
    rmSync(directory, { recursive: true, force: true })
  }
})

test('dates and migrated résumé data', () => {
  assert.equal(formatDate('2020-05-10'), 'May 10, 2020')
  assert.equal(experience.length, 6)
  assert.equal(education.length, 2)
  assert.equal(experience[1].highlights.length, 3)
  for (const entry of [...experience, ...education]) {
    assert.ok(entry.title && entry.organization && entry.period)
    assert.ok(entry.description || entry.highlights.length)
  }
})
