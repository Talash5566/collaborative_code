'use client';
import { useRouter } from 'next/navigation';

export default function RoomHeader({ room, onCopyLink, usersCount }) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-3 transition hover:opacity-80"
          >
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-xl font-semibold tracking-tight text-white">
              CodeSync
            </span>
          </button>

          <div className="hidden h-6 w-px bg-white/10 md:block" />

          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">
              {room?.name || 'Untitled room'}
            </p>
            <p className="mt-0.5 font-mono text-xs text-white/35">
              {room?.roomId}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-sm text-white/60">
              {usersCount} collaborator{usersCount !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm capitalize text-white/60 sm:block">
            {room?.language || 'javascript'}
          </div>

          <button
            onClick={onCopyLink}
            className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.1]"
          >
            Copy link
          </button>
        </div>
      </div>
    </header>
  );
}