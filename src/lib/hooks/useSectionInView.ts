import { useRef, useEffect, useState } from "react";

export function useSectionInView(sectionId: string, threshold = 0.5) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}