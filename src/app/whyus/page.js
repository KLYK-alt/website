'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.css';
import { supabase } from '../../integrations/supabase/client';

// Dynamically import heavy components with loading fallback
const ScrollReveal = dynamic(() => import('../components/ScrollReveal'), {
  loading: () => <div className={styles.loadingPlaceholder}>Loading...</div>,
  ssr: false
});

// Separate form component for better organization
const ContactForm = ({ onSubmit, isSubmitting, formStatus }) => (
  <form className={styles.contactForm} onSubmit={onSubmit}>
    <div className={styles.formGroup}>
      <input type="text" name="name" placeholder="Your Name" required />
    </div>
    
    <div className={styles.formGroup}>
      <input type="email" name="email" placeholder="Your Email" required />
    </div>
    
    <div className={styles.formGroup}>
      <input type="tel" name="phone_number" placeholder="Your Phone" required />
    </div>
    
    <div className={styles.formGroup}>
      <input type="text" name="address" placeholder="Your Address" required />
    </div>
    
    <div className={styles.formGroup}>
      <select name="req_type" required>
        <option value="">Select Your Interest</option>
        <option value="service_request">Service Request</option>
        <option value="class_registration">Class Registration</option>
        <option value="collaboration">Collaboration</option>
        <option value="custom_program">Custom Program</option>
      </select>
    </div>

    <div className={styles.formGroup}>
      <textarea name="message" placeholder="Describe your query" rows="4" required></textarea>
    </div>

    <button 
      type="submit" 
      className={styles.submitButton}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Sending...' : 'Register Your Interest'}
    </button>
  </form>
);

// Separate contact info component
const ContactInfo = ({ contactInfo, isLoading }) => (
  <div className={styles.contactInfo}>
    {isLoading ? (
      <div className={styles.contactItem}>
        <span>Loading contact information...</span>
      </div>
    ) : (
      <>
        <div className={styles.contactItem}>
          <i className="bi bi-envelope" aria-hidden="true"></i>
          <span>{contactInfo.email || 'Email not available'}</span>
        </div>
        <div className={styles.contactItem}>
          <i className="bi bi-telephone" aria-hidden="true"></i>
          <span>{contactInfo.phone_number || 'Phone not available'}</span>
        </div>
        <div className={styles.contactItem}>
          <i className="bi bi-geo-alt" aria-hidden="true"></i>
          <span>{contactInfo.address || 'Address not available'}</span>
        </div>
      </>
    )}
  </div>
);

// Feature card component for better code organization
const FeatureCard = ({ icon, title, description, delay }) => (
  <Suspense fallback={<div className={styles.loadingPlaceholder}>Loading...</div>}>
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

export default function WhyUsPage() {
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({ email: '', phone_number: '', address: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Memoize the fetch function
  const fetchContactInfo = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('contact_us')
        .select()
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching contact info:', error);
        return;
      }

      if (data) {
        setContactInfo({
          email: data.email || '',
          phone_number: data.phone_number || '',
          address: data.address || ''
        });
      } else {
        // Set default values if no data exists
        setContactInfo({
          email: 'contact@klyk.com',
          phone_number: '+91 1234567890',
          address: 'KLYK Techno Solutions, India'
        });
      }
    } catch (error) {
      console.error('Error in fetchContactInfo:', error);
      // Set default values on error
      setContactInfo({
        email: 'contact@klyk.com',
        phone_number: '+91 1234567890',
        address: 'KLYK Techno Solutions, India'
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchContactInfo();

    // Set up realtime subscription
    const subscription = supabase
      .channel('contact_us_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_us',
          filter: 'id=eq.1'
        },
        (payload) => {
          if (payload.new) {
            setContactInfo({
              email: payload.new.email || '',
              phone_number: payload.new.phone_number || '',
              address: payload.new.address || ''
            });
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchContactInfo]);

  // Memoize the submit handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Store in Supabase first
      const { error: supabaseError } = await supabase
        .from('contact_us')
        .insert({
          name: e.target.name.value,
          email: e.target.email.value,
          phone_number: e.target.phone_number.value,
          address: e.target.address.value,
          message: e.target.message.value,
          req_type: e.target.req_type.value
        });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      // Then send email
      const formData = {
        access_key: 'd252ded0-1d87-4f26-9b4a-5e91569e43ae',
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone_number.value,
        address: e.target.address.value,
        message: e.target.message.value,
        req_type: e.target.req_type.value,
        subject: 'New Registration Interest from KLYK Website',
        redirect: false
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus({
          type: 'success',
          message: 'Thank you for your interest! We will contact you soon.',
        });
        e.target.reset();
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Clear form status after 3 seconds
  useEffect(() => {
    if (formStatus.message) {
      const timer = setTimeout(() => {
        setFormStatus({ type: '', message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [formStatus.message]);

  return (
    <div className={styles.container}>
      <Suspense fallback={<div className={styles.loadingPlaceholder}>Loading...</div>}>
        <ScrollReveal>
          <section className={styles.hero}>
            <h1>Why Choose KLYK?</h1>
            <p className={styles.subtitle}>Live Learning, Real Results: Your Path to EV Excellence</p>
          </section>
        </ScrollReveal>
      </Suspense>

      <div className={styles.contentGrid}>
        {/* Main Content */}
        <section className={styles.mainContent}>
          <FeatureCard
            icon="calendar-check"
            title="Weekend Live Classes"
            description="Unlike traditional pre-recorded courses, KLYK brings you real-time, interactive weekend sessions. Learn at your own pace without disrupting your career. Our live format ensures you get immediate answers to your questions and real-time feedback on your progress."
            delay={0}
          />

          <FeatureCard
            icon="people"
            title="Direct Instructor Access"
            description="Get personalized attention from industry experts. Our instructors are available during live sessions to address your specific challenges and provide hands-on guidance. Build a strong professional relationship with mentors who are actively working in the EV industry."
            delay={200}
          />

          <FeatureCard
            icon="hand-index-thumb"
            title="Hands-on Experience"
            description="Theory meets practice in our comprehensive training programs. Work with actual EV components, perform real diagnostics, and solve practical challenges. Our hands-on approach ensures you're job-ready from day one."
            delay={400}
          />

          <FeatureCard
            icon="diagram-3"
            title="Peer Network"
            description="Join a community of like-minded professionals. Collaborate, share experiences, and build valuable connections that extend beyond the classroom. Our peer network is your gateway to industry opportunities and continuous learning."
            delay={600}
          />
        </section>

        {/* Lead Capture Form */}
        <section className={styles.leadCapture}>
          <Suspense fallback={<div className={styles.loadingPlaceholder}>Loading...</div>}>
            <ScrollReveal>
              <div className={styles.formCard}>
                <h2>Start Your EV Journey Today</h2>
                <p className={styles.formSubtitle}>
                  Join our next weekend batch and transform your career in EV technology
                </p>
                
                {formStatus.message && (
                  <div className={`${styles.formStatus} ${styles[formStatus.type]}`}>
                    {formStatus.message}
                  </div>
                )}

                <ContactForm 
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  formStatus={formStatus}
                />

                <ContactInfo 
                  contactInfo={contactInfo}
                  isLoading={isLoading}
                />
              </div>
            </ScrollReveal>
          </Suspense>
        </section>
      </div>
    </div>
  );
} 