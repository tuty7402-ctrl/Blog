# urw7

Personal site / blog shell. Static HTML, no build step.

## Deploy to Vercel

**Option A — Vercel CLI**
```
npm i -g vercel
cd this-folder
vercel
```
Follow the prompts (link/create project, accept defaults). It'll give you a live URL immediately.

**Option B — GitHub + Vercel dashboard**
1. Push this folder to a GitHub repo.
2. Go to https://vercel.com/new
3. Import the repo.
4. Framework preset: "Other" (it's plain static HTML, no build needed).
5. Deploy.

## Adding posts later

Right now `posts/` is just a placeholder folder with no content — the homepage shows "no posts yet."
When you're ready to add real posts, the easiest next step is either:
- Hardcoded HTML pages per post (simple, more files)
- Switching to a static site generator that reads Markdown (more setup, easier long-term)

Just ask and I can wire up either approach.

## Structure

```
index.html      <- the whole site right now
posts/          <- empty, reserved for future post pages
vercel.json     <- deployment config (clean URLs, no trailing slash)
```
