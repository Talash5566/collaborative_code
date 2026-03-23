'use client';
import Link from 'next/link';
import { styles } from '@/styles/loginStyles';

export default function LoginForm({
  mounted,
  form,
  setForm,
  error,
  loading,
  focusField,
  setFocusField,
  showPass,
  setShowPass,
  handleSubmit,
}) {
  return (
    <div style={styles.rightPanel}>
      <div
        style={{
          ...styles.formCard,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s',
        }}
      >
        <div style={styles.formHeader}>
          <h1 style={styles.formTitle}>Sign in</h1>
          <p style={styles.formSubtitle}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={styles.authLink}>
              Create one free
            </Link>
          </p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f87171"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ flexShrink: 0, marginTop: '1px' }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email address</label>
            <div
              style={{
                ...styles.inputWrap,
                borderColor:
                  focusField === 'email'
                    ? 'rgba(59,130,246,0.7)'
                    : error
                    ? 'rgba(239,68,68,0.4)'
                    : 'rgba(255,255,255,0.1)',
                boxShadow:
                  focusField === 'email'
                    ? '0 0 0 3px rgba(59,130,246,0.12)'
                    : 'none',
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke={
                  focusField === 'email'
                    ? '#3b82f6'
                    : 'rgba(255,255,255,0.3)'
                }
                strokeWidth="2"
                strokeLinecap="round"
                style={{ flexShrink: 0, transition: 'stroke 0.2s' }}
              >
                <path d="M4 4h16v16H4z" opacity="0" />
                <path d="M4 6h16v12H4z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                onFocus={() => setFocusField('email')}
                onBlur={() => setFocusField(null)}
                placeholder="your email"
                required
                autoFocus
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <label style={styles.label}>Password</label>
              <Link href="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <div
              style={{
                ...styles.inputWrap,
                borderColor:
                  focusField === 'password'
                    ? 'rgba(59,130,246,0.7)'
                    : error
                    ? 'rgba(239,68,68,0.4)'
                    : 'rgba(255,255,255,0.1)',
                boxShadow:
                  focusField === 'password'
                    ? '0 0 0 3px rgba(59,130,246,0.12)'
                    : 'none',
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke={
                  focusField === 'password'
                    ? '#3b82f6'
                    : 'rgba(255,255,255,0.3)'
                }
                strokeWidth="2"
                strokeLinecap="round"
                style={{ flexShrink: 0, transition: 'stroke 0.2s' }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>

              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                onFocus={() => setFocusField('password')}
                onBlur={() => setFocusField(null)}
                placeholder="your password"
                required
                style={styles.input}
              />

              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                style={styles.eyeBtn}
              >
                {showPass ? (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.65 : 1,
              transform: loading ? 'scale(0.99)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
              if (!loading)
                e.currentTarget.style.background = 'rgba(255,255,255,0.16)';
            }}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')
            }
          >
            {loading ? (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center',
                }}
              >
                <span style={styles.spinner} />
                Signing in...
              </span>
            ) : (
              'Sign in to CodeSync'
            )}
          </button>
        </form>

        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or continue with</span>
          <div style={styles.dividerLine} />
        </div>

        <button
          style={styles.githubBtn}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="rgba(255,255,255,0.8)"
          >
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          Continue with GitHub
        </button>

        <p style={styles.footerNote}>
          By signing in you agree to our{' '}
          <a href="#" style={styles.termsLink}>
            Terms
          </a>{' '}
          and{' '}
          <a href="#" style={styles.termsLink}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}