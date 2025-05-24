import './globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ClientNav from './components/ClientNav';
import Footer from './components/Footer';
import ClientLayout from './components/ClientLayout';
import styles from './layout.module.css';

export const metadata = {
  title: 'KLYK - EV Technology Training',
  description: 'Empowering professionals with cutting-edge EV technology training through live, interactive sessions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/fonts/bootstrap-icons.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Add preconnect for external resources */}
        <link rel="preconnect" href="https://api.web3forms.com" />
        <link rel="preconnect" href="https://qhqdooqzaadgpwniyfqk.supabase.co" />
      </head>
      <body className={styles.body}>
        <ClientLayout>
          <ClientNav />
          <div className={styles.mainContent}>{children}</div>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
