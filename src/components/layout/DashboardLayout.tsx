import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, ArrowLeftRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { useState, useEffect } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
  basePath: string;
}

const NAV_BG = '#0a2540';
const NAV_ACTIVE = '#1e4d8c';
const NAV_TEXT = 'rgba(255,255,255,0.72)';
const NAV_TEXT_ACTIVE = '#ffffff';
const SIDEBAR_W = 248;
const MOBILE_BREAKPOINT = 768;

export default function DashboardLayout({ children, navItems, basePath }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetDemoData, setRole, interns } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

  const isCoordinator = basePath === '/coordinator';

  // Track viewport width
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleExitDemo = () => {
    resetDemoData();
  };

  // Switch between coordinator ↔ intern without resetting data
  const handleSwitchRole = () => {
    if (isCoordinator) {
      setRole('intern');
      navigate('/intern');
    } else {
      setRole('coordinator');
      navigate('/coordinator');
    }
  };

  const currentInternName = interns[0]?.name || 'Alex Johnson';
  const currentInternInitials = currentInternName.split(' ').map((n: string) => n[0]).join('').substring(0, 2);

  const renderNavLinks = (onClose?: () => void) => (
    <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.href ||
          (item.href !== '/intern' && item.href !== '/coordinator' && location.pathname.startsWith(item.href));
        return (
          <button
            key={item.href}
            onClick={() => { navigate(item.href); onClose?.(); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '9px 12px', marginBottom: 2, borderRadius: 8, border: 'none',
              background: isActive ? NAV_ACTIVE : 'transparent',
              color: isActive ? NAV_TEXT_ACTIVE : NAV_TEXT,
              fontWeight: isActive ? 600 : 500, fontSize: 13.5,
              cursor: 'pointer', textAlign: 'left',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
            onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <span style={{ opacity: isActive ? 1 : 0.65, display: 'flex', alignItems: 'center' }}>{item.icon}</span>
            {item.label}
          </button>
        );
      })}
    </nav>
  );

  const renderSidebarContent = (onClose?: () => void) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: NAV_BG }}>

      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: '#1e4d8c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 15, color: '#fff', letterSpacing: '-0.3px' }}>InternHub</span>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 4 }}>
            <X size={20} />
          </button>
        )}
      </div>

      {/* Role Toggle */}
      <div style={{ padding: '14px 12px 4px' }}>
        <p style={{ margin: '0 0 8px 2px', fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
          Current View
        </p>
        <div style={{
          display: 'flex', background: 'rgba(255,255,255,0.07)', borderRadius: 10,
          padding: 3, gap: 3,
        }}>
          <button
            onClick={() => { if (!isCoordinator) { handleSwitchRole(); onClose?.(); } }}
            style={{
              flex: 1, padding: '7px 4px', borderRadius: 7, border: 'none', cursor: isCoordinator ? 'default' : 'pointer',
              background: isCoordinator ? '#1e4d8c' : 'transparent',
              color: isCoordinator ? '#fff' : 'rgba(255,255,255,0.45)',
              fontSize: 12, fontWeight: 700, transition: 'all 0.18s',
            }}
          >
            Coordinator
          </button>
          <button
            onClick={() => { if (isCoordinator) { handleSwitchRole(); onClose?.(); } }}
            style={{
              flex: 1, padding: '7px 4px', borderRadius: 7, border: 'none', cursor: !isCoordinator ? 'default' : 'pointer',
              background: !isCoordinator ? '#0dabab' : 'transparent',
              color: !isCoordinator ? '#fff' : 'rgba(255,255,255,0.45)',
              fontSize: 12, fontWeight: 700, transition: 'all 0.18s',
            }}
          >
            Intern
          </button>
        </div>
        <p style={{ margin: '6px 2px 0', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
          Switch to see both perspectives
        </p>
      </div>

      {renderNavLinks(onClose)}

      {/* Bottom section */}
      <div style={{ padding: '8px 12px 12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Switch View shortcut */}
        <button
          onClick={() => { handleSwitchRole(); onClose?.(); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, width: '100%',
            padding: '9px 12px', borderRadius: 8, border: 'none',
            background: 'rgba(13,171,171,0.12)', color: '#0dabab',
            fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
          }}
        >
          <ArrowLeftRight size={14} />
          Switch to {isCoordinator ? 'Intern' : 'Coordinator'} View
        </button>

        {/* Exit Demo */}
        <button
          onClick={handleExitDemo}
          style={{
            display: 'flex', alignItems: 'center', gap: 8, width: '100%',
            padding: '9px 12px', borderRadius: 8, border: 'none',
            background: 'transparent', color: 'rgba(255,255,255,0.4)',
            fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.12)'; (e.currentTarget as HTMLElement).style.color = '#fca5a5'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
        >
          <LogOut size={14} />
          Exit Demo &amp; Reset Data
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .dash-layout {
          min-height: 100vh;
          background: #f1f5f9;
          display: flex;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
        }

        .dash-sidebar {
          width: ${SIDEBAR_W}px;
          flex-shrink: 0;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          z-index: 20;
        }

        .dash-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .dash-header {
          height: 56px;
          background: #fff;
          border-bottom: 1px solid #e5eaf0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 30;
          gap: 12px;
        }

        .dash-header-centre {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          justify-content: center;
          overflow: hidden;
        }

        .dash-demo-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 100px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .dash-switch-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 100px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .dash-user-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .dash-user-names {
          text-align: right;
        }

        .dash-content {
          flex: 1;
          padding: 28px 32px;
          overflow-y: auto;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .dash-content {
            padding: 24px 24px;
          }
        }

        /* Mobile: hide desktop sidebar, show hamburger */
        @media (max-width: 767px) {
          .dash-sidebar {
            display: none;
          }

          .dash-header {
            padding: 0 16px;
            gap: 8px;
          }

          .dash-demo-badge {
            font-size: 10px;
            padding: 3px 8px;
          }

          .dash-switch-btn {
            font-size: 11px;
            padding: 4px 8px;
          }

          .dash-user-names {
            display: none;
          }

          .dash-content {
            padding: 16px;
          }
        }

        /* Very small phones */
        @media (max-width: 480px) {
          .dash-header-centre {
            gap: 6px;
          }

          .dash-demo-badge {
            letter-spacing: 0;
          }
        }
      `}</style>

      <div className="dash-layout">

        {/* Desktop Sidebar — hidden on mobile via CSS */}
        <aside className="dash-sidebar">
          {renderSidebarContent()}
        </aside>

        {/* Mobile Overlay — only rendered when open */}
        {mobileMenuOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }}>
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setMobileMenuOpen(false)} />
            <div style={{ position: 'relative', width: SIDEBAR_W, height: '100%', flexShrink: 0 }}>
              {renderSidebarContent(() => setMobileMenuOpen(false))}
            </div>
          </div>
        )}

        {/* Main area */}
        <main className="dash-main">
          {/* Top bar */}
          <header className="dash-header">
            {/* Hamburger — always visible, opens mobile overlay */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 6, borderRadius: 6, flexShrink: 0 }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            {/* Centre: Demo badge + quick switch */}
            <div className="dash-header-centre">
              <span
                className="dash-demo-badge"
                style={{
                  background: isCoordinator ? '#e0f2fe' : '#d1fae5',
                  color: isCoordinator ? '#0369a1' : '#065f46',
                }}
              >
                {isMobile ? (isCoordinator ? 'Coordinator' : 'Intern') : `Demo · ${isCoordinator ? 'Coordinator View' : 'Intern View'}`}
              </span>

              <button
                className="dash-switch-btn"
                onClick={handleSwitchRole}
                title={`Switch to ${isCoordinator ? 'Intern' : 'Coordinator'} view`}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0a2540'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#0a2540'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f8fafc'; (e.currentTarget as HTMLElement).style.color = '#475569'; (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; }}
              >
                <ArrowLeftRight size={13} />
                {isMobile ? 'Switch' : `Switch to ${isCoordinator ? 'Intern' : 'Coordinator'}`}
              </button>
            </div>

            {/* User pill */}
            <div className="dash-user-pill">
              <div className="dash-user-names">
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                  {isCoordinator ? 'Sarah Connor' : currentInternName}
                </p>
                <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>
                  {isCoordinator ? 'Coordinator' : 'Intern'}
                </p>
              </div>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: isCoordinator ? NAV_BG : '#0dabab',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, border: '2px solid #fff', boxShadow: '0 0 0 2px #e5eaf0',
                flexShrink: 0,
              }}>
                {isCoordinator ? 'SC' : currentInternInitials}
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="dash-content">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
