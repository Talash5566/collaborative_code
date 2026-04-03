'use client';

export default function UserSidebar({
  users,
  currentUser,
  messages,
  input,
  setInput,
  sendMessage,
}) {
  const fallbackColors = [
    '#93C5FD',
    '#A7F3D0',
    '#FBCFE8',
    '#FDE68A',
    '#C4B5FD',
    '#FCA5A5',
  ];

  return (
    <aside className="hidden w-[320px] shrink-0 border-l border-white/8 bg-[#0f1011] lg:flex lg:flex-col">
      <div className="border-b border-white/8 px-6 py-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
          Collaborators
        </p>
      </div>

      <div className="border-b border-white/8 px-6 py-5">
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
                    {isYou ? 'active now' : 'online'}
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

      <div className="flex min-h-0 flex-1 flex-col px-6 py-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white/30">
          Chat
        </p>

        <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl border border-white/8 bg-black/20 p-4">
          {messages?.length > 0 ? (
            messages.map((msg) => {
              const isYou = msg.username === currentUser?.username;

              return (
                <div
                  key={msg._id || `${msg.username}-${msg.createdAt}-${msg.text}`}
                  className={`flex ${isYou ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      isYou
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/[0.06] text-white/85'
                    }`}
                  >
                    {!isYou && (
                      <p
                        className="mb-1 text-xs font-semibold"
                        style={{ color: msg.avatarColor || '#22c55e' }}
                      >
                        {msg.username}
                      </p>
                    )}
                    <p className="break-words">{msg.text}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-white/30">
              No messages yet
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
            placeholder="Type message..."
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white outline-none placeholder:text-white/25"
          />
          <button
            onClick={sendMessage}
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-emerald-400"
          >
            Send
          </button>
        </div>
      </div>
    </aside>
  );
}