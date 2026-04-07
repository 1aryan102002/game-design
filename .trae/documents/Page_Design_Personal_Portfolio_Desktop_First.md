# Page Design Spec — Personal Portfolio (Desktop-first)

## Global Styles
- Layout system: CSS Grid for page scaffolding + Flexbox for component alignment.
- Max width: 1100–1200px content container; center aligned; 24–32px side padding.
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64.
- Typography: 1–2 display sizes (hero), clear H1/H2/H3 hierarchy, body 16–18px.
- Colors (tokens):
  - Background: `--bg` (near-white or near-black)
  - Surface: `--surface`
  - Text: `--text` and `--muted`
  - Accent: `--accent` (used for CTAs, links, tags)
  - Border: `--border`
- Buttons:
  - Primary: solid accent background, high contrast text.
  - Secondary: surface background + border.
  - Hover: subtle lift (translateY(-1px)) + accent tint.
- Links: underlined on hover; external links show icon.

## Responsive behavior
- Desktop-first baseline; add breakpoints:
  - ≥1024px: 2–3 column grids for project cards; side-by-side hero layout.
  - 640–1023px: reduce to 2 columns; stack hero.
  - <640px: 1 column; collapse nav into hamburger.

---

## Page: Home
### Meta Information
- Title: "{Your Name} | Game Tester & Game Level Designer"
- Description: "Portfolio featuring QA testing work and level design projects."
- Open Graph: title/description + primary banner image.

### Page Structure
Stacked sections with a clear “featured work” mid-page.

### Sections & Components
1. Top Nav (sticky, optional)
   - Left: name/logo.
   - Right: links (Home, Projects, About, Contact) + “Download Resume”.
2. Hero
   - Two-column grid (desktop):
     - Left: H1 name + role line + 1–2 sentence summary.
     - Right: profile image or simple card with key stats.
   - Primary CTA: “View Projects”; Secondary CTA: “Contact”.
3. Highlights strip
   - 3–4 small cards: each is a single editable highlight (metric or capability).
4. Featured Projects
   - Grid of cards (3 columns desktop).
   - Each card: title, role(s), tools, 1-line summary, “View details”.
5. Skills preview
   - Categorized chips (e.g., Testing / Engines / Level Design) fed from content.
6. Footer
   - Social links + copyright.

---

## Page: Projects
### Meta Information
- Title: "Projects | {Your Name}"
- Description: "Selected QA and level design projects with responsibilities, tools, and outcomes."

### Page Structure
Two-pane layout on desktop: list/grid + detail panel; stacks on mobile.

### Sections & Components
1. Page header
   - Title + short intro.
2. Filters / tags
   - Toggle chips sourced from project tags (e.g., QA, Level Design).
3. Project grid/list
   - Cards show: thumbnail, title, roles, tools, short summary.
4. Project detail view (in-page)
   - Opens on card click (right panel or below grid):
     - Overview
     - Responsibilities (bullets)
     - Tools used
     - Outcomes (bullets)
     - Media gallery (images/video embeds)
     - External links (repo/build/docs)

---

## Page: About / Resume
### Meta Information
- Title: "About | {Your Name}"
- Description: "Background, skills, experience, and resume download."

### Page Structure
Centered single-column reading layout with structured blocks.

### Sections & Components
1. About header
   - Portrait (optional) + bio summary.
2. Skills & tools
   - 2–3 column grid of categories; each category lists chips or short bullets.
3. Experience / Education / Certifications
   - Timeline component; each entry includes title, org, dates, and 1–3 bullets.
4. Resume actions
   - “Download PDF” primary button + secondary “Open in new tab”.

---

## Page: Contact
### Meta Information
- Title: "Contact | {Your Name}"
- Description: "Ways to reach me for QA and level design opportunities."

### Page Structure
Simple two-column layout: contact methods + message card.

### Sections & Components
1. Contact methods
   - Email (copy button + mailto)
   - LinkedIn (external)
   - Optional: itch.io / GitHub / ArtStation
2. Message card (no backend)
   - Fields: name, email, message.
   - Primary action: “Open Email Draft” (generates a mailto link using field values).
   - Secondary action: “Copy Message Template”.
