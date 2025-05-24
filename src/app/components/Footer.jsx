'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
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
            <div className={styles.socialLinks}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
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
              <li><Link href="/service#video">EV Training Videos</Link></li>
              <li><Link href="/service#curriculum">Curriculum Development</Link></li>
              <li><Link href="/service#online">Online Learning</Link></li>
              <li><Link href="/service#corporate">Corporate Training</Link></li>
              <li><Link href="/service#documentation">Technical Documentation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.section}>
            <h4>Contact Us</h4>
            <ul className={styles.contactInfo}>
              <li>
                <i className="bi bi-geo-alt" aria-hidden="true"></i>
                <span>KLYK Techno Solutions, India</span>
              </li>
              <li>
                <i className="bi bi-telephone" aria-hidden="true"></i>
                <span>+91 1234567890</span>
              </li>
              <li>
                <i className="bi bi-envelope" aria-hidden="true"></i>
                <span>contact@klyk.com</span>
              </li>
            </ul>
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