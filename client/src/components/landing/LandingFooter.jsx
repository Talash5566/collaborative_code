'use client';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function LandingFooter() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <footer
      ref={ref}
      style={{
        ...styles.footer,
        opacity:   isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Logo */}
      <div style={styles.logoGroup}>
        <div style={styles.dot} />
        <span style={styles.logoText}>CodeSync</span>
      </div>

      <span style={styles.center}>Built with Next.js + Socket.IO</span>

      {/* Links */}
      <div style={styles.links}>
        {['Privacy', 'Terms', 'GitHub'].map((item) => (
          <a key={item} href="#" style={styles.link}
            onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.28)'}>
            {item}
          </a>
        ))}
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 32px',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    flexWrap: 'wrap',
    gap: '12px',
  },
  logoGroup: { display: 'flex', alignItems: 'center', gap: '7px' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' },
  logoText: { fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' },
  center: { fontSize: '13px', color: 'rgba(255,255,255,0.25)' },
  links: { display: 'flex', gap: '20px' },
  link: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.28)',
    textDecoration: 'none',
    transition: 'color 0.15s',
  },
};