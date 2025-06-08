'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import SocialContacts from './SocialContacts';
import ContactInfo from './ContactInfo';
import { supabase } from '../../integrations/supabase/client';

export default function Footer() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Return a placeholder with the same structure during SSR and initial client render
  if (!mounted) {
    return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Company Info */}
            <div className={styles.section}>
              <h3>KLYK</h3>
              <p className={styles.description}>
                Empowering professionals with cutting-edge EV technology training through live, interactive sessions.
              </p>
              <SocialContacts />
            </div>

            {/* Quick Links */}
            <div className={styles.section}>
              <h4>Quick Links</h4>
              <ul className={styles.links}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/service">Services</Link></li>
                <li><Link href="/testimonials">Testimonials</Link></li>
                <li><Link href="/whyus">Why Choose Us</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className={styles.section}>
              <h4>Our Services</h4>
              <ul className={styles.links}>
                <li>Loading services...</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className={styles.section}>
              <h4>Contact Us</h4>
              <ContactInfo />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={styles.bottomBar}>
            <div className={styles.copyright}>
              © {new Date().getFullYear()} KLYK. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div className={styles.section}>
            <h3>KLYK</h3>
            <p className={styles.description}>
              Empowering professionals with cutting-edge EV technology training through live, interactive sessions.
            </p>
            <SocialContacts />
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h4>Quick Links</h4>
            <ul className={styles.links}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/service">Services</Link></li>
              <li><Link href="/testimonials">Testimonials</Link></li>
              <li><Link href="/whyus">Why Choose Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className={styles.section}>
            <h4>Our Services</h4>
            <ul className={styles.links}>
              {loading ? (
                <li>Loading services...</li>
              ) : services.length > 0 ? (
                services.map((service) => (
                  <li key={service.id}>
                    <Link href={`/service#${service.slug}`}>
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No services available</li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.section}>
            <h4>Contact Us</h4>
            <ContactInfo />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} KLYK. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 