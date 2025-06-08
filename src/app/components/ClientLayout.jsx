'use client';

import { useEffect } from 'react';
import styles from '../layout.module.css';

export default function ClientLayout({ children }) {
  useEffect(() => {
    // Add any client-side initialization here
    const handleResize = () => {
      // Add any resize handling here
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.body}>
      {children}
    </div>
  );
} 