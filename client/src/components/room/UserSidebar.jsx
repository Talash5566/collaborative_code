export default function UserSidebar({ users, currentUser }) {
    return (
      <div className="w-52 bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
        <div className="px-3 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            In this room · {users.length}
          </p>
        </div>
  
        <div className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {users.map((u) => {
            const isYou = u.username === currentUser?.username;
            return (
              <div key={u.socketId}
                className={`flex items-center gap-2.5 p-2 rounded-lg ${isYou ? 'bg-blue-50' : ''}`}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                  style={{ backgroundColor: u.avatarColor || '#378ADD' }}
                >
                  {u.username.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 truncate">
                    {u.username}
                    {isYou && <span className="text-xs text-gray-400 ml-1">(you)</span>}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <p className="text-xs text-gray-400">online</p>
                  </div>
                </div>
              </div>
            );
          })}
          {users.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-4">Connecting...</p>
          )}
        </div>
      </div>
    );
  }