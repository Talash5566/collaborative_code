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
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <button
        onClick={() => router.push('/dashboard')}
        className="flex items-center gap-2 hover:opacity-80"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
        <span className="font-semibold text-gray-900">CodeSync</span>
      </button>

      {user && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold"
              style={{ backgroundColor: user.avatarColor || '#378ADD' }}
            >
              {user.username.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-sm text-gray-700">{user.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}