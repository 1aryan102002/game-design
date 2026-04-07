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

1. Create a GitHub repository.
2. Push this project to the `main` branch.
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions**.
5. Every push to `main` will deploy automatically.

Notes:
- Routes use `HashRouter` so refresh/direct links work on GitHub Pages.
