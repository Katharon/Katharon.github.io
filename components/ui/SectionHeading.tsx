type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  titleId?: string;
};

export function SectionHeading({ eyebrow, title, description, titleId }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
