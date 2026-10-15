import { useEffect, useRef, useState } from "react";

const stats = [
  { end: 1000, suffix: "+", label: "Students" },
  { end: 200, suffix: "+", label: "Faculty & Staff" },
  { end: 50, suffix: "+", label: "Seminars Done" },
];

const DURATION_MS = 2000;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Counts from 0 to `end` once `start` becomes true. Skips the animation for
// people who prefer reduced motion.
const useCountUp = (end, start, duration = DURATION_MS) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setValue(end);
      return;
    }

    let frame;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.round(easeOutCubic(progress) * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, start, duration]);

  return value;
};

const Stat = ({ end, suffix, label, start }) => {
  const value = useCountUp(end, start);
  const finalText = `${end}${suffix}`;

  return (
    <div className="text-white space-y-2 font-medium flex flex-col justify-center items-center">
      {/* Visible number animates; screen readers get the final value. */}
      <h3
        className="md:text-5xl text-4xl tabular-nums text-center"
        style={{ minWidth: `${finalText.length}ch` }}
        aria-label={finalText}>
        <span aria-hidden="true">
          {value}
          {suffix}
        </span>
      </h3>
      <div className="w-24 bg-emerald-700 rounded-lg h-1"></div>
      <p className="text-base uppercase font-normal">{label}</p>
    </div>
  );
};

const StaticData = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Start counting when the section first scrolls into view (or immediately
  // if it is already visible on load).
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full md:h-52 mt-20">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/boys_hostel.jpg')` }}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content Layer */}
      <div className="relative h-full flex items-center justify-center">
        <div className="site-container py-10 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 text-center">
            {stats.map((stat) => (
              <Stat key={stat.label} {...stat} start={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticData;
