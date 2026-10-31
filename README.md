# Nick Tallant

Next.js App Router portfolio based on Vercel’s [Portfolio Starter Kit](https://vercel.com/templates/next.js/portfolio-starter-kit) ([source](https://github.com/vercel/examples/tree/main/solutions/blog), MIT). Uses React, TypeScript, Tailwind CSS, Geist, and local MDX. The homepage preserves the original MyResume visual design without Bootstrap or its JavaScript dependencies: full-height photo hero, typing effect, scroll-aware side navigation, smooth section links, fade-in sections, responsive two-column résumé, and back-to-top control. Open Sans, Raleway, and Poppins are self-hosted; motion respects reduced-motion preferences.

## Development

Requires Node.js 24+ and pnpm 11.17.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. Check changes with:

```sh
pnpm test
pnpm typecheck
pnpm build
```

Optional interaction/layout regression checks use Python Playwright: install it with `pip install playwright` and `playwright install chromium`, then run `python3 tests/browser-check.py` after a build. This checks animated scrolling, active navigation, desktop columns/mobile stacking, the menu, back-to-top, cross-page anchors, reduced motion, and viewport overflow.

`pnpm build` creates a fully static site in `out/`. Preview it with `python3 -m http.server 3000 --directory out`. No Next.js server is required in production.

## Editing content

- **Homepage:** `app/page.tsx` — bio, portrait, writing, and contact sections.
- **Résumé:** `app/data/resume.ts` — professional experience and education. `app/components/resume.tsx` provides reusable `Resume`, `ResumeGroup`, and `ResumeItem` components.
- **Homepage styling:** `app/home.css`; shared MDX/blog styling: `app/global.css`.
- **Homepage interactions:** `app/components/nav.tsx`, `hero.tsx`, and `site-shell.tsx`.
- **Social links:** `app/components/social-links.tsx` (shared by the hero and footer).
- **Images:** `public/`.
- **Domain:** `app/sitemap.ts`, `public/CNAME`, and the root `CNAME`.

### Publishing a post

Create `app/blog/posts/your-post-slug.mdx`:

```mdx
---
title: 'Your post title'
publishedAt: '2026-10-31'
summary: 'A short description for search results and RSS.'
---

## A heading

Write your post here. **Markdown**, links, code blocks, and MDX are supported.
```

Commit and deploy to publish at `/blog/your-post-slug/`. The homepage, blog index, RSS feed (`/rss`), and sitemap update automatically at build time. Only trusted, repository-authored MDX should be used: MDX can execute code during compilation. Filenames become public URLs; use lowercase hyphenated names.

No example posts are published. An internal `__empty` route resolves to the 404 page while the blog is empty, because Next.js static export requires at least one generated parameter for a dynamic route. It disappears from the build once a real post exists and is never listed in the index, RSS, or sitemap.

## Deployment

### GitHub Pages (existing custom domain)

`.github/workflows/deploy.yml` tests, builds, and deploys `out/` on pushes to `main` or `master`, or manual dispatch. In **Settings → Pages**, set the source to **GitHub Actions** and keep the custom domain set to `nicktallant.com`. If your production branch has another name, update the workflow trigger. The `refresh` working branch does not auto-deploy.

`public/CNAME` and `public/.nojekyll` are copied into the export. Existing DNS configuration can remain in place.

### Vercel

Import this repository, use the Next.js preset, and run `pnpm build`. The static-export configuration works on Vercel too. No analytics or tracking scripts are enabled by default.

## Template attribution

Adapted from `vercel/examples/solutions/blog` at commit `de867239d0a7dd55c9130f1e3f87fcf877db96e8`. Upstream copyright and license are retained in `LICENSE`. Homepage styles are adapted from [MyResume v4.7.0 by BootstrapMade](https://bootstrapmade.com/free-html-bootstrap-template-my-resume/), under [BootstrapMade’s license](https://bootstrapmade.com/license/); the footer attribution is retained.
