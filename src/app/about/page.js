'use client';

import styles from './page.module.css';
import ScrollReveal from '../components/ScrollReveal';
import { useEffect, useState } from 'react';
import { supabase } from '../../integrations/supabase/client';

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setTeamMembers(data || []);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className={styles.container}>
      <ScrollReveal>
        <section className={styles.hero}>
          <h1>About Us</h1>
          <p className={styles.subtitle}>Empowering the future of electric vehicle technology through education</p>
        </section>
      </ScrollReveal>

      <section className={styles.story}>
        <ScrollReveal>
          <h2>Our Story</h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p>
            Founded with a vision to bridge the gap between theoretical knowledge and practical skills in electric vehicle technology, 
            we have grown into a leading provider of specialized training content. Our journey began with a simple yet powerful mission: 
            to make high-quality EV technology education accessible to everyone.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p>
            Today, we specialize in crafting and delivering high-impact training content designed for both online and offline platforms, 
            focusing on real-world electrical vehicle technology skills. Our comprehensive curriculum covers everything from basic 
            maintenance to advanced diagnostic procedures, ensuring that our students are well-equipped for the evolving automotive industry.
          </p>
        </ScrollReveal>
      </section>

      <section className={styles.mission}>
        <ScrollReveal>
          <h2>Mission and Values</h2>
        </ScrollReveal>
        <div className={styles.values}>
          <ScrollReveal delay={0}>
            <div className={styles.valueCard}>
              <h3>Excellence</h3>
              <p>We are committed to delivering the highest quality training content that meets industry standards and exceeds expectations.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className={styles.valueCard}>
              <h3>Innovation</h3>
              <p>We continuously evolve our teaching methods and content to stay at the forefront of EV technology education.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className={styles.valueCard}>
              <h3>Accessibility</h3>
              <p>We believe in making quality education accessible to everyone, regardless of their background or location.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className={styles.valueCard}>
              <h3>Practical Learning</h3>
              <p>We emphasize hands-on experience and real-world applications in all our training programs.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className={styles.team}>
        <ScrollReveal>
          <h2>Our Team</h2>
        </ScrollReveal>
        <div className={styles.teamGrid}>
          {loading ? (
            <p>Loading team members...</p>
          ) : (
            teamMembers.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 100}>
            <div className={styles.teamMember}>
                  {member.image_url ? (
                    <img 
                      src={member.image_url} 
                      alt={member.name} 
                      className={styles.memberImage}
                    />
                  ) : (
              <div className={styles.placeholderImage}></div>
                  )}
                  <h3>{member.name}</h3>
                  <p className={styles.role}>{member.designation}</p>
                  {member.bio && <p>{member.bio}</p>}
            </div>
          </ScrollReveal>
            ))
          )}
        </div>
      </section>
    </div>
  );
} 