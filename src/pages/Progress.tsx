import { useStore } from '../store/useStore';
import { Target, TrendingUp, Calendar, CheckCircle2, Clock, FileEdit, AlertCircle } from 'lucide-react';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 20 },
  h1: { margin: 0, fontSize: 26, fontWeight: 800, color: '#0a2540', letterSpacing: -0.5 },
  sub: { margin: '4px 0 0', fontSize: 14, color: '#64748b' },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', padding: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  listCard: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 40 },
  statBox: { padding: 24, borderRadius: 12, background: '#f8fafc', border: '1px solid #e5eaf0', display: 'flex', alignItems: 'center', gap: 20 },
  iconBox: (color: string, bg: string) => ({ width: 56, height: 56, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }),
  statVal: { margin: '0 0 4px', fontSize: 28, fontWeight: 800, color: '#0f172a', lineHeight: 1 },
  statLabel: { margin: 0, fontSize: 13, fontWeight: 600, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 0.5 },
  barWrap: { width: '100%', height: 12, background: '#f0f4f8', borderRadius: 99, overflow: 'hidden' },
  bar: (pct: number) => ({ height: '100%', width: `${pct}%`, background: '#0dabab', borderRadius: 99, transition: 'width 1s ease' }),
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #f0f4f8' },
};

export default function Progress() {
  const storeUser = useStore(state => state.currentUser);
  const interns = useStore(state => state.interns);
  const tasks = useStore(state => state.tasks);
  const submissions = useStore(state => state.submissions);

  const currentUser = storeUser || interns[0];

  if (!currentUser) return (
    <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>No intern data available.</div>
  );

  const myTasks = tasks.filter(t => !t.internshipId || t.internshipId === currentUser.internshipId);
  const mySubs = submissions.filter(s => s.internId === currentUser.id);
  const approved = mySubs.filter(s => s.status === 'approved').length;
  const totalTasks = myTasks.length;
  const progressPct = Math.round((approved / Math.max(totalTasks, 1)) * 100);

  const totalPossiblePoints = myTasks.reduce((sum, t) => sum + t.points, 0);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved': return { color: '#10b981', bg: '#ecfdf5', icon: <CheckCircle2 size={16} />, label: 'Approved' };
      case 'submitted': return { color: '#3b82f6', bg: '#eff6ff', icon: <Clock size={16} />, label: 'Under Review' };
      case 'revision': return { color: '#f59e0b', bg: '#fffbeb', icon: <AlertCircle size={16} />, label: 'Needs Revision' };
      default: return { color: '#64748b', bg: '#f1f5f9', icon: <FileEdit size={16} />, label: 'Pending' };
    }
  };

  return (
    <div style={S.page}>
      <div>
        <h1 style={S.h1}>My Progress</h1>
        <p style={S.sub}>Track your performance and task completion.</p>
      </div>

      <div style={S.card}>
        <div style={S.statGrid}>
          <div style={S.statBox}>
            <div style={S.iconBox('#0dabab', 'rgba(13,171,171,0.1)')}><Target size={24} /></div>
            <div>
              <p style={S.statVal}>{approved} / {totalTasks}</p>
              <p style={S.statLabel}>Tasks Completed</p>
            </div>
          </div>
          <div style={S.statBox}>
            <div style={S.iconBox('#f59e0b', '#fef3c7')}><TrendingUp size={24} /></div>
            <div>
              <p style={S.statVal}>{currentUser.points} / {totalPossiblePoints}</p>
              <p style={S.statLabel}>Total Points</p>
            </div>
          </div>
          <div style={S.statBox}>
            <div style={S.iconBox('#3b82f6', '#dbeafe')}><Calendar size={24} /></div>
            <div>
              <p style={S.statVal}>{progressPct}%</p>
              <p style={S.statLabel}>Completion</p>
            </div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Overall Completion</h3>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#0dabab' }}>{progressPct}%</span>
          </div>
          <div style={S.barWrap}>
            <div style={S.bar(progressPct)} />
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0a2540', margin: '12px 0 0' }}>Task Breakdown</h2>
      
      <div style={S.listCard}>
        <div style={{ padding: '12px 24px', background: '#f8fafc', borderBottom: '1px solid #e5eaf0', display: 'flex', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.8 }}>
          <div style={{ flex: 2 }}>Task Name</div>
          <div style={{ flex: 1 }}>Status</div>
          <div style={{ width: 100, textAlign: 'right' }}>Points</div>
        </div>
        
        {myTasks.map(task => {
          const submission = mySubs.find(s => s.taskId === task.id);
          const status = submission ? submission.status : 'pending';
          const cfg = getStatusConfig(status);

          return (
            <div key={task.id} style={S.row}>
              <div style={{ flex: 2, paddingRight: 24 }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{task.title}</p>
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: cfg.bg, color: cfg.color, borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                  {cfg.icon}
                  {cfg.label}
                </div>
              </div>

              <div style={{ width: 100, textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>
                {task.points} pts
              </div>
            </div>
          );
        })}
        {myTasks.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>
            No tasks assigned yet.
          </div>
        )}
      </div>
    </div>
  );
}
