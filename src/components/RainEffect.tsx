import { useMemo } from "react";

const RainEffect = ({ count = 40 }: { count?: number }) => {
  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 1.5 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.3,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map((d) => (
        <div
          key={d.id}
          className="absolute w-px bg-rain-glow/30"
          style={{
            left: `${d.left}%`,
            height: "40px",
            opacity: d.opacity,
            animation: `rainDrop ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default RainEffect;
