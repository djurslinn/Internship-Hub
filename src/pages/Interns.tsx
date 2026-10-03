import { useStore } from '../store/useStore';
import { Mail, Briefcase, ExternalLink } from 'lucide-react';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 20 },
  h1: { margin: 0, fontSize: 26, fontWeight: 800, color: '#0a2540', letterSpacing: -0.5 },
  sub: { margin: '4px 0 0', fontSize: 14, color: '#64748b' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  avatar: { width: 56, height: 56, borderRadius: '50%', background: '#0a2540', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700 },
  name: { margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: '#0f172a' },
  role: { margin: 0, fontSize: 14, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 },
  statBlock: { padding: '12px', background: '#f8fafc', borderRadius: 8, textAlign: 'center' as const },
  statLabel: { margin: 0, fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' as const },
  statValue: { margin: '4px 0 0', fontSize: 18, fontWeight: 800, color: '#0a2540' },
  actionBtn: { width: '100%', padding: '10px', marginTop: 16, borderRadius: 8, border: '1px solid #e5eaf0', background: '#fff', color: '#0f172a', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  pill: { background: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: 16, fontSize: 11, fontWeight: 600, display: 'inline-block', marginRight: 4, marginBottom: 4 }
};

export default function Interns() {
  const { interns, tasks, submissions, role } = useStore();

  return (
    <div style={S.page}>
      <div>
        <h1 style={S.h1}>Intern Directory</h1>
        <p style={S.sub}>Manage and review profiles of all active interns in the cohort.</p>
      </div>

      <div style={S.grid}>
        {interns.map(intern => {
          const internSubs = submissions.filter(s => s.internId === intern.id);
          const approved = internSubs.filter(s => s.status === 'approved').length;
          const pending = internSubs.filter(s => s.status === 'submitted').length;
          const progress = Math.round((approved / Math.max(tasks.length, 1)) * 100);

          return (
            <div key={intern.id} style={S.card}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div style={S.avatar}>{intern.name.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <h3 style={S.name}>{intern.name}</h3>
                  <p style={S.role}><Briefcase size={14} /> {intern.internship}</p>
                  <p style={{ ...S.role, marginTop: 4, color: '#0dabab' }}><Mail size={14} /> {intern.name.toLowerCase().replace(' ', '.')}@internhub.demo</p>
                </div>
              </div>
              
              <div style={{ marginBottom: 16 }}>
                {intern.skills.map(skill => (
                  <span key={skill} style={S.pill}>{skill}</span>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                <div style={S.statBlock}>
                  <p style={S.statLabel}>Progress</p>
                  <p style={{ ...S.statValue, color: '#22c55e' }}>{progress}%</p>
                </div>
                <div style={S.statBlock}>
                  <p style={S.statLabel}>Points</p>
                  <p style={{ ...S.statValue, color: '#f59e0b' }}>{intern.points}</p>
                </div>
                <div style={S.statBlock}>
                  <p style={S.statLabel}>Pending</p>
                  <p style={S.statValue}>{pending}</p>
                </div>
              </div>

              {role === 'coordinator' && (
                <button style={S.actionBtn}>
                  View Full Profile <ExternalLink size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
