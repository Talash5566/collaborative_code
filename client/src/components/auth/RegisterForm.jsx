'use client';
import Link from 'next/link';
import { S } from '@/styles/registerStyles';

export default function RegisterForm({
  mounted,
  form,
  handleChange,
  handleSubmit,
  error,
  fieldErrors,
  loading,
  focusField,
  setFocusField,
  showPass,
  setShowPass,
  strength,
  inputBorder,
  inputShadow,
  iconColor,
}) {
  return (
    <div style={S.right}>
      <div
        style={{
          ...S.card,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s',
        }}
      >
        <div style={{ marginBottom: '28px' }}>
          <h1 style={S.cardTitle}>Create your account</h1>
          <p style={S.cardSub}>
            Already have one?{' '}
            <Link href="/login" style={S.linkBlue}>
              Sign in
            </Link>
          </p>
        </div>

        {error && <ErrorBox message={error} />}

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <Field label="Username" error={fieldErrors.username}>
            <InputRow
              borderColor={inputBorder('username')}
              boxShadow={inputShadow('username')}
            >
              <UserIcon color={iconColor('username')} />
              <input
                type="text"
                value={form.username}
                onChange={(e) => handleChange('username', e.target.value)}
                onFocus={() => setFocusField('username')}
                onBlur={() => setFocusField(null)}
                placeholder="choose a username"
                required
                autoFocus
                autoComplete="username"
                style={S.input}
              />
              {!fieldErrors.username &&
                form.username.trim().length >= 3 &&
                /^[a-zA-Z0-9_-]+$/.test(form.username.trim()) && <CheckIcon />}
            </InputRow>
            {!fieldErrors.username && (
              <p style={S.hint}>
                At least 3 characters. Letters, numbers, _ and - only.
              </p>
            )}
          </Field>

          <Field label="Email address" error={fieldErrors.email}>
            <InputRow
              borderColor={inputBorder('email')}
              boxShadow={inputShadow('email')}
            >
              <EmailIcon color={iconColor('email')} />
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onFocus={() => setFocusField('email')}
                onBlur={() => setFocusField(null)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                style={S.input}
              />
              {!fieldErrors.email &&
                /^\S+@\S+\.\S+$/.test(form.email.trim()) && <CheckIcon />}
            </InputRow>
          </Field>

          <Field label="Password" error={fieldErrors.password}>
            <InputRow
              borderColor={inputBorder('password')}
              boxShadow={inputShadow('password')}
            >
              <LockIcon color={iconColor('password')} />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                onFocus={() => setFocusField('password')}
                onBlur={() => setFocusField(null)}
                placeholder="min. 6 characters"
                required
                autoComplete="new-password"
                style={S.input}
              />
              <EyeToggle
                show={showPass}
                onToggle={() => setShowPass((s) => !s)}
              />
            </InputRow>

            {form.password && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '2px',
                }}
              >
                <div style={{ display: 'flex', gap: '3px', flex: 1 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: '3px',
                        borderRadius: '999px',
                        background:
                          i <= strength.score
                            ? strength.color
                            : 'rgba(255,255,255,0.1)',
                        transition: 'background 0.3s',
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: strength.color,
                    minWidth: '38px',
                  }}
                >
                  {strength.label}
                </span>
              </div>
            )}
          </Field>

          <Field label="Confirm password" error={fieldErrors.confirm}>
            <InputRow
              borderColor={
                form.confirm &&
                form.confirm !== form.password &&
                !fieldErrors.confirm
                  ? 'rgba(239,68,68,0.5)'
                  : inputBorder('confirm')
              }
              boxShadow={inputShadow('confirm')}
            >
              <ShieldIcon color={iconColor('confirm')} />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.confirm}
                onChange={(e) => handleChange('confirm', e.target.value)}
                onFocus={() => setFocusField('confirm')}
                onBlur={() => setFocusField(null)}
                placeholder="repeat your password"
                required
                autoComplete="new-password"
                style={S.input}
              />
              {form.confirm && form.confirm === form.password && <CheckIcon />}
            </InputRow>
          </Field>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...S.submitBtn,
              opacity: loading ? 0.65 : 1,
              transform: loading ? 'scale(0.99)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
              if (!loading)
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')
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
                <span style={S.spinner} /> Creating account...
              </span>
            ) : (
              'Create free account'
            )}
          </button>
        </form>

        <div style={S.divider}>
          <div style={S.dividerLine} />
          <span style={S.dividerText}>or continue with</span>
          <div style={S.dividerLine} />
        </div>

        <button
          style={S.githubBtn}
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
          Sign up with GitHub
        </button>

        <p style={S.fine}>
          By creating an account you agree to our{' '}
          <a href="#" style={S.fineLink}>
            Terms
          </a>{' '}
          and{' '}
          <a href="#" style={S.fineLink}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
      <label style={S.label}>{label}</label>
      {children}
      {error && (
        <p
          style={{
            fontSize: '12px',
            color: '#f87171',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f87171"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function InputRow({ children, borderColor, boxShadow }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid ${borderColor}`,
        borderRadius: '10px',
        padding: '0 14px',
        height: '44px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow,
      }}
    >
      {children}
    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        background: 'rgba(239,68,68,0.08)',
        border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '13px',
        color: '#f87171',
        marginBottom: '20px',
        lineHeight: 1.5,
      }}
    >
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
      {message}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1D9E75"
      strokeWidth="2.5"
      strokeLinecap="round"
      style={{ flexShrink: 0 }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function EyeToggle({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '2px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      {show ? (
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
  );
}

function UserIcon({ color }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      style={{ flexShrink: 0, transition: 'stroke 0.2s' }}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function EmailIcon({ color }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      style={{ flexShrink: 0, transition: 'stroke 0.2s' }}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function LockIcon({ color }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      style={{ flexShrink: 0, transition: 'stroke 0.2s' }}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldIcon({ color }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      style={{ flexShrink: 0, transition: 'stroke 0.2s' }}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}