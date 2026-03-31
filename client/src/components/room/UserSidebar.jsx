'use client';

export default function UserSidebar({ users, currentUser }) {
  const fallbackColors = ['#93C5FD', '#A7F3D0', '#FBCFE8', '#FDE68A', '#C4B5FD', '#FCA5A5'];

  return (
    <aside className="hidden w-[320px] shrink-0 border-l border-white/8 bg-[#0f1011] lg:flex lg:flex-col">
      <div className="border-b border-white/8 px-6 py-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
          Collaborators
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="space-y-5">
          {users.map((u, index) => {
            const isYou = u.username === currentUser?.username;

            return (
              <div key={u.socketId} className="flex items-start gap-3">
                <div className="mt-4 h-2.5 w-2.5 rounded-full bg-emerald-400" />

                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-black"
                  style={{
                    backgroundColor:
                      u.avatarColor || fallbackColors[index % fallbackColors.length],
                  }}
                >
                  {u.username.slice(0, 2).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {u.username}
                    {isYou && <span className="ml-1 text-white/45">(you)</span>}
                  </p>
                  <p className="mt-0.5 text-sm text-white/38">
                    {isYou ? 'active now' : index % 2 === 0 ? 'typing...' : 'viewing'}
                  </p>
                </div>
              </div>
            );
          })}

          {users.length === 0 && (
            <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-5 text-center text-sm text-white/35">
              Connecting...
            </div>
          )}
        </div>

      </div>
    </aside>
  );
}