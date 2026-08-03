import { useState, useEffect, useRef } from 'react';
import { api } from '../utils/api';
import { 
  Shield, Sparkles, UserCheck, MessageSquare, ArrowRight, 
  Send, Ticket, Megaphone, Volume2, ShieldAlert, Terminal, Lock
} from 'lucide-react';

const Youtube = ({ size = 16, className = '', style = {} }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    className={className}
    style={style}
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.969.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.389-.507a3.007 3.007 0 0 0 2.11-2.11C24 15.969 24 12 24 12s0-3.969-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

function BotTerminal({ onAdminLogin }) {
  const [logs, setLogs] = useState([
    { type: 'system', text: 'TIMOXITER BOT OS v1.0.0 Booting...' },
    { type: 'system', text: 'Initializing Gateway connection...' },
    { type: 'success', text: '[OK] Connected to Discord API Gateway' },
    { type: 'success', text: '[OK] Logged in as TIMOXITER#1507' },
    { type: 'info', text: '[INFO] Syncing commands on active servers...' },
    { type: 'info', text: '[INFO] Loaded Shield, Welcome & Ticket modules' }
  ]);
  const [commandInput, setCommandInput] = useState('');
  const consoleEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const logTemplates = [
      { type: 'shield', text: '[SHIELD] Scanned message in #general: OK' },
      { type: 'welcome', text: '[WELCOME] Canvas card generated for member' },
      { type: 'ticket', text: '[TICKETS] Active tickets listener polling...' },
      { type: 'info', text: '[STATUS] Latency: 22ms | CPU: 1.2% | RAM: 184MB' },
      { type: 'shield', text: '[SHIELD] Link filter scanned URL: Safe' },
      { type: 'moderation', text: '[MODERATION] Auto-archived ticket channel' },
      { type: 'gateway', text: '[GATEWAY] Discord heartbeat acknowledged' }
    ];

    const interval = setInterval(() => {
      const randomTemplate = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs(prev => [
        ...prev.slice(-8),
        { type: randomTemplate.type, text: `[${timestamp}] ${randomTemplate.text}` }
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollTop = consoleEndRef.current.scrollHeight;
    }
  }, [logs]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    setLogs(prev => [
      ...prev,
      { type: 'input', text: `$ ${cmd}` }
    ]);
    setCommandInput('');

    const cmdLower = cmd.toLowerCase();
    if (cmdLower === 'admin login') {
      setLogs(prev => [
        ...prev,
        { type: 'success', text: 'Opening Admin Portal...' }
      ]);
      setTimeout(() => {
        if (onAdminLogin) onAdminLogin();
      }, 400);
    } else if (cmdLower === 'help') {
      setLogs(prev => [
        ...prev,
        { type: 'system', text: 'Available commands:' },
        { type: 'info', text: '  status      - Display bot system metrics and host info' },
        { type: 'info', text: '  ping        - Test connection latency' },
        { type: 'info', text: '  admin login - Access administrator login' },
        { type: 'info', text: '  clear       - Clear terminal console logs' }
      ]);
    } else if (cmdLower === 'status') {
      setLogs(prev => [
        ...prev,
        { type: 'info', text: '--- System Metrics ---' },
        { type: 'success', text: 'Gateway Status: Connected' },
        { type: 'info', text: `Ping: ${Math.floor(Math.random() * 15) + 12}ms` },
        { type: 'info', text: 'CPU Usage: 1.2%' },
        { type: 'info', text: 'RAM Usage: 184.2 MB' },
        { type: 'system', text: 'Uptime: 4 days, 12 hours, 3 minutes' }
      ]);
    } else if (cmdLower === 'ping') {
      setLogs(prev => [
        ...prev,
        { type: 'success', text: `Pong! Latency: ${Math.floor(Math.random() * 15) + 12}ms` }
      ]);
    } else if (cmdLower === 'clear') {
      setLogs([]);
    } else {
      setLogs(prev => [
        ...prev,
        { type: 'moderation', text: `Command not found: "${cmd}". Type "help" for available commands.` }
      ]);
    }
  };

  return (
    <div className="pro-card" style={{
      fontFamily: '"JetBrains Mono", Consolas, Monaco, monospace',
      fontSize: '0.825rem',
      backgroundColor: '#070a11',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #1e293b',
      boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
      textAlign: 'left'
    }}>
      {/* Developer Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 14px',
        backgroundColor: '#0f1422',
        borderBottom: '1px solid #1e293b',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
          <span style={{ marginLeft: '8px', color: '#64748b', fontSize: '0.75rem', fontWeight: '500' }}>bash — bot status</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.75rem', fontWeight: '600' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          ONLINE
        </div>
      </div>
      {/* Console output */}
      <div 
        ref={consoleEndRef}
        onClick={handleTerminalClick}
        style={{
          padding: '16px',
          height: '270px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          lineHeight: '1.5',
          cursor: 'text'
        }}
      >
        {logs.map((log, index) => {
          let color = '#94a3b8';
          if (log.type === 'success') color = '#10b981';
          if (log.type === 'shield') color = '#38bdf8';
          if (log.type === 'welcome') color = '#a78bfa';
          if (log.type === 'ticket') color = '#f59e0b';
          if (log.type === 'system') color = '#60a5fa';
          if (log.type === 'moderation') color = '#f87171';
          if (log.type === 'input') color = '#f8fafc';
          return (
            <div key={index} style={{ color, wordBreak: 'break-all' }}>
              {log.text}
            </div>
          );
        })}
        {/* Command Input Form */}
        <form onSubmit={handleCommandSubmit} style={{ display: 'flex', alignItems: 'center', color: '#f8fafc', marginTop: '4px' }}>
          <span style={{ color: '#5865f2', marginRight: '8px', fontWeight: 'bold' }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            style={{
              flexGrow: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontFamily: '"JetBrains Mono", Consolas, monospace',
              fontSize: '0.825rem',
              padding: 0
            }}
            placeholder="Type 'help', 'status', or 'admin login'..."
          />
        </form>
      </div>
    </div>
  );
}

export default function LandingPage({ onAdminLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { url } = await api.getDiscordAuthUrl();
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setError('Failed to contact the backend server. Make sure it is running.');
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.1)',
      title: 'Moderation System',
      description: 'Automated spam detection, message filtering, warn/kick/ban commands, and audit logs.'
    },
    {
      icon: Sparkles,
      color: '#3b82f6',
      bg: 'rgba(59, 130, 246, 0.1)',
      title: 'Welcome Cards',
      description: 'Custom canvas image banners, personal welcome messages, and automatic role assignment.'
    },
    {
      icon: UserCheck,
      color: '#0ea5e9',
      bg: 'rgba(14, 165, 233, 0.1)',
      title: 'Verification Portal',
      description: 'Button & captcha anti-raid protection to ensure genuine members join your server.'
    },
    {
      icon: Ticket,
      color: '#8b5cf6',
      bg: 'rgba(139, 92, 246, 0.1)',
      title: 'Ticket Management',
      description: 'Streamlined support tickets with private channel categories and transcript generation.'
    },
    {
      icon: MessageSquare,
      color: '#ec4899',
      bg: 'rgba(236, 72, 153, 0.1)',
      title: 'Roles & Nicknames',
      description: 'Self-assignable reaction roles, auto nicknames, and granular permission management.'
    },
    {
      icon: Send,
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.1)',
      title: 'Broadcast DMs',
      description: 'Send direct messages, announcements, or notifications securely to server members.'
    },
    {
      icon: Megaphone,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
      title: 'Announcements & Polls',
      description: 'Schedule rich embed announcements and interactive member polls across channels.'
    },
    {
      icon: ShieldAlert,
      color: '#dc2626',
      bg: 'rgba(220, 38, 38, 0.1)',
      title: 'AntiNuker Guard',
      description: 'Real-time defensive anti-nuke shielding against unauthorized admin actions or raids.'
    },
    {
      icon: Youtube,
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.1)',
      title: 'YouTube Alerts',
      description: 'Automated instant notifications whenever live streams start or new videos are uploaded.'
    },
    {
      icon: Volume2,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
      title: 'Temp Voice Hubs',
      description: 'Dynamic voice channels that are automatically created on-demand and removed when empty.'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      
      {/* Modern Developer Header Navbar */}
      <header style={{
        width: '100%',
        backgroundColor: '#070a12',
        borderBottom: '1px solid #1e293b',
        padding: '14px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              backgroundColor: '#5865f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700'
            }}>
              <Shield size={20} />
            </div>
            <div>
              <span style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#ffffff' }}>TIMOXITER</span>
              <span style={{
                marginLeft: '8px',
                padding: '2px 8px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                fontSize: '0.7rem',
                fontWeight: '600',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          {/* Navigation Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={onAdminLogin}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              <Lock size={15} />
              Admin Portal
            </button>
            
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              {loading ? 'Connecting...' : 'Connect Discord'}
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '48px 24px' }}>
        
        {/* Split Hero Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          marginBottom: '64px'
        }}>
          {/* Hero Left Column */}
          <div style={{ textAlign: 'left' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              backgroundColor: 'rgba(88, 101, 242, 0.1)',
              border: '1px solid rgba(88, 101, 242, 0.25)',
              color: '#818cf8',
              fontSize: '0.8rem',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              <Terminal size={14} />
              DISCORD BOT & MANAGEMENT CENTER
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
              fontWeight: '800',
              lineHeight: '1.15',
              marginBottom: '16px',
              color: '#ffffff'
            }}>
              Advanced Discord Server Control Center
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '28px',
              maxWidth: '580px'
            }}>
              Manage Moderation, Welcome Cards, Captcha Verification, Support Tickets, Custom Roles, Broadcast DMs, Announcements, YouTube alerts, and Temp Voice channels—all from one clean developer dashboard.
            </p>

            {error && (
              <div style={{
                padding: '12px 16px',
                border: '1px solid var(--danger)',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--danger)',
                borderRadius: '8px',
                fontSize: '0.875rem',
                marginBottom: '20px'
              }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button 
                onClick={handleLogin} 
                disabled={loading}
                className="btn-primary" 
                style={{ height: '44px', padding: '0 24px', fontSize: '0.95rem' }}
              >
                {loading ? 'Connecting...' : 'Connect Discord Account'}
                <ArrowRight size={16} />
              </button>

              <a 
                href="https://discord.gg/ZVfJvw93Ak" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary" 
                style={{ 
                  height: '44px', 
                  padding: '0 24px', 
                  fontSize: '0.95rem',
                  textDecoration: 'none'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C-3.66,42.5-9.84,76.19,10,95.91a105.73,105.73,0,0,0,32,16.29,80.59,80.59,0,0,0,6.83-11.16A68.61,68.61,0,0,1,38.31,95a55.15,55.15,0,0,0,3.75-2.93,74.9,74.9,0,0,0,67.65,0c1.25.93,2.5,1.92,3.75,2.93a68.46,68.46,0,0,1-10.57,6A81,81,0,0,0,109.73,112.2a105.73,105.73,0,0,0,32-16.29C138,76.19,131.79,42.5,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
                </svg>
                Join Community
              </a>
            </div>
          </div>

          {/* Hero Right Column: Developer CLI Terminal */}
          <div>
            <BotTerminal onAdminLogin={onAdminLogin} />
          </div>
        </div>

        {/* Feature Cards Section */}
        <div style={{ marginTop: '32px' }}>
          <div style={{ textAlign: 'left', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#ffffff', marginBottom: '6px' }}>Built for Discord Infrastructure</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Comprehensive tools designed for community management and security.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {features.map((feat, index) => {
              const IconComp = feat.icon;
              return (
                <div 
                  key={index}
                  className="pro-card" 
                  style={{ 
                    padding: '20px', 
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: feat.bg,
                      color: feat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px'
                    }}>
                      <IconComp size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '6px', color: '#ffffff' }}>
                      {feat.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #1e293b',
        backgroundColor: '#070a12',
        padding: '24px 24px',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            <strong style={{ color: '#ffffff' }}>TIMOXITER</strong> — Discord Bot Dashboard © 2026. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="https://discord.gg/ZVfJvw93Ak" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
              Discord Support
            </a>
            <span onClick={onAdminLogin} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>
              Admin Portal
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
