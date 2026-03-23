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

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  // Load recent rooms from localStorage (simple approach for Phase 1)
  useEffect(() => {
    const stored = localStorage.getItem('cs_recent_rooms');
    if (stored) setRecentRooms(JSON.parse(stored));
  }, []);

  const addToRecent = (room) => {
    const updated = [room, ...recentRooms.filter(r => r.roomId !== room.roomId)].slice(0, 6);
    setRecentRooms(updated);
    localStorage.setItem('cs_recent_rooms', JSON.stringify(updated));
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim()) { setError('Enter a room name'); return; }
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

  const handleJoinRoom = () => {
    const code = joinCode.trim();
    if (!code) { setError('Enter a room code'); return; }
    router.push(`/room/${code}`);
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Welcome, {user.username}
        </h1>
        <p className="text-sm text-gray-500 mb-8">Create a room or join an existing one.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
            <button onClick={() => setError('')} className="float-right font-bold">×</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Create room card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Create a new room</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateRoom()}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Room name (e.g. DSA practice)"
              />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <button
                onClick={handleCreateRoom}
                disabled={creating}
                className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {creating ? 'Creating...' : '+ Create room'}
              </button>
            </div>
          </div>

          {/* Join room card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Join existing room</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                placeholder="Room code e.g. x7k3m9pq"
              />
              <button
                onClick={handleJoinRoom}
                className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Join room
              </button>
            </div>
          </div>
        </div>

        {/* Recent rooms */}
        {recentRooms.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Recent rooms
            </h2>
            <div className="space-y-2">
              {recentRooms.map((room) => (
                <button
                  key={room.roomId}
                  onClick={() => router.push(`/room/${room.roomId}`)}
                  className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-blue-300 transition-colors text-left"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{room.name}</p>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{room.roomId}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                    {room.language}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}