'use client';

// Static editor preview mockup — purely decorative, shown inside HeroSection

const SIDEBAR_USERS = [
  { initials: 'AK', name: 'Arjun K',  status: 'typing...', color: '#3b82f6' },
  { initials: 'PV', name: 'Priya V',  status: 'line 5',    color: '#1D9E75' },
  { initials: 'RS', name: 'Rahul S',  status: 'viewing',   color: '#d85a30' },
];

export default function EditorPreview() {
  return (
    <div style={styles.shell}>
      {/* Title bar */}
      <div style={styles.titleBar}>
        <div style={styles.trafficLights}>
          <div style={{ ...styles.dot, background: '#ff5f57' }} />
          <div style={{ ...styles.dot, background: '#ffbd2e' }} />
          <div style={{ ...styles.dot, background: '#28c840' }} />
        </div>
        <div style={styles.tabs}>
          <Tab label="main.py" active />
          <Tab label="utils.js" />
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <LivePill count={3} />
        </div>
      </div>

      {/* Editor body */}
      <div style={styles.body}>
        {/* Code panel */}
        <div style={styles.codePanel}>
          {/* Line numbers */}
          <div style={styles.lineNums}>
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <div key={n} style={styles.lineNum}>{n}</div>
            ))}
          </div>
          {/* Code content */}
          <div style={styles.codeContent}>
            <Line><Kw>def</Kw> <Fn>find_max</Fn>(arr):</Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;<Kw>if not</Kw> arr: <Kw>return</Kw> <Kw>None</Kw></Line>
            <Line hl="blue">
              &nbsp;&nbsp;&nbsp;&nbsp;max_val = arr[0]<BlinkCursor color="#3b82f6" />
            </Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;<Kw>for</Kw> x <Kw>in</Kw> arr[1:]:</Line>
            <Line hl="red">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Kw>if</Kw> x &gt; max_val:<BlinkCursor color="#ef4444" />
            </Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max_val = x</Line>
            <Line>&nbsp;&nbsp;&nbsp;&nbsp;<Kw>return</Kw> max_val</Line>
            <Line />
            <Line><Cmt># O(n) time — linear scan</Cmt></Line>
          </div>
        </div>

        {/* User sidebar */}
        <div style={styles.sidebar}>
          <p style={styles.sidebarLabel}>IN THIS ROOM</p>
          {SIDEBAR_USERS.map(u => (
            <SidebarUser key={u.initials} {...u} />
          ))}
          <div style={styles.langBlock}>
            <p style={styles.langLabel}>LANGUAGE</p>
            <p style={styles.langVal}>Python 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Tab({ label, active }) {
  return (
    <div style={{
      padding: '3px 12px', borderRadius: '5px', fontSize: '12px',
      color:       active ? '#fff' : 'rgba(255,255,255,0.35)',
      background:  active ? 'rgba(255,255,255,0.1)' : 'transparent',
      border:      `1px solid ${active ? 'rgba(255,255,255,0.14)' : 'transparent'}`,
    }}>
      {label}
    </div>
  );
}

function LivePill({ count }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      background: 'rgba(29,158,117,0.15)',
      border: '1px solid rgba(29,158,117,0.3)',
      borderRadius: '999px', padding: '3px 10px',
      fontSize: '11px', color: '#1D9E75',
    }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1D9E75' }} />
      {count} live
    </div>
  );
}

function Line({ children, hl }) {
  return (
    <div style={{
      minHeight: '22px',
      whiteSpace: 'pre',
      ...(hl === 'blue' ? {
        background: 'rgba(59,130,246,0.1)',
        margin: '0 -16px', padding: '0 16px',
        borderLeft: '2px solid #3b82f6',
      } : {}),
      ...(hl === 'red' ? {
        background: 'rgba(239,68,68,0.07)',
        margin: '0 -16px', padding: '0 16px',
      } : {}),
    }}>
      {children}
    </div>
  );
}

function Kw({ children }) {
  return <span style={{ color: '#89b4fa' }}>{children}</span>;
}
function Fn({ children }) {
  return <span style={{ color: '#a6e3a1' }}>{children}</span>;
}
function Cmt({ children }) {
  return <span style={{ color: 'rgba(255,255,255,0.22)' }}>{children}</span>;
}
function BlinkCursor({ color }) {
  return (
    <span style={{
      display: 'inline-block',
      width: '2px', height: '14px',
      background: color,
      verticalAlign: 'text-bottom',
      margin: '0 1px',
      animation: 'blink 1s infinite',
    }} />
  );
}

function SidebarUser({ initials, name, status, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '12px' }}>
      <div style={{
        width: '30px', height: '30px', borderRadius: '50%',
        background: `${color}22`, border: `1.5px solid ${color}66`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '10px', fontWeight: 700, color, flexShrink: 0,
      }}>
        {initials}
      </div>
      <div>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#fff', margin: 0 }}>{name}</p>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: 0, marginTop: '1px' }}>{status}</p>
      </div>
    </div>
  );
}

/* ── Styles ── */
const styles = {
  shell: {
    maxWidth: '880px', margin: '0 auto',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px', overflow: 'hidden',
    background: '#141414',
  },
  titleBar: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '10px 16px', background: '#1e1e1e',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  trafficLights: { display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 },
  dot: { width: '11px', height: '11px', borderRadius: '50%' },
  tabs: { display: 'flex', gap: '6px', alignItems: 'center' },
  body: { display: 'grid', gridTemplateColumns: '1fr 200px' },
  codePanel: {
    display: 'grid', gridTemplateColumns: '40px 1fr',
    borderRight: '1px solid rgba(255,255,255,0.07)',
  },
  lineNums: {
    padding: '16px 0',
    background: 'rgba(0,0,0,0.18)',
    borderRight: '1px solid rgba(255,255,255,0.04)',
    textAlign: 'right',
    fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
    fontSize: '12px', color: 'rgba(255,255,255,0.18)', lineHeight: 1.75,
  },
  lineNum: { padding: '0 8px' },
  codeContent: {
    padding: '16px',
    fontFamily: "'JetBrains Mono','Fira Code','Courier New',monospace",
    fontSize: '12.5px', lineHeight: 1.75, color: '#cdd6f4',
  },
  sidebar: { padding: '16px', background: '#161616' },
  sidebarLabel: {
    fontSize: '10px', fontWeight: 600,
    color: 'rgba(255,255,255,0.28)',
    letterSpacing: '0.08em', marginBottom: '14px', margin: '0 0 14px',
  },
  langBlock: {
    marginTop: '16px', paddingTop: '14px',
    borderTop: '1px solid rgba(255,255,255,0.07)',
  },
  langLabel: {
    fontSize: '10px', color: 'rgba(255,255,255,0.28)',
    letterSpacing: '0.08em', marginBottom: '5px', margin: '0 0 5px',
  },
  langVal: { fontSize: '13px', color: 'rgba(255,255,255,0.65)', margin: 0 },
};