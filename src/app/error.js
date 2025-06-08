'use client';

import { useEffect } from 'react';
import styles from './error.module.css';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <h1>Something went wrong!</h1>
      <p>We apologize for the inconvenience. Please try again later.</p>
      <button
        onClick={() => reset()}
        className={styles.retryButton}
      >
        Try again
      </button>
    </div>
  );
} 