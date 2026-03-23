export const FEATURES = [
    {
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 8 12 12 14 14" />
        </svg>
      ),
      title: 'Rooms in under 10 seconds',
      desc: 'Create a room, share the link — your team joins instantly.',
    },
    {
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1D9E75"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Up to 50 collaborators',
      desc: 'Code review, pair programming, or live demos — all in one place.',
    },
    {
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a6e3a1"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      title: '50+ languages supported',
      desc: 'Python, JS, C++, Go, Rust and dozens more — with syntax highlighting.',
    },
    {
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#EF9F27"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      title: 'Version history always saved',
      desc: 'Every snapshot is stored — restore any version in one click.',
    },
  ];
  
  export function getStrength(pw) {
    if (!pw) return { score: 0, label: '', color: 'transparent' };
  
    let s = 0;
    if (pw.length >= 6) s++;
    if (pw.length >= 10) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
  
    if (s <= 1) return { score: s, label: 'Weak', color: '#ef4444' };
    if (s <= 2) return { score: s, label: 'Fair', color: '#f97316' };
    if (s <= 3) return { score: s, label: 'Good', color: '#EF9F27' };
    return { score: s, label: 'Strong', color: '#1D9E75' };
  }