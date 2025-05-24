'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingPlaceholder from './LoadingPlaceholder';
import styles from './FeatureCard.module.css';

const ScrollReveal = dynamic(() => import('./ScrollReveal'), {
  loading: () => <LoadingPlaceholder />,
  ssr: false
});

export default function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <ScrollReveal delay={delay}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>
            <i className={`bi bi-${icon}`}></i>
          </div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </ScrollReveal>
    </Suspense>
  );
} 