import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { profile } from "@/content/content";
import { Mail, Copy, ExternalLink, Phone } from "lucide-react";
import { useMemo, useState } from "react";

function encodeMailto(value: string) {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const mailto = useMemo(() => {
    const subject = `Portfolio Inquiry — ${profile.name}`;
    const bodyLines = [
      `Hi ${profile.name},`,
      "",
      `Name: ${name || "(your name)"}`,
      `Email: ${email || "(your email)"}`,
      "",
      message || "(your message)",
      "",
      "—",
      "Sent from portfolio contact form"
    ];
    const body = bodyLines.join("\n");
    return `mailto:${profile.emails[0]}?subject=${encodeMailto(subject)}&body=${encodeMailto(body)}`;
  }, [name, email, message]);

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied("failed");
      window.setTimeout(() => setCopied(null), 1500);
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeading title="Contact" description="Reach out for QA testing and level design opportunities." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-sm font-semibold text-[var(--text)]">Contact methods</div>
          <div className="mt-4 grid gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[var(--muted)]" />
                <div>
                  <div className="text-sm text-[var(--text)]">{profile.emails[0]}</div>
                  <div className="text-xs text-[var(--muted)]">Primary email</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="secondary" onClick={() => copy(profile.emails[0], "email1")}>
                  <Copy className="h-4 w-4" />
                  {copied === "email1" ? "Copied" : "Copy"}
                </Button>
                <a href={`mailto:${profile.emails[0]}`}>
                  <Button type="button">
                    <ExternalLink className="h-4 w-4" />
                    Email
                  </Button>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[var(--muted)]" />
                <div>
                  <div className="text-sm text-[var(--text)]">{profile.emails[1]}</div>
                  <div className="text-xs text-[var(--muted)]">Alternate email</div>
                </div>
              </div>
              <Button type="button" variant="secondary" onClick={() => copy(profile.emails[1], "email2")}>
                <Copy className="h-4 w-4" />
                {copied === "email2" ? "Copied" : "Copy"}
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[var(--muted)]" />
                <div>
                  <div className="text-sm text-[var(--text)]">{profile.phone}</div>
                  <div className="text-xs text-[var(--muted)]">Phone</div>
                </div>
              </div>
              <Button type="button" variant="secondary" onClick={() => copy(profile.phone, "phone")}>
                <Copy className="h-4 w-4" />
                {copied === "phone" ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              <Button type="button" variant="secondary">
                <ExternalLink className="h-4 w-4" />
                LinkedIn
              </Button>
            </a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer">
              <Button type="button" variant="secondary">
                <ExternalLink className="h-4 w-4" />
                GitHub
              </Button>
            </a>
            <a href={profile.socials.canvaProjects} target="_blank" rel="noreferrer">
              <Button type="button" variant="secondary">
                <ExternalLink className="h-4 w-4" />
                Project Docs
              </Button>
            </a>
          </div>
          <div className="mt-4 text-xs text-[var(--muted)]" aria-live="polite">
            {copied === "failed" ? "Copy failed. You can select and copy manually." : ""}
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm font-semibold text-[var(--text)]">Send a message</div>
          <p className="mt-1 text-sm text-[var(--muted)]">This form creates an email draft in your email client.</p>

          <div className="mt-4 grid gap-3">
            <label className="grid gap-1 text-sm">
              <span className="text-xs font-medium text-[var(--muted)]">Your name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="Recruiter / Studio"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs font-medium text-[var(--muted)]">Your email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="you@company.com"
              />
            </label>

            <label className="grid gap-1 text-sm">
              <span className="text-xs font-medium text-[var(--muted)]">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-32 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
                placeholder="Tell Aryan what you’re hiring for and what you’d like to see."
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <a href={mailto}>
              <Button type="button">
                <Mail className="h-4 w-4" />
                Open Email Draft
              </Button>
            </a>
            <Button
              type="button"
              variant="secondary"
              onClick={() => copy(`${name}\n${email}\n\n${message}`, "template")}
            >
              <Copy className="h-4 w-4" />
              {copied === "template" ? "Copied" : "Copy Message"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

