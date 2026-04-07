import SectionHeading from "@/components/SectionHeading";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { profile } from "@/content/content";

export default function About() {
  return (
    <div className="space-y-10">
      <SectionHeading title="About" description="Background, skills, and experience." />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            {profile.roles.map((r) => (
              <Badge key={r} className="text-[var(--text)]">
                {r}
              </Badge>
            ))}
            <Badge>{profile.location}</Badge>
          </div>
          <h1 className="mt-4 text-xl font-semibold tracking-tight text-[var(--text)] sm:text-2xl">{profile.headline}</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">{profile.summary}</p>

          <div className="mt-6 space-y-4 text-sm text-[var(--text)]">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Contact</div>
              <div className="mt-2 text-sm font-semibold text-[var(--text)]">{profile.name}</div>
            </div>
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-20 w-20 rounded-2xl object-cover ring-1 ring-[var(--border)]"
                loading="lazy"
              />
            ) : null}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="text-[var(--text)]">Phone: {profile.phone}</div>
            <div className="text-[var(--text)]">Email: {profile.emails[0]}</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[var(--muted)] underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[var(--muted)] underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href={profile.socials.canvaProjects}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[var(--muted)] underline-offset-4 hover:underline"
            >
              Project Docs
            </a>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {profile.skills.map((cat) => (
          <Card key={cat.title} className="p-6">
            <div className="text-sm font-semibold text-[var(--text)]">{cat.title}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {cat.items.map((i) => (
                <Badge key={i}>{i}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div>
        <SectionHeading title="Timeline" description="Education and ongoing project practice." />
        <div className="mt-4 grid gap-4">
          {profile.timeline.map((e) => (
            <Card key={e.title} className="p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-[var(--text)]">{e.title}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">
                    {[e.org, e.location].filter(Boolean).join(" • ")}
                  </div>
                </div>
                {e.period ? <Badge>{e.period}</Badge> : null}
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--text)]">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

