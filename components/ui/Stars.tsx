export default function Stars({ value = 0 }: { value?: number }) {
  const v = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex gap-1" aria-label={`${v} yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < v ? "opacity-100" : "opacity-30"}>
          ⭐
        </span>
      ))}
    </div>
  );
}