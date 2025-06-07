'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollReveal from '../components/ScrollReveal';
import { supabase } from '../../integrations/supabase/client';

export default function ServicePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className={styles.container}>
      <ScrollReveal>
        <section className={styles.hero}>
          <h1>Services Offered</h1>
          <p className={styles.subtitle}>High-Impact EV Training Content – From Concept to Classroom</p>
          <p className={styles.description}>
            We create and deliver engaging, industry-relevant training content tailored for the fast-evolving Electric Vehicle (EV) technology. 
            Whether you&apos;re a training institute, corporate team, or educational platform, we help you upskill your audience with modern, 
            expertly crafted material.
          </p>
        </section>
      </ScrollReveal>

      <div className={styles.servicesGrid}>
        {loading ? (
          <div className={styles.loading}>Loading services...</div>
        ) : services.length === 0 ? (
          <div className={styles.noServices}>No services available at the moment.</div>
        ) : (
          services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 100}>
              <section className={styles.serviceCard}>
                {service.image_url && (
                  <div className={styles.serviceImage}>
                    <Image
                      src={service.image_url}
                      alt={service.title}
                      width={300}
                      height={200}
                      className={styles.image}
                    />
                  </div>
                )}
                <div className={styles.serviceIcon}>
                  <i className={`bi bi-${getServiceIcon(service.keywords)}`}></i>
                </div>
                <h2>{service.title}</h2>
                <p className={styles.tagline}>{service.keywords.join(' | ')}</p>
                <p className={styles.description}>
                  {service.short_description}
                </p>
                <ul className={styles.features}>
                  {service.bullet_points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>
          ))
        )}
      </div>
    </div>
  );
}

// Helper function to determine icon based on keywords
function getServiceIcon(keywords) {
  const keywordToIcon = {
    'video': 'camera-video',
    'curriculum': 'book',
    'online': 'laptop',
    'corporate': 'building',
    'documentation': 'file-earmark-text',
    'training': 'mortarboard',
    'workshop': 'tools',
    'certification': 'award',
    'assessment': 'clipboard-check',
    'consulting': 'people'
  };

  for (const keyword of keywords) {
    const icon = keywordToIcon[keyword.toLowerCase()];
    if (icon) return icon;
  }

  return 'gear'; // Default icon
} 