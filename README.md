# Aryan Sharma — Portfolio

Static portfolio site for Game Tester + Game Level Designer.

## Local development

```bash
npm install
npm run dev
```

## Edit content

- Profile: `src/content/profile.json`
- Projects: `src/content/projects.json`
- Site (nav/title/footer): `src/content/site.json`

## Publish to GitHub Pages

### Option A (Recommended): Deploy the static `/docs` site

1. In GitHub, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select **Branch: `main`** and **Folder: `/docs`**.
4. Save, then wait for GitHub to publish.

### Option B: Deploy the Vite build (GitHub Actions)

1. In GitHub, go to **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions**.
3. Every push to `main` will deploy automatically.

Notes:
- Routes use `HashRouter` so refresh/direct links work on GitHub Pages.
