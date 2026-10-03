import { useStore } from '../store/useStore';
import { User, Mail, Briefcase, Calendar, Star } from 'lucide-react';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 20 },
  h1: { margin: 0, fontSize: 26, fontWeight: 800, color: '#0a2540', letterSpacing: -0.5 },
  sub: { margin: '4px 0 0', fontSize: 14, color: '#64748b' },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  cover: { height: 120, background: 'linear-gradient(135deg, #0a2540 0%, #0dabab 100%)' },
  profileSection: { padding: '0 32px 32px', marginTop: -40, display: 'flex', gap: 24, alignItems: 'flex-end' },
  avatarWrap: { width: 100, height: 100, borderRadius: '50%', background: '#fff', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  avatarInner: { width: '100%', height: '100%', borderRadius: '50%', background: '#0a2540', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800 },
  infoSection: { padding: '0 32px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 },
  label: { margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' as const },
  value: { margin: 0, fontSize: 15, color: '#0f172a', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 },
  pill: { background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 600, display: 'inline-block', marginRight: 8, marginBottom: 8 }
};

export default function Profile() {
  const { currentUser: storeUser, interns, submissions, tasks } = useStore();
  const currentUser = storeUser || interns[0];

  if (!currentUser) return null;

  const mySubs = submissions.filter(s => s.internId === currentUser.id);

  // Calculate Rank
  const sortedInterns = [...interns].sort((a, b) => b.points - a.points);
  const rank = sortedInterns.findIndex(i => i.id === currentUser.id) + 1;

  return (
    <div style={S.page}>
      <div>
        <h1 style={S.h1}>My Profile</h1>
        <p style={S.sub}>View your personal information and track your progress.</p>
      </div>

      <div style={S.card}>
        <div style={S.cover} />
        
        <div style={S.profileSection}>
          <div style={S.avatarWrap}>
            <div style={S.avatarInner}>{currentUser.name.split(' ').map(n => n[0]).join('')}</div>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <h2 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 800, color: '#0f172a' }}>{currentUser.name}</h2>
            <p style={{ margin: 0, fontSize: 15, color: '#64748b' }}>{currentUser.internship} Intern</p>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingBottom: 8 }}>
            <div style={{ background: '#fef3c7', color: '#d97706', padding: '8px 16px', borderRadius: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Star size={18} /> {currentUser.points} Points · Rank #{rank}
            </div>
          </div>
        </div>

        <div style={S.infoSection}>
          <div>
            <p style={S.label}>Full Name</p>
            <p style={S.value}><User size={16} color="#94a3b8" /> {currentUser.name}</p>
          </div>
          <div>
            <p style={S.label}>Email Address</p>
            <p style={S.value}><Mail size={16} color="#94a3b8" /> {currentUser.name.toLowerCase().replace(' ', '.')}@internhub.demo</p>
          </div>
          <div>
            <p style={S.label}>Program</p>
            <p style={S.value}><Briefcase size={16} color="#94a3b8" /> {currentUser.internship}</p>
          </div>
          <div>
            <p style={S.label}>Joined Date</p>
            <p style={S.value}><Calendar size={16} color="#94a3b8" /> June 1, 2026</p>
          </div>
        </div>

        <div style={{ padding: '0 32px 32px' }}>
          <p style={S.label}>Skills</p>
          <div>
            {currentUser.skills.map(skill => (
              <span key={skill} style={S.pill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 12, marginBottom: 0 }}>Recent Submissions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mySubs.slice(0, 3).map(sub => {
          const task = tasks.find(t => t.id === sub.taskId);
          return (
            <div key={sub.id} style={{ ...S.card, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: 15 }}>{task?.title || 'Unknown Task'}</h4>
                <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>Submitted {new Date(sub.submittedAt).toLocaleDateString()}</p>
              </div>
              <span style={{ 
                padding: '4px 12px', borderRadius: 16, fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                background: sub.status === 'approved' ? '#dcfce7' : sub.status === 'revision' ? '#fee2e2' : '#fef3c7',
                color: sub.status === 'approved' ? '#166534' : sub.status === 'revision' ? '#991b1b' : '#92400e'
              }}>
                {sub.status}
              </span>
            </div>
          )
        })}
        {mySubs.length === 0 && <p style={{ color: '#64748b' }}>No submissions yet.</p>}
      </div>
    </div>
  );
}
