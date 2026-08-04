# Threat Hunt

Source for [threathunt.cc](https://threathunt.cc) — William Shields' RF/SIGINT and
wardriving build write-ups. Built with [Astro](https://astro.build), deployed to
GitHub Pages via GitHub Actions.

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
   title: "Decoding TPMS with an RTL-SDR"
   date: 2026-01-01T12:00:00-05:00
   category: sigint
   tags: [rtl-sdr, tpms, wardriving]
   description: "Optional one-line summary for SEO/RSS."
   ---

   Your write-up content here.
   ```

   `category` is required and must be either `sigint` (captures, decodes, coverage
   tests, field notes) or `builds` (hardware/device build logs). `tags` stay freeform —
   use them for hardware, protocol, and technique.

3. Drop any screenshots in the same folder and reference them with a relative path,
   e.g. `![gobuster results](gobuster.png)`.
4. Commit and push to `main`. GitHub Actions builds and deploys the site automatically —
   nothing else to run.

To hold a post back from publishing, add `draft: true` to its frontmatter.

## Editing the About page

`src/content/pages/about.md` — same idea, just markdown + frontmatter.

## Editing the Projects page

`src/data/projects.ts` — a plain array of `{ name, tagline, description, repoUrl, tech }`
entries rendered at `/projects/`. Add, edit, or reorder entries there; no frontmatter
involved since these aren't blog posts.

## Project structure

```
src/
  config.ts          # site title, tagline, author, social links
  content.config.ts  # frontmatter schema for posts/pages (category + tags)
  content/
    blog/<slug>/index.md   # posts (with colocated images)
    pages/about.md
  data/
    projects.ts       # GitHub project cards shown at /projects/
  layouts/            # BaseLayout, PostLayout
  components/          # Header, Footer, ThemeToggle, PostCard, ProjectCard, TagPill, CategoryBadge
  pages/                # routes: /, /posts/[slug], /projects, /categories/[category], /tags, /about, /rss.xml
public/
  CNAME                 # custom domain (threathunt.cc)
```

## Deployment

Pushing to `main` triggers `.github/workflows/pages-deploy.yml`, which builds the site
with `npm run build` and publishes `dist/` to GitHub Pages. No manual steps required.

## License

This work is published under the [MIT][mit] License.

[mit]: ./LICENSE
