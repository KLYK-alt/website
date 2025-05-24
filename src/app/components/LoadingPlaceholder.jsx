'use client';

import styles from './LoadingPlaceholder.module.css';

export default function LoadingPlaceholder({ height = '200px' }) {
  return (
    <div className={styles.loadingPlaceholder} style={{ minHeight: height }}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingSpinner}></div>
        <span>Loading...</span>
      </div>
    </div>
  );
} 