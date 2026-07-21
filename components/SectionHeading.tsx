type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.25em] ${
          dark ? "text-accent-400" : "text-accent-600"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-white/70" : "text-foreground-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
