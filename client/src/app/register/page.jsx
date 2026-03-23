'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import RegisterShowcase from '@/components/auth/RegisterShowcase';
import RegisterForm from '@/components/auth/RegisterForm';
import { FEATURES, getStrength } from '@/constants/registerContent';
import { S } from '@/styles/registerStyles';

export default function RegisterPage() {
  const router = useRouter();
  const { register, user, loading: authLoading } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [featureIdx, setFeatureIdx] = useState(0);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const strength = getStrength(form.password);

  useEffect(() => {
    if (!authLoading && user) router.push('/dashboard');
  }, [user, authLoading, router]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setFeatureIdx((i) => (i + 1) % FEATURES.length),
      2500
    );
    return () => clearInterval(id);
  }, []);

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));

    if (fieldErrors[field]) {
      setFieldErrors((fe) => {
        const n = { ...fe };
        delete n[field];
        return n;
      });
    }

    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const errs = {};

    if (!form.username.trim()) errs.username = 'Username is required.';
    else if (form.username.trim().length < 3)
      errs.username = 'At least 3 characters.';
    else if (!/^[a-zA-Z0-9_-]+$/.test(form.username.trim()))
      errs.username = 'Only letters, numbers, _ and -.';

    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      errs.email = 'Enter a valid email address.';

    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6)
      errs.password = 'Minimum 6 characters.';

    if (form.password !== form.confirm)
      errs.confirm = 'Passwords do not match.';

    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await register(
        form.username.trim(),
        form.email.trim().toLowerCase(),
        form.password
      );
      router.push('/dashboard');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Something went wrong. Please try again.';

      if (msg.toLowerCase().includes('username')) {
        setFieldErrors({ username: msg });
      } else if (msg.toLowerCase().includes('email')) {
        setFieldErrors({ email: msg });
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputBorder = (field) => {
    if (fieldErrors[field]) return 'rgba(239,68,68,0.55)';
    if (focusField === field) return 'rgba(59,130,246,0.7)';
    return 'rgba(255,255,255,0.1)';
  };

  const inputShadow = (field) =>
    focusField === field ? '0 0 0 3px rgba(59,130,246,0.12)' : 'none';

  const iconColor = (field) =>
    focusField === field ? '#3b82f6' : 'rgba(255,255,255,0.3)';

  return (
    <div style={S.root}>
      <RegisterShowcase mounted={mounted} featureIdx={featureIdx} />

      <RegisterForm
        mounted={mounted}
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        fieldErrors={fieldErrors}
        loading={loading}
        focusField={focusField}
        setFocusField={setFocusField}
        showPass={showPass}
        setShowPass={setShowPass}
        strength={strength}
        inputBorder={inputBorder}
        inputShadow={inputShadow}
        iconColor={iconColor}
      />
    </div>
  );
}