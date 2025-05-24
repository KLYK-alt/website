'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import ScrollReveal from '../../components/ScrollReveal';
import { supabase } from '../../../integrations/supabase/client';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        console.log('Fetching blog post with ID:', id);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        if (!data) {
          console.log('No blog post found with ID:', id);
          setError('Blog post not found');
        } else {
          console.log('Blog post found:', data);
          setPost(data);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.container}>
        <p>Blog post not found</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ScrollReveal>
        <article className={styles.blogPost}>
          {post.image_url && (
            <div className={styles.heroImage}>
              <img src={post.image_url} alt={post.title} />
            </div>
          )}
          <div className={styles.content}>
            <h1>{post.title}</h1>
            <div className={styles.meta}>
              <p>By {post.author}</p>
              <p>{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
            <div className={styles.body}>
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </ScrollReveal>
    </div>
  );
} 