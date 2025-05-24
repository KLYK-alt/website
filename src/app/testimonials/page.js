'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import CountUp from '../components/CountUp';
import ScrollReveal from '../components/ScrollReveal';
import { supabase } from '../../integrations/supabase/client';

export default function TestimonialsPage() {
  const [statistics, setStatistics] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch statistics
        const { data: statsData, error: statsError } = await supabase
          .from('statistics')
          .select('*')
          .single();

        if (statsError) throw statsError;
        setStatistics(statsData);

        // Fetch testimonials
        const { data: testimonialsData, error: testimonialsError } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (testimonialsError) throw testimonialsError;
        setTestimonials(testimonialsData || []);

        // Fetch partners
        const { data: partnersData, error: partnersError } = await supabase
          .from('partners')
          .select('*')
          .order('created_at', { ascending: true });

        if (partnersError) throw partnersError;
        setPartners(partnersData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <ScrollReveal>
        <section className={styles.hero}>
          <h1>Our Impact</h1>
          <p className={styles.subtitle}>Trusted by Industry Leaders and Educational Institutions</p>
        </section>
      </ScrollReveal>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {loading ? (
            <p>Loading statistics...</p>
          ) : statistics && (
            <>
          <ScrollReveal delay={0}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                    <CountUp end={statistics.programs_delivered} suffix="+" />
              </div>
              <div className={styles.statLabel}>Training Programs Delivered</div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                    <CountUp end={statistics.professionals_trained} suffix="+" />
              </div>
              <div className={styles.statLabel}>Professionals Trained</div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                    <CountUp end={statistics.satisfaction_rate} suffix="%" />
              </div>
              <div className={styles.statLabel}>Client Satisfaction Rate</div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>
                    <CountUp end={statistics.corporate_partners} suffix="+" />
              </div>
              <div className={styles.statLabel}>Corporate Partners</div>
            </div>
          </ScrollReveal>
            </>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <ScrollReveal>
          <h2>What Our Clients Say</h2>
        </ScrollReveal>
        <div className={styles.testimonialsGrid}>
          {loading ? (
            <p>Loading testimonials...</p>
          ) : (
            testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={index * 200}>
            <div className={styles.testimonialCard}>
              <div className={styles.quoteIcon}>
                <i className="bi bi-quote"></i>
              </div>
                  <p className={styles.testimonialText}>{testimonial.content}</p>
              <div className={styles.testimonialAuthor}>
                    {testimonial.image_url ? (
                      <img 
                        src={testimonial.image_url} 
                        alt={testimonial.name} 
                        className={styles.authorImage}
                      />
                    ) : (
                <div className={styles.authorImage}></div>
                    )}
                <div className={styles.authorInfo}>
                      <h4>{testimonial.name}</h4>
                      {testimonial.company && <p>{testimonial.company}</p>}
                      {testimonial.rating && (
                        <div className={styles.rating}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <i key={i} className="bi bi-star-fill"></i>
                          ))}
                        </div>
                      )}
                </div>
              </div>
            </div>
          </ScrollReveal>
            ))
          )}
        </div>
      </section>

      {/* Client Logos Section */}
      <section className={styles.clientsSection}>
        <ScrollReveal>
          <h2>Trusted By Industry Leaders</h2>
        </ScrollReveal>
        <div className={styles.clientLogos}>
          {loading ? (
            <p>Loading partners...</p>
          ) : (
            partners.map((partner, index) => (
              <ScrollReveal key={partner.id} delay={index * 200}>
            <div className={styles.logoCard}>
                  {partner.logo_url ? (
              <img 
                      src={partner.logo_url} 
                      alt={partner.name} 
                className={styles.logoImage}
              />
                  ) : (
                    <div className={styles.placeholderLogo}></div>
                  )}
                  <p className={styles.companyName}>{partner.name}</p>
                  {partner.website && (
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.websiteLink}
                    >
                      Visit Website
                    </a>
                  )}
            </div>
          </ScrollReveal>
            ))
          )}
        </div>
      </section>
    </div>
  );
} 