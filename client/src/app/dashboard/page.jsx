'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Navbar from '@/components/layout/Navbar';

const LANGUAGES = ['javascript', 'python', 'cpp', 'java', 'typescript', 'go'];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [creating, setCreating] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [joinCode, setJoinCode] = useState('');
  const [recentRooms, setRecentRooms] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    const loadRecentRooms = async () => {
      const stored = localStorage.getItem('cs_recent_rooms');
      if (!stored) return;

      try {
        const parsedRooms = JSON.parse(stored);

        const checkedRooms = await Promise.all(
          parsedRooms.map(async (room) => {
            try {
              await api.get(`/api/rooms/${room.roomId}`);
              return room;
            } catch {
              return null;
            }
          })
        );

        const validRooms = checkedRooms.filter(Boolean);

        setRecentRooms(validRooms);
        localStorage.setItem('cs_recent_rooms', JSON.stringify(validRooms));
      } catch (error) {
        console.log('recent rooms cleanup error:', error.message);
        localStorage.removeItem('cs_recent_rooms');
        setRecentRooms([]);
      }
    };

    loadRecentRooms();
  }, []);

  const addToRecent = (room) => {
    const updated = [room, ...recentRooms.filter((r) => r.roomId !== room.roomId)].slice(0, 6);
    setRecentRooms(updated);
    localStorage.setItem('cs_recent_rooms', JSON.stringify(updated));
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      setError('Enter a room name');
      return;
    }

    setCreating(true);
    setError('');

    try {
      const { data } = await api.post('/api/rooms', {
        name: roomName.trim(),
        language,
      });

      addToRecent(data.room);
      router.push(`/room/${data.room.roomId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create room');
    } finally {
      setCreating(false);
    }
  };

  const handleJoinRoom = async () => {
    const code = joinCode.trim();

    if (!code) {
      setError('Enter a room code');
      return;
    }

    try {
      const { data } = await api.get(`/api/rooms/${code}`);
      addToRecent(data.room);
      router.push(`/room/${code}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Room not found');
    }
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_30%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_25%)] pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Workspace dashboard
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Welcome back, {user.username}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
              Create a new collaboration room, join an existing workspace, and
              continue coding with your team in real time.
            </p>
          </div>

          {error && (
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-300">
              <div className="flex items-center justify-between gap-4">
                <span>{error}</span>
                <button
                  onClick={() => setError('')}
                  className="text-red-300/80 hover:text-red-200"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm">
              <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-400/90">
                  Create room
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Start a fresh session
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/40">
                  Create a new room, choose your language, and invite others with
                  the room code.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-white/65">
                    Room name
                  </label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateRoom()}
                    placeholder="e.g. DSA practice, System design"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-blue-500/60 focus:bg-white/[0.05]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/65">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/60 focus:bg-white/[0.05]"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang} className="bg-neutral-900">
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleCreateRoom}
                  disabled={creating}
                  className="w-full rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.14] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {creating ? 'Creating...' : 'Create room'}
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm">
              <div className="mb-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400/90">
                  Join room
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Enter an existing workspace
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/40">
                  Paste a room code shared by your team and continue where the
                  session left off.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-white/65">
                    Room code
                  </label>
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
                    placeholder="e.g. a5o-bsv"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:font-mono placeholder:text-white/20 transition focus:border-emerald-500/60 focus:bg-white/[0.05]"
                  />
                </div>

                <button
                  onClick={handleJoinRoom}
                  className="w-full rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/[0.06] hover:text-white"
                >
                  Join room
                </button>
              </div>

              <div className="mt-8 rounded-2xl border border-white/8 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/30">
                  Quick note
                </p>
                <p className="mt-2 text-sm leading-6 text-white/45">
                  Sharing the exact room code is enough for another user to join
                  the same collaborative session.
                </p>
              </div>
            </section>
          </div>

          {recentRooms.length > 0 && (
            <section className="mt-12">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/35">
                    Recent rooms
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Continue your recent sessions
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
                  {recentRooms.length} saved
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {recentRooms.map((room) => (
                  <button
                    key={room.roomId}
                    onClick={() => router.push(`/room/${room.roomId}`)}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-blue-400/30 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-base font-medium text-white">
                          {room.name}
                        </p>
                        <p className="mt-2 font-mono text-xs text-white/30">
                          {room.roomId}
                        </p>
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs capitalize text-white/55">
                        {room.language}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-sm text-white/35 group-hover:text-white/55">
                        Open workspace
                      </span>
                      <span className="text-white/25 transition group-hover:translate-x-1 group-hover:text-white/50">
                        →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}