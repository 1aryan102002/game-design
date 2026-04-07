const cache = { site: null, profile: null, projects: null };

const routeMap = {
  "/": "index.html",
  "/projects": "projects.html",
  "/about": "about.html",
  "/contact": "contact.html",
};

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function setText(el, value) {
  if (!el) return;
  el.textContent = value;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function loadJson(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

async function getSite() {
  if (!cache.site) cache.site = await loadJson("./data/site.json");
  return cache.site;
}

async function getProfile() {
  if (!cache.profile) cache.profile = await loadJson("./data/profile.json");
  return cache.profile;
}

async function getProjects() {
  if (!cache.projects) cache.projects = await loadJson("./data/projects.json");
  return cache.projects;
}

function currentKey() {
  const name = location.pathname.split("/").pop() || "index.html";
  if (name === "index.html") return "/";
  if (name === "projects.html") return "/projects";
  if (name === "about.html") return "/about";
  if (name === "contact.html") return "/contact";
  return "";
}

function renderNav(site) {
  const root = qs("#app-nav");
  if (!root) return;
  const key = currentKey();

  const links = site.nav
    .map((n) => {
      const href = routeMap[n.to] ?? "index.html";
      const active = n.to === key;
      return `
        <a href="${href}" class="px-3 py-2 rounded-lg text-sm ${
          active ? "text-slate-50 bg-slate-800/50" : "app-link hover:bg-slate-800/30"
        }">${escapeHtml(n.label)}</a>
      `;
    })
    .join("");

  root.innerHTML = `
    <div class="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
      <a href="index.html" class="text-sm font-semibold text-slate-50">${escapeHtml(site.title)}</a>
      <div class="hidden sm:flex items-center gap-1">${links}</div>
      <div class="sm:hidden">
        <button class="btn btn-sm btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileNav">Menu</button>
      </div>
    </div>
    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="mobileNav">
      <div class="offcanvas-header">
        <div class="offcanvas-title fw-semibold">Menu</div>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body">
        <div class="d-grid gap-2">
          ${site.nav
            .map((n) => {
              const href = routeMap[n.to] ?? "index.html";
              return `<a class="btn btn-outline-light" href="${href}">${escapeHtml(n.label)}</a>`;
            })
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function renderFooter(site) {
  const root = qs("#app-footer");
  if (!root) return;
  root.innerHTML = `
    <div class="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <div class="border-t border-slate-700/40 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div class="text-sm text-slate-200">${escapeHtml(site.title)}</div>
        <div class="text-xs app-muted">${escapeHtml(site.footerNote || "")}</div>
      </div>
    </div>
  `;
}

function badge(text) {
  return `<span class="app-badge inline-flex items-center rounded-full px-3 py-1 text-xs">${escapeHtml(text)}</span>`;
}

function projectCard(p) {
  const tags = (p.tags || []).slice(0, 4).map(badge).join(" ");
  const roles = (p.roles || []).slice(0, 2).map(badge).join(" ");
  return `
    <a href="project.html?id=${encodeURIComponent(p.id)}" class="block no-underline">
      <div class="app-card rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
        <div class="flex flex-wrap gap-2">${roles} ${tags}</div>
        <div class="mt-3 text-base font-semibold text-slate-50">${escapeHtml(p.title)}</div>
        <div class="mt-2 text-sm app-muted">${escapeHtml(p.summary || "")}</div>
        <div class="mt-4 text-sm text-cyan-200">View project →</div>
      </div>
    </a>
  `;
}

function splitWriteup(writeup) {
  const lines = writeup
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const blocks = [];
  for (const line of lines) {
    if (/:$/.test(line) || /^\d+\s*\./.test(line)) {
      blocks.push({ kind: "heading", text: line.replace(/^\d+\s*\.?\s*/, "") });
      continue;
    }
    if (/^[-•]/.test(line)) {
      blocks.push({ kind: "bullet", text: line.replace(/^[-•]\s*/, "") });
      continue;
    }
    blocks.push({ kind: "para", text: line });
  }
  return blocks;
}

function renderWriteup(writeup) {
  if (!writeup) return "";
  const blocks = splitWriteup(writeup);
  return blocks
    .map((b) => {
      if (b.kind === "heading") {
        return `<div class="pt-2 text-xs font-semibold uppercase tracking-wide app-muted">${escapeHtml(b.text)}</div>`;
      }
      if (b.kind === "bullet") {
        return `
          <div class="flex gap-2 text-sm text-slate-200">
            <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style="background:var(--accent)"></span>
            <span>${escapeHtml(b.text)}</span>
          </div>
        `;
      }
      return `<p class="text-sm text-slate-200">${escapeHtml(b.text)}</p>`;
    })
    .join("");
}

function setAvatar(img, profile) {
  if (!img) return;
  if (!profile.avatar) {
    img.classList.add("hidden");
    return;
  }
  img.src = profile.avatar;
  img.alt = profile.name;
  img.addEventListener("error", () => {
    img.classList.add("hidden");
  });
}

async function initHome() {
  const [site, profile, projects] = await Promise.all([getSite(), getProfile(), getProjects()]);
  document.title = site.title;
  setText(qs("#home-name"), profile.name);
  setText(qs("#home-summary"), profile.summary);
  setAvatar(qs("#home-avatar"), profile);

  const roleWrap = qs("#home-roles");
  if (roleWrap) roleWrap.innerHTML = [...profile.roles, profile.location].map(badge).join(" ");

  const highlights = qs("#home-highlights");
  if (highlights) {
    highlights.innerHTML = profile.highlights
      .map((h) => {
        return `
          <div class="app-card rounded-2xl p-5">
            <div class="text-xs font-semibold uppercase tracking-wide app-muted">${escapeHtml(h.title)}</div>
            <div class="mt-2 text-lg font-semibold text-slate-50">${escapeHtml(h.value)}</div>
            ${h.description ? `<div class="mt-1 text-sm app-muted">${escapeHtml(h.description)}</div>` : ""}
          </div>
        `;
      })
      .join("");
  }

  const featured = qs("#home-featured");
  if (featured) {
    const items = projects.filter((p) => p.featured).slice(0, 6);
    featured.innerHTML = items.map(projectCard).join("");
  }
}

async function initProjects() {
  const [site, projects] = await Promise.all([getSite(), getProjects()]);
  document.title = `Projects | ${site.title}`;
  const root = qs("#projects-list");
  if (!root) return;
  root.innerHTML = projects.map(projectCard).join("");
}

async function initProject() {
  const [site, projects] = await Promise.all([getSite(), getProjects()]);
  const id = new URLSearchParams(location.search).get("id") || "";
  const p = projects.find((x) => x.id === id);

  if (!p) {
    document.title = `Project not found | ${site.title}`;
    const notFound = qs("#project-notfound");
    if (notFound) notFound.classList.remove("hidden");
    return;
  }

  document.title = `${p.title} | ${site.title}`;
  setText(qs("#project-title"), p.title);
  setText(qs("#project-summary"), p.summary);
  const badgeWrap = qs("#project-badges");
  if (badgeWrap) badgeWrap.innerHTML = [...p.roles, ...p.tags].map(badge).join(" ");

  const res = qs("#project-responsibilities");
  if (res) res.innerHTML = (p.responsibilities || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");

  const out = qs("#project-outcomes");
  if (out) out.innerHTML = (p.outcomes || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");

  const tools = qs("#project-tools");
  if (tools) tools.innerHTML = (p.tools || []).map(badge).join(" ");

  const writeup = qs("#project-writeup");
  if (writeup) writeup.innerHTML = renderWriteup(p.writeup);

  const src = qs("#project-source");
  if (src && p.source && p.source.url) {
    src.href = p.source.url;
    setText(src, "For detail documentation");
  }
}

async function initAbout() {
  const [site, profile] = await Promise.all([getSite(), getProfile()]);
  document.title = `About | ${site.title}`;
  setText(qs("#about-headline"), profile.headline);
  setText(qs("#about-summary"), profile.summary);
  setAvatar(qs("#about-avatar"), profile);

  const about = qs("#about-paras");
  if (about) about.innerHTML = profile.about.map((p) => `<p class="text-sm text-slate-200">${escapeHtml(p)}</p>`).join("");

  const skills = qs("#about-skills");
  if (skills) {
    skills.innerHTML = profile.skills
      .map((cat) => {
        return `
          <div class="app-card rounded-2xl p-5">
            <div class="text-sm font-semibold text-slate-50">${escapeHtml(cat.title)}</div>
            <div class="mt-3 flex flex-wrap gap-2">${cat.items.map(badge).join(" ")}</div>
          </div>
        `;
      })
      .join("");
  }

  const timeline = qs("#about-timeline");
  if (timeline) {
    timeline.innerHTML = profile.timeline
      .map((e) => {
        const meta = [e.org, e.location].filter(Boolean).join(" • ");
        return `
          <div class="app-card rounded-2xl p-5">
            <div class="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <div class="text-sm font-semibold text-slate-50">${escapeHtml(e.title)}</div>
                ${meta ? `<div class="mt-1 text-sm app-muted">${escapeHtml(meta)}</div>` : ""}
              </div>
              ${e.period ? `<span class="app-badge inline-flex items-center rounded-full px-3 py-1 text-xs">${escapeHtml(e.period)}</span>` : ""}
            </div>
            <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-200">
              ${e.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
            </ul>
          </div>
        `;
      })
      .join("");
  }
}

function encodeMailto(value) {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

async function initContact() {
  const [site, profile] = await Promise.all([getSite(), getProfile()]);
  document.title = `Contact | ${site.title}`;
  setText(qs("#contact-email"), profile.emails[0] || "");
  setText(qs("#contact-email2"), profile.emails[1] || "");
  setText(qs("#contact-phone"), profile.phone || "");

  const links = [
    { id: "contact-linkedin", url: profile.socials.linkedin, label: "LinkedIn" },
    { id: "contact-github", url: profile.socials.github, label: "GitHub" },
    { id: "contact-docs", url: profile.socials.canvaProjects, label: "Project Docs" },
  ];
  for (const l of links) {
    const a = qs(`#${l.id}`);
    if (a) a.href = l.url;
    const t = qs(`#${l.id}-text`);
    if (t) setText(t, l.label);
  }

  const name = qs("#form-name");
  const email = qs("#form-email");
  const message = qs("#form-message");
  const btnCopy = qs("#btn-copy-draft");
  const btnOpen = qs("#btn-open-mail");
  const status = qs("#copy-status");

  function buildDraft() {
    const subject = `Portfolio Inquiry — ${profile.name}`;
    const bodyLines = [
      `Hi ${profile.name},`,
      "",
      `Name: ${(name && name.value) || "(your name)"}`,
      `Email: ${(email && email.value) || "(your email)"}`,
      "",
      (message && message.value) || "(your message)",
      "",
      "—",
      "Sent from portfolio contact form",
    ];
    return {
      to: profile.emails[0],
      subject,
      body: bodyLines.join("\n"),
      text: [`To: ${profile.emails[0]}`, `Subject: ${subject}`, "", ...bodyLines].join("\n"),
    };
  }

  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
      if (status) status.textContent = "Copied.";
      window.setTimeout(() => {
        if (status) status.textContent = "";
      }, 1200);
    } catch {
      if (status) status.textContent = "Copy failed. Select and copy manually.";
    }
  }

  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      const d = buildDraft();
      copyText(d.text);
    });
  }

  if (btnOpen) {
    btnOpen.addEventListener("click", () => {
      const d = buildDraft();
      const href = `mailto:${d.to}?subject=${encodeMailto(d.subject)}&body=${encodeMailto(d.body)}`;
      window.location.href = href;
    });
  }

  const btnCopyEmail = qs("#btn-copy-email");
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener("click", () => copyText(profile.emails[0] || ""));
  }

  const btnCopyEmail2 = qs("#btn-copy-email2");
  if (btnCopyEmail2) {
    btnCopyEmail2.addEventListener("click", () => copyText(profile.emails[1] || ""));
  }

  const btnCopyPhone = qs("#btn-copy-phone");
  if (btnCopyPhone) {
    btnCopyPhone.addEventListener("click", () => copyText(profile.phone || ""));
  }
}

async function boot() {
  const site = await getSite();
  renderNav(site);
  renderFooter(site);

  const page = document.body.getAttribute("data-page");
  const initMap = {
    home: initHome,
    projects: initProjects,
    project: initProject,
    about: initAbout,
    contact: initContact,
  };

  const fn = initMap[page];
  if (fn) await fn();
}

boot().catch(() => {
  const root = qs("#app-error");
  if (root) root.classList.remove("hidden");
});
