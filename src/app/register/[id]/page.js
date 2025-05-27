'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import styles from './page.module.css';
import { supabase } from '../../../integrations/supabase/client';

// const BROCHURE_URL = 'https://drive.google.com/file/d/1R1f4_lGGIMq4gMvx_XNrIoLgky4ffEBQ/view?usp=drive_link'; // Remove hardcoded URL

export default function CourseRegistration() {
  const { id } = useParams();
  const [course, setCourse] = useState(null); // State to store course data
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data, error } = await supabase
          .from('new_trainings')
          .select('link, title') // Select both link and title
          .eq('id', id) // Filter by the course ID from URL params
          .single();

        if (error) throw error;
        setCourse(data); // Store the fetched course data
      } catch (error) {
        console.error('Error fetching course:', error);
        setFormStatus({
          type: 'error',
          message: 'Failed to load course information. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]); // Re-run effect if ID changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course || !course.link) {
      setFormStatus({
        type: 'error',
        message: 'Course information not loaded yet. Please wait.',
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: '', message: 'Opening course brochure...' }); // Update status message

    // Open brochure in a new tab immediately
    window.open(course.link, '_blank');

    let dbSuccess = false;
    let emailSuccess = false;
    let statusMessage = 'Brochure opened.';
    let statusType = 'success';

    try {
      // Collect form data for Supabase insertion into course_registrations table
      const supabaseFormData = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone_number.value, // Map to the 'phone' column name
        address: e.target.address.value,
        message: e.target.message.value,
        inquiry: course.title, 
      };

      console.log('Final formData for Supabase insert into course_registrations:', JSON.stringify(supabaseFormData, null, 2));

      // Attempt to Insert data into course_registrations table
      const { data: insertData, error: supabaseError } = await supabase
        .from('course_registrations')
        .insert(supabaseFormData) 
        .select(); 

      if (supabaseError) {
        console.error('Full Supabase insert error object (course_registrations):', supabaseError);
        statusMessage += ' Failed to save details.';
        statusType = 'warning'; // Use warning for partial success/failure
      } else {
        console.log('Supabase insert successful (course_registrations):', insertData);
        dbSuccess = true;
        statusMessage += ' Details saved.';
      }

    } catch (error) {
      console.error('Unexpected error during Supabase insertion attempt:', error); 
      statusMessage += ' Failed to save details due to unexpected error.';
      statusType = 'warning';
    }

    // Now attempt to send email, regardless of DB insert success
    try {
      // Prepare data for email notification
      const emailData = {
        access_key: 'd252ded0-1d87-4f26-9b4a-5e91569e43ae', // Use your Web3Forms access key
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone_number.value,
        address: e.target.address.value,
        message: e.target.message.value,
        subject: `New Course Registration: ${course?.title || 'Unknown Course'}`, // Include course title in subject
        redirect: false
      };

      console.log('Attempting to send email with data:', emailData);
      console.log('Final emailData object sent to Web3Forms:', JSON.stringify(emailData, null, 2));

      // Send email notification using Web3Forms
      const emailResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      const emailResult = await emailResponse.json();
      console.log('Email API response:', emailResult);

      if (emailResult.success) {
        console.log('Email sent successfully.');
        emailSuccess = true;
        statusMessage += ' Email sent.';
      } else {
        console.error('Error sending email:', emailResult);
        statusMessage += ' Failed to send email.';
        statusType = 'warning'; // Stay warning if already warning, or become warning
      }

    } catch (error) {
      console.error('Unexpected error during email sending attempt:', error);
      statusMessage += ' Failed to send email due to unexpected error.';
      statusType = 'warning';
    }

    // Final status update based on outcomes
    if (dbSuccess && emailSuccess) {
        setFormStatus({ type: 'success', message: 'Details saved and email sent! Brochure opened.' });
    } else if (statusType === 'warning') { // If either failed, and status is warning
        setFormStatus({ type: 'warning', message: statusMessage });
    } else { // If both failed and status is not warning (shouldn't happen with current logic but as fallback)
         setFormStatus({ type: 'error', message: 'Brochure opened, but failed to save details and send email.' });
    }

    setIsSubmitting(false);
    // Reset form fields after opening link, regardless of insert/email success
    e.target.reset(); 
    setPhoneNumber(''); 
    // Clear form status after a delay
    setTimeout(() => {
      setFormStatus({ type: '', message: '' });
    }, 5000); // Clear message after 5 seconds
  };

  // Add loading state rendering
  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading course information...</p>
      </div>
    );
  }

  // Add course not found state
  if (!course) {
    return (
      <div className={styles.container}>
        <p>Course not found or link unavailable.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Course Registration</h1>
        <p className={styles.subtitle}>Complete the form below to access the course brochure</p>
      </section>

      <section className={styles.registrationSection}>
        {formStatus.message && (
          <div className={`${styles.formStatus} ${styles[formStatus.type]}`}>
            {formStatus.message}
          </div>
        )}

        <form className={styles.registrationForm} onSubmit={handleSubmit}>
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
            <PhoneInput
              country={'in'}
              value={phoneNumber}
              onChange={phone => setPhoneNumber(phone)}
              inputProps={{
                name: 'phone_number',
                required: true,
                placeholder: 'Enter phone number',
              }}
              containerClass={styles.phoneInputContainer}
              inputClass={styles.phoneInput}
              buttonClass={styles.phoneInputButton}
            />
          </label>
          <label>
            Address
            <input type="text" name="address" required />
          </label>
          <label>
            Message (Optional)
            <textarea name="message" rows={4} />
          </label>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Register & Get Brochure'}
          </button>
        </form>
      </section>
    </div>
  );
} 