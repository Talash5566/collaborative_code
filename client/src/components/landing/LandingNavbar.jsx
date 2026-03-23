'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Docs',     href: '#docs'     },
  { label: 'Pricing',  href: '#pricing'  },
];

export default function LandingNavbar() {
  const [mounted,   setMounted]   = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [hovered,   setHovered]   = useState(null);

  // Slide-down entrance after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Add border/blur when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      ...styles.nav,
      borderBottomColor: scrolled
        ? 'rgba(255,255,255,0.1)'
        : 'rgba(255,255,255,0.07)',
      opacity:    mounted ? 1 : 0,
      transform:  mounted ? 'translateY(0)' : 'translateY(-16px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease, border-bottom-color 0.3s ease',
    }}>
      {/* Logo */}
      <div style={styles.logo}>
        <div style={styles.logoDot} />
        <span style={styles.logoText}>CodeSync</span>
      </div>

      {/* Center nav links */}
      <div style={styles.links}>
        {NAV_LINKS.map(({ label, href }, i) => (
          <a
            key={label}
            href={href}
            style={{
              ...styles.navLink,
              color: hovered === label ? '#fff' : 'rgba(255,255,255,0.5)',
              opacity:    mounted ? 1 : 0,
              transform:  mounted ? 'translateY(0)' : 'translateY(-8px)',
              transition: `opacity 0.4s ease ${0.1 + i * 0.07}s,
                           transform 0.4s ease ${0.1 + i * 0.07}s,
                           color 0.15s ease`,
            }}
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered(null)}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right buttons */}
      <div style={styles.actions}>
        <Link href="/login" style={{
          ...styles.signInBtn,
          opacity:    mounted ? 1 : 0,
          transform:  mounted ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s, background 0.15s ease',
        }}>
          Sign in
        </Link>
        <Link href="/register" style={{
          ...styles.startBtn,
          opacity:    mounted ? 1 : 0,
          transform:  mounted ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.4s ease 0.38s, transform 0.4s ease 0.38s, background 0.15s ease',
        }}>
          Start coding
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: '56px',
    borderBottom: '1px solid',
    background: 'rgba(28,28,28,0.95)',
    backdropFilter: 'blur(14px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '130px',
  },
  logoDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#3b82f6',
    flexShrink: 0,
  },
  logoText: {
    fontWeight: 600,
    fontSize: '15px',
    color: '#fff',
    letterSpacing: '-0.01em',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
  },
  navLink: {
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    minWidth: '230px',
    justifyContent: 'flex-end',
  },
  signInBtn: {
    padding: '6px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid rgba(255,255,255,0.18)',
    color: '#fff',
    background: 'transparent',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  startBtn: {
    padding: '6px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    background: 'rgba(255,255,255,0.08)',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};