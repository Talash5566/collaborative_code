import FeatureCard from './FeatureCard';
import useScrollAnimation from '@/hooks/useScrollAnimation';

/* ── Icons (inline SVG, no library needed) ── */
const icons = {
  play: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.75)" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  cursor: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#1D9E75" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l16 8-8 2-2 8z" />
    </svg>
  ),
  sync: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#d85a30" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  room: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.75)" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  star: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#EF9F27" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#1D9E75" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

const FEATURES = [
  {
    icon: icons.play,
    iconBg: 'rgba(255,255,255,0.1)',
    title: 'Live code execution',
    description: 'Run code directly in the browser. Supports Python, JS, C++, Java and 47 more languages via a secure sandbox.',
  },
  {
    icon: icons.cursor,
    iconBg: 'rgba(29,158,117,0.15)',
    title: 'Multi-user cursor tracking',
    description: 'See exactly where your collaborators are editing, in real time — every cursor, every selection, color-coded.',
  },
  {
    icon: icons.sync,
    iconBg: 'rgba(216,90,48,0.15)',
    title: 'Conflict-free sync',
    description: 'Simultaneous edits? No problem. Operational Transform ensures everyone sees the same code, always.',
  },
  {
    icon: icons.room,
    iconBg: 'rgba(255,255,255,0.08)',
    title: 'Persistent rooms',
    description: 'Every room gets a permanent URL. Save your work, come back anytime, share with your team in one click.',
  },
  {
    icon: icons.star,
    iconBg: 'rgba(239,159,39,0.15)',
    title: 'Version history',
    description: 'Every saved snapshot is stored. Browse, compare, and restore previous versions — like Git for your session.',
  },
  {
    icon: icons.chat,
    iconBg: 'rgba(29,158,117,0.12)',
    title: 'Built-in chat',
    description: 'A live chat sidebar inside every room — so your team can discuss without switching to Slack.',
  },
];

export default function FeaturesGrid() {
  // One observer for the whole grid — when grid enters view, all cards animate
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="features" style={styles.section}>
      <div ref={ref} style={styles.grid}>
        {FEATURES.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            {...feature}
            isVisible={isVisible}
            // Row 1 cards: 0, 0.1, 0.2s   Row 2 cards: 0.15, 0.25, 0.35s
            animDelay={i < 3 ? i * 0.1 : 0.15 + (i - 3) * 0.1}
          />
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: '880px',
    margin: '0 auto',
    padding: '0 24px 100px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '14px',
  },
};