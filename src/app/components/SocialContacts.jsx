'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import styles from './SocialContacts.module.css';

export default function SocialContacts() {
  const [socialContacts, setSocialContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialContacts = async () => {
      try {
        const { data, error } = await supabase
          .from('social_contacts')
          .select('*')
          .eq('type', 'social');

        if (error) throw error;
        setSocialContacts(data || []);
      } catch (error) {
        console.error('Error fetching social contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialContacts();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return 'bi-linkedin';
      case 'x':
        return 'bi-twitter-x';
      case 'facebook':
        return 'bi-facebook';
      case 'youtube':
        return 'bi-youtube';
      case 'instagram':
        return 'bi-instagram';
      default:
        return 'bi-link';
    }
  };

  return (
    <div className={styles.socialLinks}>
      {socialContacts.map((contact) => (
        <a
          key={contact.id}
          href={contact.handle_or_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={contact.platform}
        >
          <i className={`bi ${getSocialIcon(contact.platform)}`}></i>
        </a>
      ))}
    </div>
  );
} 