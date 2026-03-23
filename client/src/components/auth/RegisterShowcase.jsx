'use client';
import Link from 'next/link';
import { FEATURES } from '@/constants/registerContent';
import { S } from '@/styles/registerStyles';

export default function RegisterShowcase({ mounted, featureIdx }) {
  return (
    <div
      style={{
        ...S.left,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateX(0)' : 'translateX(-24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <Link href="/" style={S.brand}>
        <div style={S.brandDot} />
        <span style={S.brandText}>CodeSync</span>
      </Link>

      <div style={S.leftBody}>
        <p style={S.eyebrow}>Start for free</p>
        <h2 style={S.heading}>
          Build something
          <br />
          <span style={S.accent}>together.</span>
        </h2>
        <p style={S.sub}>
          Join thousands of developers who use CodeSync to collaborate in real
          time — no installs, no config, just code.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {FEATURES.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              style={{
                ...S.featureItem,
                background:
                  featureIdx === i
                    ? 'rgba(255,255,255,0.04)'
                    : 'transparent',
                borderColor:
                  featureIdx === i
                    ? 'rgba(255,255,255,0.1)'
                    : 'transparent',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-12px)',
                transition: `opacity 0.5s ease ${0.2 + i * 0.1}s,
                              transform 0.5s ease ${0.2 + i * 0.1}s,
                              background 0.4s, border-color 0.4s`,
              }}
            >
              <div style={S.featureIconBox}>{icon}</div>
              <div>
                <p
                  style={{
                    ...S.featureTitle,
                    color:
                      featureIdx === i ? '#fff' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {title}
                </p>
                <p style={S.featureDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={S.testimonial}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {['#3b82f6', '#1D9E75', '#d85a30', '#a6e3a1'].map((c, i) => (
            <div
              key={i}
              style={{
                ...S.testimonialAv,
                background: `${c}33`,
                border: `1.5px solid ${c}66`,
                marginLeft: i > 0 ? '-8px' : 0,
              }}
            />
          ))}
        </div>
        <p style={S.testimonialText}>
          <span style={{ color: '#fff', fontWeight: 500 }}>
            4,000+ developers
          </span>{' '}
          already coding together on CodeSync.
        </p>
      </div>
    </div>
  );
}