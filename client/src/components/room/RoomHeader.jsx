export default function RoomHeader({ room, onCopyLink, usersCount }) {
    return (
      <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          <span className="font-semibold text-gray-900 text-sm">CodeSync</span>
        </div>
        <div className="h-4 w-px bg-gray-200"></div>
        <span className="text-sm text-gray-700 font-medium">{room?.name || 'Room'}</span>
        <code className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-mono">
          {room?.roomId}
        </code>
        <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-medium">
          {room?.language}
        </span>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-500">{usersCount} online</span>
          </div>
          <button
            onClick={onCopyLink}
            className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Share link
          </button>
        </div>
      </div>
    );
  }