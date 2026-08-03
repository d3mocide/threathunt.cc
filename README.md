# Threat Hunt

Source for [threathunt.cc](https://threathunt.cc) — William Shields' security write-ups.
Built with [Astro](https://astro.build), deployed to GitHub Pages via GitHub Actions.

## Local development

Requires Node.js (version pinned in `.nvmrc`). If you use [nvm](https://github.com/nvm-sh/nvm):

```sh
nvm use
```

Then:

```sh
npm install
npm run dev
```

The site runs at `http://localhost:4321`.

## Adding a post

1. Create a new folder under `src/content/blog/`, named after the post's slug, e.g.
   `src/content/blog/my-new-box/`.
2. Add an `index.md` inside it with frontmatter:

   ```md
   ---
   title: "HTB | My New Box"
   date: 2026-01-01T12:00:00-05:00
   tags: [htb, write-ups, red-team, ctf]
   description: "Optional one-line summary for SEO/RSS."
   ---

   Your write-up content here.
   ```

3. Drop any screenshots in the same folder and reference them with a relative path,
   e.g. `![gobuster results](gobuster.png)`.
4. Commit and push to `main`. GitHub Actions builds and deploys the site automatically —
   nothing else to run.

To hold a post back from publishing, add `draft: true` to its frontmatter.

## Editing the About page

`src/content/pages/about.md` — same idea, just markdown + frontmatter.

## Project structure

```
src/
  config.ts          # site title, tagline, author, social links
  content.config.ts  # frontmatter schema for posts/pages
  content/
    blog/<slug>/index.md   # posts (with colocated images)
    pages/about.md
  layouts/            # BaseLayout, PostLayout
  components/          # Header, Footer, ThemeToggle, PostCard, TagPill
  pages/                # routes: /, /posts/[slug], /tags, /about, /rss.xml
public/
  CNAME                 # custom domain (threathunt.cc)
```

## Deployment

Pushing to `main` triggers `.github/workflows/pages-deploy.yml`, which builds the site
with `npm run build` and publishes `dist/` to GitHub Pages. No manual steps required.

## License

This work is published under the [MIT][mit] License.

[mit]: ./LICENSE
