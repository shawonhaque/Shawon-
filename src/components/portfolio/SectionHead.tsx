export function SectionHead({
  index,
  label,
  title,
  accent,
  id,
}: {
  index: string;
  label: string;
  title: string;
  accent: string;
  id: string;
}) {
  return (
    <header className="mb-12 md:mb-16">
      <p className="tag rv">
        <b>{index}</b> — {label}
      </p>
      <h2 id={id} className="h-section mt-5">
        <span className="rv-mask">
          <span>
            {title} <span className="accent">{accent}</span>
          </span>
        </span>
      </h2>
    </header>
  );
}
