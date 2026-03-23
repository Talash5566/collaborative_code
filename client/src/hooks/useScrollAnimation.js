'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * useScrollAnimation
 * Returns a ref + boolean `isVisible`.
 * Once the element enters the viewport, isVisible becomes true and stays true.
 *
 * @param {number} threshold - 0–1, how much of the element must be visible (default 0.15)
 * @param {string} rootMargin - CSS margin for the observer root (default '0px 0px -60px 0px')
 */
export default function useScrollAnimation(threshold = 0.15, rootMargin = '0px 0px -60px 0px') {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // fire once only
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}