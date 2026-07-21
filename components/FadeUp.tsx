"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function FadeUp({
  children,
  delay = 0,
  className = "",
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold: 0.06 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduceMotion]);

  const visible = reduceMotion || show;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: reduceMotion ? "none" : visible ? "translateY(0)" : "translateY(18px)",
        transition: reduceMotion
          ? "opacity 0.3s ease-out"
          : `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
