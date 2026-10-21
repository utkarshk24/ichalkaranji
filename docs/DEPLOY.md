# Deploying the portal

The site is a Next.js 16 app. Every page is pre-rendered at build time, but it needs a Node runtime for the
locale redirect (`src/proxy.ts` sends `/` to `/en`, `/mr` or `/hi`) and the security headers. Vercel, Netlify or any
Node 20.9+ host works.

## 1. Before the first deploy

| Variable | Required | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | The public address, e.g. `https://ichalkaranji.info`. Used for canonical links, hreflang, the sitemap, robots.txt, Open Graph and JSON-LD. Until it is set, all of these point at the placeholder `https://ichalkaranji.example`. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Recommended | The portal team's shared inbox. Turns on the /contact form (it opens the visitor's mail app). Leave empty to keep the form disabled. Use a team address, never a personal one. |
| `NEXT_PUBLIC_IMC_URL` | No | Municipal corporation website (default `https://ichalkaranjimnp.in`). |
| `NEXT_PUBLIC_DISTRICT_URL` | No | District website (default `https://kolhapur.gov.in`). |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | No | Unused unless the map is switched to Mapbox tiles; OpenStreetMap is the default. |

All of them are read at **build** time, so change them in the host's settings and redeploy.

## 2. GitHub Pages (static, free)

The repository includes `.github/workflows/pages.yml`, which builds a static export and publishes it at
`https://<owner>.github.io/<repo>/` (here: **https://utkarshk24.github.io/ichalkaranji/**) on every push to `main`.

1. One time only: in the repository, open **Settings → Pages → Build and deployment** and set **Source** to
   **GitHub Actions**.
2. Push to `main` (or run the workflow from the **Actions** tab). The site URL appears on the workflow run.
3. Optional: add a repository variable `CONTACT_EMAIL` (Settings → Secrets and variables → Actions → Variables)
   to switch on the contact form.

How the static build differs from the Node build:

- It is built with `GITHUB_PAGES=true` and `NEXT_PUBLIC_BASE_PATH=/<repo>`; every URL ends in `/`.
- There is no server, so `/` is a small page that sends visitors to `/en/`, `/mr/` or `/hi/` — their last choice in
  the language switcher, else the browser's language.
- Pages can't send HTTP headers: the Content Security Policy is included as a `<meta>` tag, and GitHub provides
  HTTPS. `X-Frame-Options` and `frame-ancestors` aren't available on Pages.
- `robots.txt` and `sitemap.xml` are published under `/<repo>/`. Search engines only read `robots.txt` at the
  domain root, so submit the sitemap URL directly in Search Console.

To test the static build locally:

```bash
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/ichalkaranji NEXT_PUBLIC_SITE_URL=https://utkarshk24.github.io/ichalkaranji npm run build
mkdir -p /tmp/site && rm -rf /tmp/site/ichalkaranji && cp -r out /tmp/site/ichalkaranji
cd /tmp/site && python3 -m http.server 3200   # open http://localhost:3200/ichalkaranji/
```

## 3. Vercel (Node, with HTTP security headers)

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project**, import the repository. The framework is detected as Next.js; keep the default
   build command (`npm run build`) and output.
3. Add the environment variables above for *Production* (and *Preview* if you want previews to work the same).
4. Deploy, then add your domain under **Settings → Domains**. Set `NEXT_PUBLIC_SITE_URL` to that domain and redeploy.

## 4. Any Node host (VPS, Render, Railway, etc.)

```bash
git clone <repo> ichalkaranji-portal && cd ichalkaranji-portal
npm ci
cp .env.example .env.production.local   # then edit the values
npm run build
npm start -- -p 3000                     # or run under pm2 / systemd
```

Put a reverse proxy (Nginx, Caddy) in front for HTTPS. The app already sends HSTS, CSP, `X-Content-Type-Options`,
`Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy`; don't add conflicting copies at the proxy.

## 5. After deploying — checklist

- [ ] Open `/`, `/mr` and `/hi`; the language switcher keeps you on the same page.
- [ ] View source on any page: `<link rel="canonical">` and `og:url` use your real domain.
- [ ] `/sitemap.xml` lists 87 URLs on your domain; `/robots.txt` points to it.
- [ ] Browser console shows no Content-Security-Policy errors (weather from Open-Meteo and map tiles from OpenStreetMap
      are the only third-party requests allowed).
- [ ] Share a page link in a messaging app: the preview shows the card in that page's language.
- [ ] Submit the sitemap in Google Search Console and Bing Webmaster Tools.
- [ ] If `NEXT_PUBLIC_CONTACT_EMAIL` is set, the /contact form opens your mail app with the message filled in.

## 6. Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request: type check, the translation/data/glossary checks
(`npm run check:messages`) and a production build. Keep it green before merging.

## 7. Changing the Content Security Policy

The policy lives in `next.config.ts`. If you add a new third-party service (analytics, a video embed, a new tile
provider), add its domain to the matching directive (`connect-src`, `img-src`, `frame-src`…) or the browser will
block it. Mention any new service on the Privacy page (`scripts/content/info.py`).
