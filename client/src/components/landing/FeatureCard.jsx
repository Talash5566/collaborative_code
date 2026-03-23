'use client';
import { useState } from 'react';

/**
 * FeatureCard
 * Props:
 *   icon       — JSX (SVG)
 *   iconBg     — CSS background string for the icon box
 *   title      — string
 *   description — string
 *   animDelay  — number (seconds) for stagger offset
 *   isVisible  — boolean from parent's IntersectionObserver
 */
export default function FeatureCard({ icon, iconBg, title, description, animDelay = 0, isVisible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible
          ? hovered ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(28px)',
        // Scroll-in transition
        transition: isVisible
          ? `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${animDelay}s,
             transform 0.6s cubic-bezier(0.22,1,0.36,1) ${animDelay}s,
             border-color 0.2s ease,
             background 0.2s ease`
          : `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${animDelay}s,
             transform 0.6s cubic-bezier(0.22,1,0.36,1) ${animDelay}s`,
        borderColor: hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
        background:  hovered ? '#252525' : '#212121',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon box */}
      <div style={{ ...styles.iconBox, background: iconBg }}>
        {icon}
      </div>

      <h3 style={styles.title}>{title}</h3>
      <p  style={styles.desc}>{description}</p>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: '14px',
    border: '1px solid',
    padding: '24px',
    cursor: 'default',
  },
  iconBox: {
    width: '42px', height: '42px',
    borderRadius: '10px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: '18px', flexShrink: 0,
  },
  title: {
    fontSize: '15px', fontWeight: 600,
    color: '#fff', marginBottom: '10px', lineHeight: 1.3,
  },
  desc: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.42)',
    lineHeight: 1.65, margin: 0,
  },
};