'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/hooks/useSocket';
import api from '@/lib/api';
import UserSidebar from '@/components/room/UserSidebar';
import RoomHeader from '@/components/room/RoomHeader';
import Editor from '@monaco-editor/react';
import useDebounce from '@/hooks/useDebounce';
export default function RoomPage() {
  const { roomId } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { emit, on, connected } = useSocket();
  const isRemoteChange = useRef(false);
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [roomLoading, setRoomLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [code, setCode] = useState('');
  const [cursorPosition, setCursorPosition] = useState(null);
  const [remoteCursors, setRemoteCursors] = useState({});
  const debouncedCode = useDebounce(code, 50);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!roomId) return;

    api
      .get(`/api/rooms/${roomId}`)
      .then(({ data }) => {
        setRoom(data.room);
        setCode(data.room.code || '// Start coding here');
      })
      .catch(() =>
        setError('Room not found. Check the room code and try again.')
      )
      .finally(() => setRoomLoading(false));
  }, [roomId]);

  useEffect(() => {
    if (!room || !user || !connected) return;

    emit('join_room', {
      roomId,
      username: user.username,
    });
  }, [room, user, roomId, connected, emit]);

  useEffect(() => {
    return on('room_users', (updatedUsers) => {
      setUsers(updatedUsers);

    });
  }, [on]);

  useEffect(() => {
    const cleanupJoin = on('user_connected', ({ username }) => {
      setNotification(`${username} joined the room`);
      setTimeout(() => setNotification(''), 2500);
    });

    const cleanupLeft = on('user_disconnected', ({ username }) => {
      setNotification(`${username} left the room`);
      setTimeout(() => setNotification(''), 2500);
    });

    return () => {
      cleanupJoin();
      cleanupLeft();
    };
  }, [on]);

  useEffect(() => {
    if (!connected || !roomId) return;
    if (debouncedCode === '') return;
    if (isRemoteChange.current) {
      isRemoteChange.current = false;
      return;
    }


    emit('code_change', {
      roomId,
      code: debouncedCode,
    });
  }, [debouncedCode, connected, roomId, emit]);

  useEffect(() => {
    const cleanup = on('code_update', (incomingCode) => {
      if (!editorRef.current) return;

      const editor = editorRef.current;

      const position = editor.getPosition(); // save cursor

      isRemoteChange.current = true;
      setCode(incomingCode);

      setTimeout(() => {
        editor.setPosition(position); // restore cursor
      }, 0);
    });

    return cleanup;
  }, [on]);

  useEffect(() => {
    const cleanup = on('load_room_data', (data) => {
      console.log('Initial room data:', data);

      isRemoteChange.current = true;
      setCode(data.code || '// Start coding here...');
    });

    return cleanup;
  }, [on]);

  useEffect(() => {
    if (!connected || !roomId || !user || !cursorPosition) return;
  
    emit('cursor_move', {
      roomId,
      username: user.username,
      lineNumber: cursorPosition.lineNumber,
      column: cursorPosition.column,
    });
  }, [cursorPosition, connected, roomId, user, emit]);


  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setNotification('Room link copied');
    setTimeout(() => setNotification(''), 2500);
  };

  if (authLoading || roomLoading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-sm text-white/45">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-5 px-6">
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
    <div className="h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.06),transparent_20%)]" />

      <div className="relative flex h-full flex-col">
        <RoomHeader
          room={room}
          onCopyLink={copyRoomLink}
          usersCount={users.length}
        />

        {notification && (
          <div className="absolute left-1/2 top-20 z-50 -translate-x-1/2 rounded-xl border border-white/12 bg-zinc-900/90 px-4 py-2 text-sm text-white shadow-2xl backdrop-blur-xl">
            {notification}
          </div>
        )}

        <main className="flex flex-1 overflow-hidden px-4 pb-4">
          <div className="flex flex-1 overflow-hidden rounded-[28px] border border-white/10 bg-[#0c0c0d] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <section className="flex min-w-0 flex-1 flex-col">
              <div className="flex h-14 items-center justify-between border-b border-white/8 bg-[#101112] px-5">
                <div className="flex items-center gap-5">
                  <button className="relative text-sm font-medium text-white">
                    main.{room?.language === 'python' ? 'py' : room?.language === 'java' ? 'java' : room?.language === 'cpp' ? 'cpp' : 'js'}
                    <span className="absolute -bottom-[18px] left-0 h-[2px] w-full rounded-full bg-blue-500" />
                  </button>

                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-full border border-emerald-500/15 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    {users.length} live
                  </div>
                </div>
              </div>

              <div className="min-h-0 flex-1 bg-[#1e1e1e]">
                <Editor
                  height="100%"
                  defaultLanguage={room?.language || 'javascript'}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  onMount={(editor, monaco) => {
                    editorRef.current = editor;
                    monacoRef.current = monaco;

                    editor.onDidChangeCursorPosition((e) => {
                      setCursorPosition(
                        {
                          lineNumber: e.position.lineNumber,
                          column: e.position.column
                        }
                      )
                    })
                  }}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    lineHeight: 26,
                    padding: { top: 18 },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    smoothScrolling: true,
                    wordWrap: 'on',
                    tabSize: 2,
                    roundedSelection: true,
                    cursorBlinking: 'smooth',
                    overviewRulerBorder: false,
                    hideCursorInOverviewRuler: true,
                  }}
                />
              </div>
            </section>

            <UserSidebar users={users} currentUser={user} />
          </div>
        </main>
      </div>
    </div>
  );
}