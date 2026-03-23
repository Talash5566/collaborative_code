'use client';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const STATS = [
  { number: '50+',       label: 'Languages'      },
  { number: '<50ms',     label: 'Sync latency'    },
  { number: 'Real-time', label: 'Cursor tracking' },
];

export default function StatsRow() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <div ref={ref} style={styles.wrapper}>
      <div style={styles.strip}>
        {STATS.map(({ number, label }, i) => (
          <div
            key={label}
            style={{
              ...styles.cell,
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              opacity:    isVisible ? 1 : 0,
              transform:  isVisible ? 'translateY(0)' : 'translateY(20px)',
              // Each stat staggers 120ms after the previous
              transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s,
                           transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
            }}
          >
            <div style={styles.number}>{number}</div>
            <div style={styles.label}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: '880px',
    margin: '0 auto 80px',
    borderTop:    '1px solid rgba(255,255,255,0.07)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  strip: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  cell: {
    padding: '28px 0',
    textAlign: 'center',
  },
  number: {
    fontSize: '30px',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '-0.025em',
    lineHeight: 1,
    marginBottom: '6px',
  },
  label: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.38)',
  },
};