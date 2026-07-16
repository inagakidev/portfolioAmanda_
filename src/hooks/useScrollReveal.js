import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return undefined;
    }

    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (options.once !== false) {
              observer.disconnect();
            }
          }
        });
      },
      {
        root: options.root ?? null,
        rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
        threshold: typeof options.threshold === 'number' ? options.threshold : 0.18,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.once, options.root, options.rootMargin, options.threshold]);

  return [ref, isVisible];
}
