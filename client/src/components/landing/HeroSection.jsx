'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import EditorPreview from './EditorPreview';

export default function HeroSection() {
  const [step, setStep] = useState(0);

  // Stagger each hero element in sequence
  useEffect(() => {
    const delays = [100, 350, 580, 780, 1000];
    const timers = delays.map((d, i) =>
      setTimeout(() => setStep(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const show = (n) => step >= n;

  return (
    <section style={styles.section}>

      {/* Badge — pops in first */}
      <div style={{
        ...styles.badge,
        opacity:    show(1) ? 1 : 0,
        transform:  show(1) ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(-8px)',
        transition: 'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <div style={styles.badgeDot} />
        Real-time collaboration — now with AI
      </div>

      {/* Heading — slides up */}
      <h1 style={{
        ...styles.heading,
        opacity:    show(2) ? 1 : 0,
        transform:  show(2) ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
      }}>
        Code together, in real time —<br />from anywhere
      </h1>

      {/* Subtext */}
      <p style={{
        ...styles.subtext,
        opacity:    show(3) ? 1 : 0,
        transform:  show(3) ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
      }}>
        A collaborative code editor built for developers. Share a link, start
        coding — no setup, no install.
      </p>

      {/* CTA buttons */}
      <div style={{
        ...styles.ctaGroup,
        opacity:    show(4) ? 1 : 0,
        transform:  show(4) ? 'translateY(0)' : 'translateY(14px)',
        transition: 'opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <Link href="/register" style={styles.ctaPrimary}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}>
          Create a room — it&apos;s free
        </Link>
        <Link href="/room/demo" style={styles.ctaSecondary}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>
          Join demo room
        </Link>
      </div>

      {/* Editor — scales up last */}
      <div style={{
        opacity:    show(5) ? 1 : 0,
        transform:  show(5) ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
        transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <EditorPreview />
      </div>
    </section>
  );
}

const styles = {
  section: {
    textAlign: 'center',
    padding: '64px 24px 0',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '999px',
    padding: '6px 16px',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '28px',
  },
  badgeDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#3b82f6',
    flexShrink: 0,
  },
  heading: {
    fontSize: 'clamp(34px, 5vw, 62px)',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.025em',
    color: '#fff',
    maxWidth: '820px',
    margin: '0 auto 20px',
  },
  subtext: {
    fontSize: '17px',
    color: 'rgba(255,255,255,0.45)',
    maxWidth: '480px',
    margin: '0 auto 36px',
    lineHeight: 1.65,
  },
  ctaGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '48px',
  },
  ctaPrimary: {
    padding: '11px 26px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 500,
    border: '1px solid rgba(255,255,255,0.28)',
    color: '#fff',
    background: 'rgba(255,255,255,0.07)',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background 0.15s',
  },
  ctaSecondary: {
    padding: '11px 26px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 500,
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.6)',
    background: 'transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background 0.15s, color 0.15s',
  },
};