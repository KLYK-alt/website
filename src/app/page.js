"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ScrollReveal from './components/ScrollReveal';
import { supabase } from '../integrations/supabase/client';

const faqData = [
  {
    q: "What makes KLYK's training unique?",
    a: "Our training combines live weekend classes, direct instructor access, and hands-on experience with real EV components."
  },
  {
    q: "How long are the training programs?",
    a: "Programs vary from 4-week intensive courses to 12-week comprehensive training, depending on your needs."
  },
  {
    q: "Do you offer corporate training?",
    a: "Yes, we provide customized corporate training programs tailored to your organization's specific needs."
  },
  {
    q: "What are the prerequisites for enrollment?",
    a: "Basic understanding of automotive technology is recommended, but we welcome all enthusiastic learners."
  }
];

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [upcomingTrainings, setUpcomingTrainings] = useState([]);
  const [loadingTrainings, setLoadingTrainings] = useState(true);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = (e) => {
    e.preventDefault();
    setShowModal(true);
    setFormStatus({ type: '', message: '' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
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
        subject: 'New Contact Form Submission from KLYK Website',
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
          message: 'Thank you for your message! We will get back to you soon.',
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
  };

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        console.log('Fetched blog posts:', data);
        setBlogPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const fetchUpcomingTrainings = async () => {
      try {
        const { data, error } = await supabase
          .from('new_trainings')
          .select('*')
          .gte('start_date', new Date().toISOString())
          .order('start_date', { ascending: true });

        if (error) throw error;
        console.log('Fetched upcoming trainings:', data);
        setUpcomingTrainings(data || []);
      } catch (error) {
        console.error('Error fetching upcoming trainings:', error);
      } finally {
        setLoadingTrainings(false);
      }
    };

    if (showTrainingModal) {
      fetchUpcomingTrainings();
    }
  }, [showTrainingModal]);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <section className={styles.heroSection}>
          <motion.div 
            className={styles.textBlock}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.headline}>Welcome to Klyk!</h1>
            <h3 className={styles.tagline}>
              Empowering Learning Through Expert-Led Training in Electrical Vehicle Technology
            </h3>
            <motion.a
              href="#contact"
              className={styles.ctaBtn}
              onClick={handleOpenModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us Today!
            </motion.a>
          </motion.div>

          <motion.div 
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/images/home.png"
              alt="EV Technology Training"
              className={styles.heroImage}
            />
          </motion.div>
        </section>
      </section>

      {/* Trust Badges Section */}
      <ScrollReveal>
        <section className={styles.trustSection}>
          <h2>Trusted By Industry Leaders</h2>
          <div className={styles.trustBadges}>
            <motion.div 
              className={styles.badge}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={styles.badgeIcon}>
                <i className="bi bi-award"></i>
              </div>
              <span>ISO 9001:2015</span>
            </motion.div>
            <motion.div 
              className={styles.badge}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={styles.badgeIcon}>
                <i className="bi bi-shield-check"></i>
              </div>
              <span>Industry Certified</span>
            </motion.div>
            <motion.div 
              className={styles.badge}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={styles.badgeIcon}>
                <i className="bi bi-star"></i>
              </div>
              <span>Quality Assured</span>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Latest News/Blog Section */}
      <section className={styles.newsSection}>
        <ScrollReveal>
          <h2>Latest in EV Technology</h2>
        </ScrollReveal>
        <div className={styles.newsGrid}>
          {loading ? (
            <p>Loading blog posts...</p>
          ) : (
            blogPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                className={styles.newsCard}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.newsIcon}>
                  <i className="bi bi-lightning"></i>
                </div>
                <div className={styles.newsContent}>
                  <h3>{post.title}</h3>
                  <p>{post.content.length > 150 
                    ? `${post.content.substring(0, 150)}...` 
                    : post.content}</p>
                  <Link href={`/blog/${post.id}`} className={styles.readMore}>Read More</Link>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </section>

      {/* Training Programs Section */}
      <section className={styles.trainingSection}>
        <ScrollReveal>
          <h2>New Training Programs</h2>
          <p className={styles.sectionDescription}>
            Discover our latest curriculum updates and specialized courses designed to keep you at the forefront of EV technology.
          </p>
        </ScrollReveal>
        <motion.div 
          className={styles.trainingCard}
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.trainingIcon}>
            <i className="bi bi-book"></i>
          </div>
          <div className={styles.trainingContent}>
            <h3>Advanced EV Technology Training</h3>
            <p>Our comprehensive training programs cover everything from basic EV concepts to advanced diagnostic techniques. Stay ahead with our industry-leading curriculum.</p>
            <ul className={styles.trainingFeatures}>
              <li>Hands-on practical sessions</li>
              <li>Expert-led workshops</li>
              <li>Latest industry standards</li>
              <li>Certification upon completion</li>
            </ul>
            <button 
              onClick={() => setShowTrainingModal(true)} 
              className={styles.ctaButton}
            >
              Explore Programs
            </button>
          </div>
        </motion.div>
      </section>

      {/* Portfolio Preview */}
      <section className={styles.portfolioSection}>
        <ScrollReveal>
          <h2>Our Work</h2>
        </ScrollReveal>
        <div className={styles.portfolioGrid}>
          {[
            { title: "EV Training Program", icon: "bi-car-front" },
            { title: "Corporate Workshops", icon: "bi-building" },
            { title: "Technical Documentation", icon: "bi-file-text" },
            { title: "Online Learning Platform", icon: "bi-laptop" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className={styles.portfolioItem}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className={styles.portfolioIcon}>
                <i className={`bi ${item.icon}`}></i>
              </div>
              <div className={styles.portfolioOverlay}>
                <h3>{item.title}</h3>
                <p></p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <ScrollReveal>
          <h2>Frequently Asked Questions</h2>
        </ScrollReveal>
        <ul className={styles.faqList}>
          {faqData.map((faq, index) => (
            <ScrollReveal delay={index * 100} key={index}>
              <li className={styles.faqListItem}>
                <button
                  className={styles.faqQuestionBtn}
                  onMouseEnter={() => setOpenFaq(index)}
                  onMouseLeave={()=> setOpenFaq(index)}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.q}</span>
                  <i className={`bi bi-chevron-${openFaq === index ? 'up' : 'down'} ${styles.faqIcon}`}></i>
                </button>
                {openFaq === index && (
                  <div id={`faq-answer-${index}`} className={styles.faqAnswerList}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </section>

      {/* Training Programs Modal */}
      {showTrainingModal && (
        <motion.div 
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowTrainingModal(false)}
        >
          <motion.div 
            className={styles.trainingModalContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={() => setShowTrainingModal(false)}>
              &times;
            </button>
            <h2>Upcoming Training Programs</h2>
            {loadingTrainings ? (
              <p>Loading upcoming programs...</p>
            ) : upcomingTrainings.length > 0 ? (
              <div className={styles.trainingList}>
                {upcomingTrainings.map((training) => (
                  <div key={training.id} className={styles.trainingItem}>
                    {training.image_url && (
                      <div className={styles.trainingImage}>
                        <img src={training.image_url} alt={training.title} />
                      </div>
                    )}
                    <div className={styles.trainingDetails}>
                      <h3>{training.title}</h3>
                      <p>{training.description}</p>
                      <div className={styles.trainingInfo}>
                        <div className={styles.infoItem}>
                          <i className="bi bi-calendar"></i>
                          <span>
                            {new Date(training.start_date).toLocaleDateString()} - {new Date(training.end_date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className={styles.infoItem}>
                          <i className="bi bi-geo-alt"></i>
                          <span>{training.location}</span>
                        </div>
                        <div className={styles.infoItem}>
                          <i className="bi bi-laptop"></i>
                          <span>{training.mode}</span>
                        </div>
                      </div>
                      {training.registration_link && (
                        <a 
                          href={training.registration_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.registerButton}
                        >
                          Register Now
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No upcoming training programs at the moment. Please check back later.</p>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Contact Modal */}
      {showModal && (
        <motion.div 
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div 
            className={styles.modalContent}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={handleCloseModal}>
              &times;
            </button>
            <h2>Contact Us</h2>
            {formStatus.message && (
              <div className={`${styles.formStatus} ${styles[formStatus.type]}`}>
                {formStatus.message}
              </div>
            )}
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <label>
                Name
                <input type="text" name="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Phone Number
                <input type="tel" name="phone_number" required />
              </label>
              <label>
                Address
                <input type="text" name="address" required />
              </label>
              <label>
                Request Type
                <select name="req_type" required>
                  <option value="">Select Request Type</option>
                  <option value="general_inquiry">General Inquiry</option>
                  <option value="service_request">Service Request</option>
                  <option value="class_registration">Class Registration</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="custom_program">Custom Program</option>
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows={4} required />
              </label>
              <motion.button 
                type="submit" 
                className={styles.submitBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}