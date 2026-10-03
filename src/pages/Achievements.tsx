import { useStore } from '../store/useStore';
import { Award, Lock, Trophy, Star, Zap, Target } from 'lucide-react';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 20 },
  h1: { margin: 0, fontSize: 26, fontWeight: 800, color: '#0a2540', letterSpacing: -0.5 },
  sub: { margin: '4px 0 0', fontSize: 14, color: '#64748b' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 },
  card: (unlocked: boolean) => ({
    background: unlocked ? '#fff' : '#f8fafc',
    borderRadius: 12,
    border: `1px solid ${unlocked ? '#e5eaf0' : '#f0f4f8'}`,
    padding: '24px',
    boxShadow: unlocked ? '0 4px 12px rgba(0,0,0,0.03)' : 'none',
    opacity: unlocked ? 1 : 0.6,
    position: 'relative' as const,
    display: 'flex', gap: 16
  }),
};

export default function Achievements() {
  const { achievements, role, submissions, interns } = useStore();
  const currentUser = useStore(state => state.currentUser) || interns[0];

  const getUnlockedForIntern = (internId: string) => {
    const intern = interns.find(i => i.id === internId);
    if (!intern) return [];
    const approvedSubs = submissions.filter(s => s.internId === internId && s.status === 'approved').length;
    const points = intern.points;
    
    let unlocked = [];
    // Rule mapping based on achievement titles for simplicity
    if (approvedSubs >= 1) unlocked.push(achievements.find(a => a.title === 'First Task')?.id);
    if (approvedSubs >= 5) unlocked.push(achievements.find(a => a.title === 'Task Master')?.id);
    if (points >= 500) unlocked.push(achievements.find(a => a.title === 'Top Contributor')?.id);
    
    return unlocked.filter(Boolean) as string[];
  };

  const myUnlockedIds = getUnlockedForIntern(currentUser.id);
  
  const getCoordinatorStats = (achId: string) => {
    let count = 0;
    interns.forEach(intern => {
      if (getUnlockedForIntern(intern.id).includes(achId)) count++;
    });
    return count;
  };

  const getIcon = (title: string, unlocked: boolean) => {
    const color = unlocked ? '#d97706' : '#94a3b8';
    switch (title) {
      case 'First Task': return <Star size={28} color={color} />;
      case 'Task Master': return <Target size={28} color={color} />;
      case 'Top Contributor': return <Trophy size={28} color={color} />;
      case 'Fast Learner': return <Zap size={28} color={color} />;
      default: return <Award size={28} color={color} />;
    }
  };

  return (
    <div style={S.page}>
      <div>
        <h1 style={S.h1}>Achievements</h1>
        <p style={S.sub}>Unlock badges by completing tasks and hitting milestones.</p>
      </div>

      <div style={S.grid}>
        {achievements.map(ach => {
          const isUnlocked = role === 'coordinator' ? true : myUnlockedIds.includes(ach.id);
          return (
            <div key={ach.id} style={S.card(isUnlocked)}>
              {!isUnlocked && (
                <div style={{ position: 'absolute', top: 12, right: 12, color: '#94a3b8' }}>
                  <Lock size={16} />
                </div>
              )}
              <div style={{ width: 56, height: 56, borderRadius: 16, background: isUnlocked ? '#fef3c7' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {getIcon(ach.title, isUnlocked)}
              </div>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: isUnlocked ? '#0f172a' : '#64748b' }}>{ach.title}</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{ach.description}</p>
                {role === 'intern' && isUnlocked && <p style={{ margin: '8px 0 0', fontSize: 11, fontWeight: 700, color: '#22c55e' }}>UNLOCKED</p>}
                {role === 'coordinator' && <p style={{ margin: '8px 0 0', fontSize: 11, fontWeight: 700, color: '#3b82f6' }}>Unlocked by {getCoordinatorStats(ach.id)} interns</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
