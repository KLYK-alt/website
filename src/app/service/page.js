'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import ScrollReveal from '../components/ScrollReveal';
import { supabase } from '../../integrations/supabase/client';

export default function ServicePage() {
  return (
    <div className={styles.container}>
      <ScrollReveal>
        <section className={styles.hero}>
          <h1>Services Offered</h1>
          <p className={styles.subtitle}>High-Impact EV Training Content – From Concept to Classroom</p>
          <p className={styles.description}>
            We create and deliver engaging, industry-relevant training content tailored for the fast-evolving Electric Vehicle (EV) technology. 
            Whether you're a training institute, corporate team, or educational platform, we help you upskill your audience with modern, 
            expertly crafted material.
          </p>
        </section>
      </ScrollReveal>

      <div className={styles.servicesGrid}>
        {/* Video Production */}
        <ScrollReveal delay={0}>
          <section className={`${styles.serviceCard} ${styles.videoProductionCard}`}>
            <div className={styles.serviceIcon}>
              <i className="bi bi-camera-video"></i>
            </div>
            <h2>EV Training Video Production</h2>
            <p className={styles.tagline}>On-Trend | Engaging | Industry-Relevant</p>
            <p className={styles.description}>
              Professionally produced short and long-form videos that simplify complex EV concepts and captivate learners.
            </p>
            <ul className={styles.features}>
              <li>Concept to creation</li>
              <li>Voiceover and music sync</li>
              <li>Dynamic editing and effects</li>
            </ul>
          </section>
        </ScrollReveal>

        {/* Curriculum Development */}
        <ScrollReveal delay={100}>
          <section className={`${styles.serviceCard} ${styles.curriculumCard}`}>
            <div className={styles.serviceIcon}>
              <i className="bi bi-book"></i>
            </div>
            <h2>Curriculum & Module Development</h2>
            <p className={styles.tagline}>End-to-End Training Design for EV Systems</p>
            <p className={styles.description}>
              Structured and modular training programs covering EV fundamentals, components, maintenance, and diagnostics.
            </p>
            <ul className={styles.features}>
              <li>Aligned with industry standards</li>
              <li>Instructor guides and learner manuals</li>
              <li>Assessment tools included</li>
            </ul>
          </section>
        </ScrollReveal>

        {/* Online Learning */}
        <ScrollReveal delay={200}>
          <section className={`${styles.serviceCard} ${styles.evLearningCard}`}>
            <div className={styles.serviceIcon}>
              <i className="bi bi-laptop"></i>
            </div>
            <h2>Online EV Learning Content</h2>
            <p className={styles.tagline}>Platform-Ready | Interactive | Scalable</p>
            <p className={styles.description}>
              Digital courses and e-learning modules designed for maximum learner engagement.
            </p>
            <ul className={styles.features}>
              <li>HD explainer videos & animations</li>
              <li>Quizzes and hands-on assignments</li>
            </ul>
          </section>
        </ScrollReveal>

        {/* Corporate Training */}
        <ScrollReveal delay={300}>
          <section className={`${styles.serviceCard} ${styles.corporateTrainingCard}`}>
            <div className={styles.serviceIcon}>
              <i className="bi bi-building"></i>
            </div>
            <h2>Corporate & Institutional Training Delivery</h2>
            <p className={styles.tagline}>Offline or Hybrid | Workshops | Custom Programs</p>
            <p className={styles.description}>
              Instructor-led programs delivered at your facility or ours, with real-world equipment and live demonstrations.
            </p>
            <ul className={styles.features}>
              <li>Custom scheduling</li>
              <li>Certification support</li>
              <li>Hands-on learning focus</li>
            </ul>
          </section>
        </ScrollReveal>

        {/* Technical Documentation */}
        <ScrollReveal delay={400}>
          <section className={`${styles.serviceCard} ${styles.technicalDocsCard}`}>
            <div className={styles.serviceIcon}>
              <i className="bi bi-file-earmark-text"></i>
            </div>
            <h2>Technical Documentation & Visual Aids</h2>
            <p className={styles.tagline}>EV Manuals | SOPs | Infographics</p>
            <p className={styles.description}>
              Clear, precise technical documents and visuals that enhance learner comprehension and practical application.
            </p>
            <ul className={styles.features}>
              <li>Circuit diagrams and flowcharts</li>
              <li>Maintenance checklists</li>
              <li>Troubleshooting guides</li>
            </ul>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
} 