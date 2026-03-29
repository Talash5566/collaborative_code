'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-3 transition hover:opacity-80"
        >
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-xl font-semibold tracking-tight text-white">
            CodeSync
          </span>
        </button>

        {user && (
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 sm:flex">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: user.avatarColor || '#378ADD' }}
              >
                {user.username.slice(0, 2).toUpperCase()}
              </div>

              <div className="text-left">
                <p className="text-sm font-medium text-white">{user.username}</p>
                <p className="text-xs text-white/35">Workspace active</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-white/12 bg-transparent px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/[0.06] hover:text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}