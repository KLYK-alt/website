'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import styles from './ContactInfo.module.css';

export default function ContactInfo() {
  const [contactInfo, setContactInfo] = useState({
    emails: [],
    phones: [],
    locations: []
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchContactInfo = async () => {
      try {
        const { data, error } = await supabase
          .from('social_contacts')
          .select('*')
          .in('type', ['email', 'phone', 'location']);

        if (error) throw error;

        const contacts = {
          emails: data.filter(contact => contact.type === 'email'),
          phones: data.filter(contact => contact.type === 'phone'),
          locations: data.filter(contact => contact.type === 'location')
        };

        setContactInfo(contacts);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  // Return a placeholder with the same structure during SSR and initial client render
  if (!mounted) {
    return (
      <ul className={styles.contactInfo}>
        <li className={styles.loading}>Loading contact information...</li>
      </ul>
    );
  }

  if (loading) {
    return (
      <ul className={styles.contactInfo}>
        <li className={styles.loading}>Loading contact information...</li>
      </ul>
    );
  }

  return (
    <ul className={styles.contactInfo}>
      {contactInfo.locations.map((location) => (
        <li key={location.id}>
          <i className="bi bi-geo-alt" aria-hidden="true"></i>
          <span>{location.value}</span>
        </li>
      ))}
      {contactInfo.emails.map((email) => (
        <li key={email.id}>
          <i className="bi bi-envelope" aria-hidden="true"></i>
          <a href={`mailto:${email.value}`}>{email.value}</a>
        </li>
      ))}
      {contactInfo.phones.map((phone) => (
        <li key={phone.id}>
          <i className="bi bi-telephone" aria-hidden="true"></i>
          <a href={`tel:${phone.value}`}>{phone.value}</a>
        </li>
      ))}
    </ul>
  );
} 