'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/hooks/useSocket';
import api from '@/lib/api';
import Navbar from '@/components/layout/Navbar';
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
    api.get(`/api/rooms/${roomId}`)
      .then(({ data }) => setRoom(data.room))
      .catch(() => setError('Room not found. Check the room code and try again.'))
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
    return () => { cleanupJoin(); cleanupLeft(); };
  }, [on]);

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setNotification('Room link copied to clipboard!');
    setTimeout(() => setNotification(''), 3000);
  };

  if (authLoading || roomLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-gray-500">Loading room...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <RoomHeader room={room} onCopyLink={copyRoomLink} usersCount={users.length} />

      {/* Toast notification */}
      {notification && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow">
          {notification}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Editor placeholder — Monaco comes in Phase 2 */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white border-r border-gray-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue="// Start coding here..."
              theme="vs-dark"
            />
            <div className="mt-4 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-700 font-medium">
                Phase 1 working — {users.length} user{users.length !== 1 ? 's' : ''} connected
              </p>
            </div>
          </div>
        </div>

        <UserSidebar users={users} currentUser={user} />
      </div>
    </div>
  );
}