import { Code2, ExternalLink, Mail, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolioContent, type PortfolioContent } from "@/data/content";
import type { Locale } from "@/data/i18n";

type ContactSectionProps = {
  locale: Locale;
};

type ContactLink = {
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
  external?: boolean;
};

export function ContactSection({ locale }: ContactSectionProps) {
  const { aria, contact } = portfolioContent[locale];
  const contactLinks: ContactLink[] = [
    {
      label: contact.links.email,
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
    },
    {
      label: contact.links.github,
      value: "github.com/Katharon",
      href: profile.github,
      icon: Code2,
      external: true,
    },
    {
      label: contact.links.linkedin,
      value: "Lukas Stumpfel",
      href: profile.linkedin,
      icon: ExternalLink,
      external: true,
    },
    {
      label: contact.links.location,
      value: profile.location[locale],
      icon: MapPin,
    },
  ];

  return (
    <section
      id="contact"
      tabIndex={-1}
      className="section portfolio-contact"
      aria-labelledby="contact-title"
    >
      <Container>
        <div className="contact-layout">
          <div className="contact-intro">
            <SectionHeading
              eyebrow={contact.eyebrow}
              title={contact.title}
              description={contact.description}
              titleId="contact-title"
            />
            <Button
              href={`mailto:${profile.email}`}
              variant="primary"
              icon={Mail}
              className="contact-button"
            >
              {contact.button}
            </Button>
          </div>
          <div className="contact-list">
            {contactLinks.map((item) => (
              <ContactItem key={item.label} item={item} aria={aria} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactItem({ item, aria }: { item: ContactLink; aria: PortfolioContent["aria"] }) {
  const Icon = item.icon;
  const content = (
    <>
      <Icon aria-hidden="true" className="contact-icon" strokeWidth={1.5} />
      <span className="contact-item-content">
        <span className="contact-label">{item.label}</span>
        <span className="contact-value">{item.value}</span>
      </span>
      {item.external ? (
        <ExternalLink aria-hidden="true" className="contact-external" strokeWidth={1.5} />
      ) : null}
    </>
  );

  if (!item.href) {
    return <div className="contact-item">{content}</div>;
  }

  return (
    <a
      className="contact-item contact-item--link"
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
      aria-label={
        item.external
          ? item.label === "GitHub"
            ? aria.openGithub
            : aria.openLinkedin
          : aria.contactValue.replace("{label}", item.label).replace("{value}", item.value)
      }
    >
      {content}
    </a>
  );
}
