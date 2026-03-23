'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthShowcase from '@/components/auth/AuthShowcase';
import LoginForm from '@/components/auth/LoginForm';
import { CODE_PREVIEW } from '@/constants/authPreview';
import { styles } from '@/styles/loginStyles';

export default function LoginPage() {
  const router = useRouter();
  const { login, user, loading: authLoading } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [codeStep, setCodeStep] = useState(0);

// CHECK USER AND PUSH HIM TO DASHBOARD
  useEffect(() => {
    if (!authLoading && user) router.push('/dashboard');
  }, [user, authLoading, router]);

// THIS IS FOR ANIMATION 
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

// FOR ANIMATION
  useEffect(() => {
    if (codeStep >= CODE_PREVIEW.length) return;
    const t = setTimeout(() => setCodeStep((s) => s + 1), 180);
    return () => clearTimeout(t);
  }, [codeStep]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await login(form.email.trim(), form.password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      <AuthShowcase mounted={mounted} codeStep={codeStep} />

      <LoginForm
        mounted={mounted}
        form={form}
        setForm={setForm}
        error={error}
        loading={loading}
        focusField={focusField}
        setFocusField={setFocusField}
        showPass={showPass}
        setShowPass={setShowPass}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}