'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LandingNavbar  from '@/components/landing/LandingNavbar';
import HeroSection    from '@/components/landing/HeroSection';
import StatsRow       from '@/components/landing/StatsRow';
import FeaturesGrid   from '@/components/landing/FeaturesGrid';
import LandingFooter  from '@/components/landing/LandingFooter';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.push('/dashboard');
  }, [user, loading, router]);

  return (
    <main className="landing-root">
      <LandingNavbar />
      <HeroSection />
      <StatsRow />
      <FeaturesGrid />
      <LandingFooter />
    </main>
  );
}