type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  titleId?: string;
};

export function SectionHeading({ eyebrow, title, description, titleId }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-xs font-semibold tracking-[0.24em] text-sky-300 uppercase">
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}
