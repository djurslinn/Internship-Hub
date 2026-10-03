import { useStore } from '../store/useStore';
import { Target, TrendingUp, Calendar, CheckCircle2, Clock, FileEdit, AlertCircle } from 'lucide-react';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 20 },
  sub: { margin: '4px 0 0', fontSize: 14, color: '#64748b' },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', padding: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  listCard: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' },
  statBox: { padding: 24, borderRadius: 12, background: '#f8fafc', border: '1px solid #e5eaf0', display: 'flex', alignItems: 'center', gap: 20 },
  iconBox: (color: string, bg: string) => ({ width: 56, height: 56, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }),
  statVal: { margin: '0 0 4px', fontSize: 28, fontWeight: 800, color: '#0f172a', lineHeight: 1 },
  statLabel: { margin: 0, fontSize: 13, fontWeight: 600, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: 0.5 },
  barWrap: { width: '100%', height: 12, background: '#f0f4f8', borderRadius: 99, overflow: 'hidden' },
  bar: (pct: number) => ({ height: '100%', width: `${pct}%`, background: '#0dabab', borderRadius: 99, transition: 'width 1s ease' }),
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
      <style>{`
        .prog-stat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        .prog-task-table-header {
          padding: 12px 24px;
          background: #f8fafc;
          border-bottom: 1px solid #e5eaf0;
          display: flex;
          font-size: 12px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }
        .prog-task-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid #f0f4f8;
          gap: 12px;
        }
        .prog-task-name {
          flex: 2;
          padding-right: 24px;
          min-width: 0;
        }
        .prog-task-status {
          flex: 1;
          min-width: 0;
        }
        .prog-task-points {
          width: 100px;
          text-align: right;
          font-weight: 700;
          color: #0f172a;
          flex-shrink: 0;
        }
        .prog-h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 800;
          color: #0a2540;
          letter-spacing: -0.5px;
        }
        @media (max-width: 700px) {
          .prog-stat-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 24px;
          }
          .prog-h1 {
            font-size: 21px;
          }
        }
        @media (max-width: 540px) {
          .prog-task-table-header {
            display: none;
          }
          .prog-task-row {
            flex-direction: column;
            align-items: flex-start;
            padding: 14px 16px;
            gap: 8px;
          }
          .prog-task-name {
            flex: none;
            width: 100%;
            padding-right: 0;
          }
          .prog-task-status {
            flex: none;
            width: 100%;
          }
          .prog-task-points {
            width: auto;
            text-align: left;
            font-size: 13px;
            color: #64748b;
          }
          .prog-task-points::before {
            content: 'Points: ';
            font-weight: 400;
          }
        }
      `}</style>

      <div>
        <h1 className="prog-h1">My Progress</h1>
        <p style={S.sub}>Track your performance and task completion.</p>
      </div>

      <div style={S.card}>
        <div className="prog-stat-grid">
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
        <div className="prog-task-table-header">
          <div style={{ flex: 2 }}>Task Name</div>
          <div style={{ flex: 1 }}>Status</div>
          <div style={{ width: 100, textAlign: 'right' }}>Points</div>
        </div>
        
        {myTasks.map(task => {
          const submission = mySubs.find(s => s.taskId === task.id);
          const status = submission ? submission.status : 'pending';
          const cfg = getStatusConfig(status);

          return (
            <div key={task.id} className="prog-task-row">
              <div className="prog-task-name">
                <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{task.title}</p>
              </div>
              
              <div className="prog-task-status">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: cfg.bg, color: cfg.color, borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                  {cfg.icon}
                  {cfg.label}
                </div>
              </div>

              <div className="prog-task-points">
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
