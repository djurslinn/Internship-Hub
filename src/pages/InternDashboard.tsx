import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { LayoutDashboard, Target, Activity, Trophy, BarChart, MessageSquare, Megaphone, Award, User, FileBadge } from 'lucide-react';
import { useStore } from '../store/useStore';
import InternTasks from './InternTasks';
import Progress from './Progress';
import Leaderboard from './Leaderboard';
import Polls from './Polls';
import Discussions from './Discussions';
import Announcements from './Announcements';
import Achievements from './Achievements';
import Certificate from './Certificate';
import Profile from './Profile';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 24 },
  greeting: { marginBottom: 4 },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  cardLabel: { margin: 0, fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: 0.8 },
  cardValue: { margin: '8px 0 0', fontSize: 32, fontWeight: 800, color: '#0a2540' },
  cardSub: { margin: '4px 0 0', fontSize: 12, color: '#94a3b8' },
  sectionTitle: { margin: '0 0 16px', fontSize: 17, fontWeight: 700, color: '#0a2540' },
  taskTitle: { margin: 0, fontSize: 14, fontWeight: 600, color: '#0f172a' },
  taskMeta: { margin: '2px 0 0', fontSize: 12, color: '#94a3b8' },
  badge: (color: string) => ({ display: 'inline-block', padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, background: color + '15', color }),
};

const InternOverview = () => {
  const tasks = useStore(state => state.tasks);
  const interns = useStore(state => state.interns);
  const submissions = useStore(state => state.submissions);
  const currentUser = useStore(state => state.currentUser) || interns[0];

  const approvedSubs = submissions.filter(s => s.internId === currentUser.id && s.status === 'approved').length;

  const relevantTasks = tasks.filter(t => !t.internshipId || t.internshipId === currentUser.internshipId);
  const progress = relevantTasks.length > 0 ? Math.round((approvedSubs / relevantTasks.length) * 100) : 0;

  // Leaderboard Rank
  const sortedInterns = [...interns].sort((a, b) => b.points - a.points);
  const rank = sortedInterns.findIndex(i => i.id === currentUser.id) + 1;

  // Weekly points
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const weeklyApprovedSubs = submissions.filter(s =>
    s.internId === currentUser.id &&
    s.status === 'approved' &&
    new Date(s.submittedAt) >= oneWeekAgo
  );

  const weeklyPoints = weeklyApprovedSubs.reduce((total, sub) => {
    const task = tasks.find(t => t.id === sub.taskId);
    return total + (task ? task.points : 0);
  }, 0);

  return (
    <div style={S.page}>
      <style>{`
        .io-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .io-task-row {
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
        .io-task-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .io-h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 800;
          color: #0a2540;
          letter-spacing: -0.5px;
        }
        @media (max-width: 700px) {
          .io-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .io-h1 {
            font-size: 21px;
          }
        }
        @media (max-width: 480px) {
          .io-grid {
            grid-template-columns: 1fr;
          }
          .io-task-row {
            flex-wrap: wrap;
            gap: 8px;
          }
          .io-h1 {
            font-size: 19px;
          }
        }
      `}</style>

      <div style={S.greeting}>
        <h1 className="io-h1">Welcome back, {currentUser.name}!</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#64748b' }}>
          Frontend Engineering Internship · Here's your progress today.
        </p>
      </div>

      <div className="io-grid">
        {/* Progress */}
        <div style={S.card}>
          <p style={S.cardLabel}>Progress</p>
          <p style={{ ...S.cardValue, color: '#22c55e' }}>{progress}%</p>
          <div style={{ marginTop: 12, height: 6, background: '#f0f4f8', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#22c55e', borderRadius: 99 }} />
          </div>
        </div>
        {/* Points */}
        <div style={S.card}>
          <p style={S.cardLabel}>Points Earned</p>
          <p style={{ ...S.cardValue, color: '#f59e0b' }}>{currentUser.points}</p>
          <p style={S.cardSub}>+{weeklyPoints} this week</p>
        </div>
        {/* Rank */}
        <div style={S.card}>
          <p style={S.cardLabel}>Leaderboard Rank</p>
          <p style={{ ...S.cardValue, color: '#6366f1' }}>#{rank}</p>
          <p style={S.cardSub}>of {interns.length} interns</p>
        </div>
      </div>

      {/* Tasks */}
      <div style={S.card}>
        <h2 style={S.sectionTitle}>Active Tasks</h2>
        {relevantTasks.map(task => {
          const sub = submissions.find(s => s.taskId === task.id && s.internId === currentUser.id);
          const status = sub?.status ?? 'pending';
          const color = status === 'approved' ? '#22c55e' : status === 'submitted' ? '#3b82f6' : status === 'revision' ? '#ef4444' : '#f59e0b';
          const label = status === 'approved' ? 'Approved' : status === 'submitted' ? 'Submitted' : status === 'revision' ? 'Revision' : 'Pending';
          return (
            <div key={task.id} className="io-task-row">
              <div style={{ minWidth: 0 }}>
                <p style={S.taskTitle}>{task.title}</p>
                <p style={S.taskMeta}>Due {new Date(task.dueDate).toLocaleDateString()} · {task.priority} priority</p>
              </div>
              <div className="io-task-right">
                <span style={S.badge(color)}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', whiteSpace: 'nowrap' }}>{task.points}pts</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};



export default function InternDashboard() {
  const navItems = [
    { label: 'Overview', href: '/intern', icon: <LayoutDashboard size={16} /> },
    { label: 'Tasks', href: '/intern/tasks', icon: <Target size={16} /> },
    { label: 'Progress', href: '/intern/progress', icon: <Activity size={16} /> },
    { label: 'Leaderboard', href: '/intern/leaderboard', icon: <Trophy size={16} /> },
    { label: 'Polls', href: '/intern/polls', icon: <BarChart size={16} /> },
    { label: 'Discussions', href: '/intern/discussions', icon: <MessageSquare size={16} /> },
    { label: 'Announcements', href: '/intern/announcements', icon: <Megaphone size={16} /> },
    { label: 'Achievements', href: '/intern/achievements', icon: <Award size={16} /> },
    { label: 'Certificate', href: '/intern/certificate', icon: <FileBadge size={16} /> },
    { label: 'Profile', href: '/intern/profile', icon: <User size={16} /> },
  ];

  return (
    <DashboardLayout navItems={navItems} basePath="/intern">
      <Routes>
        <Route path="/" element={<InternOverview />} />
        <Route path="/tasks" element={<InternTasks />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/intern" />} />
      </Routes>
    </DashboardLayout>
  );
}
