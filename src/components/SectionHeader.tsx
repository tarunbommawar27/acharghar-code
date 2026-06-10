export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-10 md:mb-14`}>
      {eyebrow && (
        <div className={`text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 ${center ? "" : ""}`}>
          {eyebrow}
        </div>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1]">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-base md:text-lg">{subtitle}</p>}
    </div>
  );
}
