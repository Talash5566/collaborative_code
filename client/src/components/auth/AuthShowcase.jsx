'use client';
import Link from 'next/link';
import { CODE_PREVIEW, TOKEN_COLORS } from '@/constants/authPreview';
import { styles } from '@/styles/loginStyles';

export default function AuthShowcase({ mounted, codeStep }) {
  return (
    <div
      style={{
        ...styles.leftPanel,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateX(0)' : 'translateX(-24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <Link href="/" style={styles.brand}>
        <div style={styles.brandDot} />
        <span style={styles.brandText}>CodeSync</span>
      </Link>

      <div style={styles.leftContent}>
        <div style={styles.leftEyebrow}>Welcome back</div>
        <h2 style={styles.leftHeading}>
          Your rooms are
          <br />
          waiting for you.
        </h2>
        <p style={styles.leftSub}>
          Sign in to access your collaborative sessions, version history, and
          everything your team left off on.
        </p>

        <div style={styles.codeBlock}>
          <div style={styles.codeTopBar}>
            <div style={styles.codeDots}>
              <div style={{ ...styles.codeDot, background: '#ff5f57' }} />
              <div style={{ ...styles.codeDot, background: '#ffbd2e' }} />
              <div style={{ ...styles.codeDot, background: '#28c840' }} />
            </div>
            <span style={styles.codeFileName}>session.js</span>
          </div>

          <div style={styles.codeBody}>
            {CODE_PREVIEW.slice(0, codeStep).map((line, i) => (
              <div key={i} style={styles.codeLine}>
                <span style={styles.codeNum}>{i + 1}</span>
                <span style={{ paddingLeft: `${line.indent * 16}px` }}>
                  {line.tokens.map((tok, j) => (
                    <span key={j} style={{ color: TOKEN_COLORS[tok.t] }}>
                      {tok.v}
                    </span>
                  ))}
                  {i === codeStep - 1 && codeStep < CODE_PREVIEW.length && (
                    <span style={styles.cursor} />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.leftStats}>
        {[
          ['50+', 'Languages'],
          ['<50ms', 'Latency'],
          ['10k+', 'Rooms created'],
        ].map(([n, l]) => (
          <div key={l} style={styles.stat}>
            <span style={styles.statNum}>{n}</span>
            <span style={styles.statLabel}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}