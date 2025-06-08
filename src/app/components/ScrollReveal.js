'use client';

import { useEffect, useRef } from 'react';
import styles from './ScrollReveal.module.css';

export default function ScrollReveal({ children, delay = 0 }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={elementRef} 
      className={styles.scrollReveal}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
} 