'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/hooks/useSocket';
import api from '@/lib/api';
import UserSidebar from '@/components/room/UserSidebar';
import RoomHeader from '@/components/room/RoomHeader';
import Editor from '@monaco-editor/react';

export default function RoomPage() {
  const { roomId } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { emit, on, connected } = useSocket();

  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [roomLoading, setRoomLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  // Fetch room from REST API
  useEffect(() => {
    if (!roomId) return;

    api
      .get(`/api/rooms/${roomId}`)
      .then(({ data }) => setRoom(data.room))
      .catch(() =>
        setError('Room not found. Check the room code and try again.')
      )
      .finally(() => setRoomLoading(false));
  }, [roomId]);

  // Join the Socket.IO room once room + user are both ready
  useEffect(() => {
    if (!room || !user || !connected) return;

    emit('join_room', {
      roomId,
      username: user.username,
    });
  }, [room, user, roomId, connected, emit]);

  // Listen for live user list updates
  useEffect(() => {
    return on('room_users', (updatedUsers) => {
      setUsers(updatedUsers);
    });
  }, [on]);

  // Show join/leave notifications briefly
  useEffect(() => {
    const cleanupJoin = on('user_connected', ({ username }) => {
      setNotification(`${username} joined the room`);
      setTimeout(() => setNotification(''), 3000);
    });

    const cleanupLeft = on('user_disconnected', ({ username }) => {
      setNotification(`${username} left the room`);
      setTimeout(() => setNotification(''), 3000);
    });

    return () => {
      cleanupJoin();
      cleanupLeft();
    };
  }, [on]);

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setNotification('Room link copied to clipboard!');
    setTimeout(() => setNotification(''), 3000);
  };

  if (authLoading || roomLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-sm text-white/45">Loading room...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-5 px-6">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
          {error}
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.1]"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.10),transparent_28%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_24%)] pointer-events-none" />

      <div className="relative flex h-full flex-col">
        <RoomHeader
          room={room}
          onCopyLink={copyRoomLink}
          usersCount={users.length}
        />

        {notification && (
          <div className="absolute left-1/2 top-20 z-50 -translate-x-1/2 rounded-xl border border-white/12 bg-zinc-900/95 px-4 py-2 text-sm text-white shadow-2xl backdrop-blur">
            {notification}
          </div>
        )}

        <div className="flex flex-1 overflow-hidden px-4 pb-4">
          <div className="flex flex-1 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm">
            {/* Main editor area */}
            <div className="flex min-w-0 flex-1 flex-col border-r border-white/8">
              {/* Fake tabs / top editor bar */}
              <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.02] px-5 py-3">
                <div className="flex items-center gap-6 text-sm">
                  <button className="border-b-2 border-blue-500 pb-3 -mb-3 font-medium text-white">
                    main.py
                  </button>
                  <button className="text-white/45 transition hover:text-white/70">
                    solution.py
                  </button>
                  <button className="text-blue-500 transition hover:text-blue-400">
                    + New file
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-3 text-xs text-white/35">
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                    {users.length} live
                  </span>
                </div>
              </div>

              {/* Monaco editor */}
              <div className="min-h-0 flex-1 bg-[#1e1e1e]">
                <Editor
                  height="100%"
                  defaultLanguage={room?.language || 'javascript'}
                  defaultValue={room?.code || '// Start coding here...'}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    wordWrap: 'on',
                    smoothScrolling: true,
                    padding: { top: 18 },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                  }}
                />
              </div>
            </div>

            {/* Right sidebar */}
            <UserSidebar users={users} currentUser={user} />
          </div>
        </div>
      </div>
    </div>
  );
}