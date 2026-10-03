import React from 'react';
import { useStore } from '../store/useStore';
import { Award, Download, Lock } from 'lucide-react';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 20 },
  h1: { margin: 0, fontSize: 26, fontWeight: 800, color: '#0a2540', letterSpacing: -0.5 },
  sub: { margin: '4px 0 0', fontSize: 14, color: '#64748b' },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', padding: 48, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center' as const },
  certPreview: { width: '100%', maxWidth: 600, aspectRatio: '1.414 / 1', background: '#f8fafc', border: '12px solid #0f172a', borderRadius: 8, position: 'relative' as const, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: 40, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' },
  overlay: { position: 'absolute' as const, inset: 0, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  btn: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, border: 'none', background: '#0a2540', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginTop: 32 },
};

export default function Certificate() {
  const { currentUser: storeUser, interns, tasks, submissions } = useStore();
  const currentUser = storeUser || interns[0];

  const [completionDate] = React.useState(() => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));

  if (!currentUser) return null;

  const mySubs = submissions.filter(s => s.internId === currentUser.id);
  const approved = mySubs.filter(s => s.status === 'approved').length;
  const isEligible = approved === tasks.length && tasks.length > 0;
  return (
    <div style={S.page}>
      <div>
        <h1 style={S.h1}>Certificate of Completion</h1>
        <p style={S.sub}>Earn your verified certificate by completing all assigned tasks.</p>
      </div>

      <div style={S.card}>
        <div style={S.certPreview}>
          {!isEligible && (
            <div style={S.overlay}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Lock size={28} color="#94a3b8" />
              </div>
              <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: '#0f172a' }}>Certificate Locked</h2>
              <p style={{ margin: 0, fontSize: 15, color: '#64748b', maxWidth: 300 }}>Complete all {tasks.length} tasks to unlock your verified internship certificate.</p>
              <div style={{ marginTop: 24, padding: '8px 16px', background: '#f8fafc', borderRadius: 100, fontSize: 13, fontWeight: 700, color: '#0dabab', border: '1px solid #e5eaf0' }}>
                {approved} / {tasks.length} Tasks Completed
              </div>
            </div>
          )}

          {/* Certificate Content */}
          <Award size={48} color="#f59e0b" style={{ marginBottom: 24 }} />
          <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2 }}>Certificate of Completion</h3>
          <p style={{ margin: '0 0 24px', fontSize: 14, color: '#94a3b8' }}>This is to certify that</p>
          <h2 style={{ margin: '0 0 24px', fontSize: 42, fontWeight: 900, color: '#0f172a', fontFamily: 'serif' }}>{currentUser.name}</h2>
          <p style={{ margin: 0, fontSize: 16, color: '#4a6363', maxWidth: 400, lineHeight: 1.6 }}>has successfully completed the {currentUser.internship} program at InternHub on {completionDate}.</p>
        </div>

        <button style={{ ...S.btn, opacity: isEligible ? 1 : 0.5, cursor: isEligible ? 'pointer' : 'not-allowed' }} disabled={!isEligible}>
          <Download size={18} /> Download Certificate (PDF)
        </button>
      </div>
    </div>
  );
}
