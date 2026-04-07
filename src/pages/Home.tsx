import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { profile, projects } from "@/content/content";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="space-y-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card className="relative overflow-hidden p-8">
          <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(600px_circle_at_10%_0%,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_55%)]" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {profile.roles.map((r) => (
                  <Badge key={r} className="text-[var(--text)]">
                    {r}
                  </Badge>
                ))}
                <Badge>{profile.location}</Badge>
              </div>

              <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
                {profile.name}
              </h1>
              <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">{profile.summary}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button type="button" onClick={() => navigate("/projects")}>
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Link to="/contact">
                  <Button type="button" variant="secondary">
                    <Mail className="h-4 w-4" />
                    Contact
                  </Button>
                </Link>
                <a href={profile.socials.canvaProjects} target="_blank" rel="noreferrer">
                  <Button type="button" variant="ghost">
                    <ExternalLink className="h-4 w-4" />
                    Project Docs
                  </Button>
                </a>
              </div>
            </div>

            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-28 w-28 shrink-0 rounded-2xl object-cover ring-1 ring-[var(--border)] sm:h-32 sm:w-32"
                loading="lazy"
              />
            ) : null}
          </div>
        </Card>

        <div className="grid gap-4">
          {profile.highlights.map((h) => (
            <Card key={h.title} className="p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">{h.title}</div>
              <div className="mt-2 text-lg font-semibold text-[var(--text)]">{h.value}</div>
              {h.description ? <div className="mt-1 text-sm text-[var(--muted)]">{h.description}</div> : null}
            </Card>
          ))}
        </div>
      </div>

      <div>
        <SectionHeading
          title="Featured work"
          description="A few projects that represent my approach to level flow, mechanics, and iteration."
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="block">
              <ProjectCard project={p} rightSlot={<ArrowRight className="mt-1 h-4 w-4 text-[var(--muted)]" />} />
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-sm font-semibold text-[var(--text)]">What I bring</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--text)]">
            <li>Level pacing and navigation built through hands-on prototyping and iteration.</li>
            <li>Broad gameplay familiarity across genres and perspectives (FPS/TPS/2D/strategy).</li>
            <li>Testing mindset with awareness of structured workflows and platform compliance terms.</li>
            <li>Comfort with mechanics implementation using C++/C# basics and version control.</li>
          </ul>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-semibold text-[var(--text)]">Quick links</div>
          <div className="mt-4 grid gap-3">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-[var(--text)]">LinkedIn</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">Connect and message</div>
                </div>
                <ExternalLink className="h-4 w-4 text-[var(--muted)]" />
              </div>
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-[var(--text)]">GitHub</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">Code and prototypes</div>
                </div>
                <ExternalLink className="h-4 w-4 text-[var(--muted)]" />
              </div>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
