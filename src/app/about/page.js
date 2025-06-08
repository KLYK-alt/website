'use client';

import styles from './page.module.css';
import ScrollReveal from '../components/ScrollReveal';
import { useEffect, useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import Image from 'next/image';

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [missionVision, setMissionVision] = useState({
    missions: [],
    visions: [],
    story: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch team members
        const { data: teamData, error: teamError } = await supabase
          .from('team_members')
          .select('*')
          .order('created_at', { ascending: true });

        if (teamError) throw teamError;
        setTeamMembers(teamData || []);

        // Fetch mission, vision, and story
        const { data: mvData, error: mvError } = await supabase
          .from('mission_vision')
          .select('*')
          .order('created_at', { ascending: true });

        if (mvError) throw mvError;

        // Organize mission, vision, and story data
        const mv = {
          missions: mvData?.filter(item => item.type === 'mission') || [],
          visions: mvData?.filter(item => item.type === 'vision') || [],
          story: mvData?.find(item => item.type === 'story') || null
        };
        setMissionVision(mv);
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
          <h1>About Us</h1>
          <p className={styles.subtitle}>Empowering the future of electric vehicle technology through education</p>
        </section>
      </ScrollReveal>

      <section className={styles.story}>
        <ScrollReveal>
          <h2>Our Story</h2>
        </ScrollReveal>
        {loading ? (
          <div className={styles.storyContent}>
            <p>Loading our story...</p>
          </div>
        ) : !missionVision.story ? (
          <>
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
          </>
        ) : (
          <ScrollReveal delay={100}>
            <p>{missionVision.story.content}</p>
          </ScrollReveal>
        )}
      </section>

      <section className={styles.mission}>
        <ScrollReveal>
          <h2>Our Missions</h2>
        </ScrollReveal>
        <div className={styles.values}>
          {loading ? (
            <div className={styles.valueCard}>
              <h3>Loading...</h3>
              <p>Loading mission content...</p>
            </div>
          ) : missionVision.missions.length === 0 ? (
            <div className={styles.valueCard}>
              <h3>Our Mission</h3>
              <p>To empower professionals with cutting-edge EV technology training through live, interactive sessions.</p>
            </div>
          ) : (
            missionVision.missions.map((mission, index) => (
              <ScrollReveal key={mission.id} delay={index * 100}>
                <div className={styles.valueCard}>
                  <h3>{mission.title}</h3>
                  <p>{mission.content}</p>
                </div>
              </ScrollReveal>
            ))
          )}
        </div>
      </section>

      <section className={styles.mission}>
        <ScrollReveal>
          <h2>Our Visions</h2>
        </ScrollReveal>
        <div className={styles.values}>
          {loading ? (
            <div className={styles.valueCard}>
              <h3>Loading...</h3>
              <p>Loading vision content...</p>
            </div>
          ) : missionVision.visions.length === 0 ? (
            <div className={styles.valueCard}>
              <h3>Our Vision</h3>
              <p>To be the global leader in EV technology education, shaping the future of sustainable transportation.</p>
            </div>
          ) : (
            missionVision.visions.map((vision, index) => (
              <ScrollReveal key={vision.id} delay={index * 100}>
                <div className={styles.valueCard}>
                  <h3>{vision.title}</h3>
                  <p>{vision.content}</p>
                </div>
              </ScrollReveal>
            ))
          )}
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
                    <Image 
                      src={member.image_url} 
                      alt={member.name} 
                      className={styles.memberImage}
                      width={200}
                      height={200}
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