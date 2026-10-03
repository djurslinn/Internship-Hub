import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { LayoutDashboard, Users, Target, CheckSquare, BarChart, MessageSquare, Megaphone, Trophy, Award, PieChart } from 'lucide-react';
import { useStore } from '../store/useStore';
import CoordinatorTasks from './CoordinatorTasks';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 24 },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  cardLabel: { margin: 0, fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: 0.8 },
  cardValue: { margin: '8px 0 0', fontSize: 32, fontWeight: 800, color: '#0a2540' },
  sectionTitle: { margin: '0 0 16px', fontSize: 17, fontWeight: 700, color: '#0a2540' },
  badge: (color: string) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, background: color + '18', color }),
};

const CoordinatorOverview = () => {
  const interns = useStore(state => state.interns);
  const tasks = useStore(state => state.tasks);
  const submissions = useStore(state => state.submissions);

  const pending = submissions.filter(s => s.status === 'submitted').length;
  const approved = submissions.filter(s => s.status === 'approved').length;
  const avgProgress = Math.round((approved / (tasks.length * interns.length)) * 100);

  return (
    <div style={S.page}>
      <style>{`
        .co-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .co-intern-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid #f0f4f8;
          margin-bottom: 8px;
          background: #fafcff;
          gap: 12px;
        }
        .co-intern-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          flex: 1;
        }
        .co-intern-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .co-sub-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid #f0f4f8;
          margin-bottom: 8px;
          background: #fafcff;
          gap: 12px;
          flex-wrap: wrap;
        }
        .co-h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 800;
          color: #0a2540;
          letter-spacing: -0.5px;
        }
        @media (max-width: 800px) {
          .co-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 540px) {
          .co-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .co-h1 {
            font-size: 20px;
          }
          .co-intern-row {
            flex-wrap: wrap;
          }
          .co-intern-right {
            width: 100%;
            justify-content: flex-start;
          }
        }
        @media (max-width: 380px) {
          .co-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div>
        <h1 className="co-h1">Coordinator Dashboard</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#64748b' }}>
          Frontend Engineering Program · Manage and monitor all interns.
        </p>
      </div>

      <div className="co-grid">
        <div style={S.card}><p style={S.cardLabel}>Total Interns</p><p style={S.cardValue}>{interns.length}</p></div>
        <div style={S.card}><p style={S.cardLabel}>Total Tasks</p><p style={S.cardValue}>{tasks.length}</p></div>
        <div style={S.card}><p style={S.cardLabel}>Pending Reviews</p><p style={{ ...S.cardValue, color: '#f59e0b' }}>{pending}</p></div>
        <div style={S.card}><p style={S.cardLabel}>Avg. Progress</p><p style={{ ...S.cardValue, color: '#22c55e' }}>{avgProgress}%</p></div>
      </div>

      {/* Intern List */}
      <div style={S.card}>
        <h2 style={S.sectionTitle}>Intern Overview</h2>
        {interns.map((intern) => {
          const internSubs = submissions.filter(s => s.internId === intern.id && s.status === 'approved').length;
          const pct = Math.round((internSubs / tasks.length) * 100);
          return (
            <div key={intern.id} className="co-intern-row">
              <div className="co-intern-left">
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0a2540', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {intern.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{intern.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{intern.internship}</p>
                </div>
              </div>
              <div className="co-intern-right">
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#22c55e' }}>{pct}%</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>Progress</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>{intern.points}pts</p>
                  <p style={{ margin: 0, fontSize: 11, color: '#94a3b8' }}>Points</p>
                </div>
                <span style={S.badge('#22c55e')}>Active</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pending Submissions */}
      <div style={S.card}>
        <h2 style={S.sectionTitle}>Pending Reviews</h2>
        {submissions.filter(s => s.status === 'submitted').length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>No pending submissions.</p>
        ) : (
          submissions.filter(s => s.status === 'submitted').map(sub => {
            const intern = interns.find(i => i.id === sub.internId);
            const task = useStore.getState().tasks.find(t => t.id === sub.taskId);
            return (
              <div key={sub.id} className="co-sub-row">
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{task?.title}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>by {intern?.name} · {new Date(sub.submittedAt).toLocaleDateString()}</p>
                </div>
                <span style={S.badge('#3b82f6')}>Needs Review</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

import Leaderboard from './Leaderboard';
import Achievements from './Achievements';
import Announcements from './Announcements';
import Discussions from './Discussions';
import Polls from './Polls';
import Interns from './Interns';
import Submissions from './Submissions';
import Internships from './Internships';
import Analytics from './Analytics';

export default function CoordinatorDashboard() {
  const navItems = [
    { label: 'Overview', href: '/coordinator', icon: <LayoutDashboard size={16} /> },
    { label: 'Programs', href: '/coordinator/internships', icon: <Target size={16} /> },
    { label: 'Interns', href: '/coordinator/interns', icon: <Users size={16} /> },
    { label: 'Tasks', href: '/coordinator/tasks', icon: <Target size={16} /> },
    { label: 'Submissions', href: '/coordinator/submissions', icon: <CheckSquare size={16} /> },
    { label: 'Polls', href: '/coordinator/polls', icon: <BarChart size={16} /> },
    { label: 'Discussions', href: '/coordinator/discussions', icon: <MessageSquare size={16} /> },
    { label: 'Announcements', href: '/coordinator/announcements', icon: <Megaphone size={16} /> },
    { label: 'Leaderboard', href: '/coordinator/leaderboard', icon: <Trophy size={16} /> },
    { label: 'Achievements', href: '/coordinator/achievements', icon: <Award size={16} /> },
    { label: 'Analytics', href: '/coordinator/analytics', icon: <PieChart size={16} /> },
  ];

  return (
    <DashboardLayout navItems={navItems} basePath="/coordinator">
      <Routes>
        <Route path="/" element={<CoordinatorOverview />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/interns" element={<Interns />} />
        <Route path="/tasks" element={<CoordinatorTasks />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Navigate to="/coordinator" />} />
      </Routes>
    </DashboardLayout>
  );
}
