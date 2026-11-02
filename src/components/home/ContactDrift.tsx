export function ContactDrift() {
  const points = [
    { x: "7%", y: "22%", size: 2, delay: "0s" },
    { x: "14%", y: "72%", size: 1.5, delay: "2.2s" },
    { x: "82%", y: "18%", size: 1.5, delay: "4.1s" },
    { x: "92%", y: "62%", size: 2, delay: "1.3s" },
    { x: "48%", y: "12%", size: 1, delay: "3.4s" },
    { x: "64%", y: "86%", size: 1.5, delay: "0.8s" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {points.map((point) => (
        <span
          key={`${point.x}-${point.y}`}
          className="dax-drift absolute rounded-full bg-deep/70"
          style={{
            left: point.x,
            top: point.y,
            width: point.size,
            height: point.size,
            animationDelay: point.delay,
          }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/[0.045] blur-[100px]" />
    </div>
  );
}
