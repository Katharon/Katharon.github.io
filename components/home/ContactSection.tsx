import { Code2, ExternalLink, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/Katharon",
    href: profile.github,
    icon: Code2,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "Lukas Stumpfel",
    href: profile.linkedin,
    icon: ExternalLink,
    external: true,
  },
  {
    label: "Location",
    value: profile.location,
    href: "#contact",
    icon: MapPin,
  },
];

export function ContactSection() {
  return (
    <MotionSection id="contact" className="py-16 sm:py-20" ariaLabelledby="contact-title">
      <Container>
        <Card className="overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-r lg:border-b-0">
              <SectionHeading
                eyebrow="Contact"
                title="Open to junior software engineering conversations."
                description="Best reached through email, GitHub or LinkedIn. Based in Lower Austria, Austria."
                titleId="contact-title"
              />
              <div className="mt-8">
                <Button href={`mailto:${profile.email}`} variant="primary" icon={Mail}>
                  Email Lukas
                </Button>
              </div>
            </div>
            <div className="grid gap-0 divide-y divide-white/10">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  className="flex items-center justify-between gap-4 p-5 transition hover:bg-white/[0.04] sm:p-6"
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  aria-label={item.external ? `Open ${item.label}` : item.label}
                >
                  <span className="flex items-center gap-4">
                    <span className="grid size-10 place-items-center rounded-lg border border-sky-300/20 bg-sky-300/10">
                      <item.icon aria-hidden="true" className="size-5 text-sky-300" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-slate-400">{item.label}</span>
                      <span className="mt-1 block text-base font-semibold break-all text-white">
                        {item.value}
                      </span>
                    </span>
                  </span>
                  {item.external ? (
                    <ExternalLink aria-hidden="true" className="size-4 text-slate-500" />
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        </Card>
      </Container>
    </MotionSection>
  );
}
