import { useState } from 'react';
import { useStore } from '../store/useStore';
import {
  CheckCircle, XCircle, AlertCircle, FileText, Star,
  Briefcase, MessageSquare, X, Edit2, Clock
} from 'lucide-react';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 20 },
  h1: { margin: 0, fontSize: 26, fontWeight: 800, color: '#0a2540', letterSpacing: -0.5 },
  sub: { margin: '4px 0 0', fontSize: 14, color: '#64748b' },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  row: { display: 'grid', gridTemplateColumns: '2.5fr 1.5fr 1.2fr 1.8fr', padding: '18px 24px', alignItems: 'flex-start', borderBottom: '1px solid #f0f4f8' },
  headerRow: { background: '#f8fafc', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: 0.8, alignItems: 'center' },
  title: { margin: 0, fontSize: 15, fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' as const },
  meta: { margin: '4px 0 0', fontSize: 13, color: '#64748b', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' as const },
  badge: (status: string) => ({
    display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px',
    borderRadius: 100, fontSize: 12, fontWeight: 600,
    background: status === 'approved' ? '#dcfce7' : status === 'submitted' ? '#dbeafe' : status === 'revision' ? '#fef3c7' : '#f1f5f9',
    color: status === 'approved' ? '#166534' : status === 'submitted' ? '#1e40af' : status === 'revision' ? '#92400e' : '#475569',
  }),
  pointsBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px',
    borderRadius: 6, fontSize: 12, fontWeight: 600, background: '#dcfce7', color: '#166534'
  },
  btn: (bg: string, color = '#fff') => ({
    padding: '7px 14px', borderRadius: 6, border: 'none', fontWeight: 600, fontSize: 13,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5,
    background: bg, color,
  }),
  ghostBtn: {
    padding: '5px 10px', borderRadius: 6, border: '1px solid #e2e8f0', fontWeight: 600,
    fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4,
    background: '#fff', color: '#475569',
  },
  tabs: { display: 'flex', gap: 0, borderBottom: '1px solid #e5eaf0' },
  tab: (active: boolean) => ({
    padding: '12px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
    color: active ? '#0a2540' : '#64748b',
    borderBottom: active ? '2px solid #0a2540' : '2px solid transparent',
    marginBottom: -1, whiteSpace: 'nowrap' as const,
    background: 'none',
  }),
  countPill: (active: boolean) => ({
    fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 99,
    background: active ? '#0a2540' : '#e2e8f0',
    color: active ? '#fff' : '#64748b',
  }),
  panel: {
    background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10,
    padding: 14, display: 'flex', flexDirection: 'column' as const, gap: 10,
  },
  input: {
    width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #cbd5e1',
    fontSize: 14, fontFamily: 'inherit', resize: 'vertical' as const,
    minHeight: 64, boxSizing: 'border-box' as const,
  },
  numInput: {
    padding: '6px 10px', borderRadius: 6, border: '1px solid #cbd5e1',
    fontSize: 14, width: 90, boxSizing: 'border-box' as const,
  },
};

type FilterKey = 'pending' | 'all' | 'approved' | 'revision';

export default function Submissions() {
  const { submissions, interns, tasks, internships, updateSubmission } = useStore();
  const [filter, setFilter] = useState<FilterKey>('pending');
  const [actionState, setActionState] = useState<{ id: string; type: 'approved' | 'revision' } | null>(null);
  const [feedback, setFeedback] = useState('');
  const [customPoints, setCustomPoints] = useState<number>(0);

  const openAction = (subId: string, type: 'approved' | 'revision', currentFeedback?: string, defaultPoints = 0) => {
    setActionState({ id: subId, type });
    setFeedback(currentFeedback || '');
    setCustomPoints(defaultPoints);
  };

  const closeAction = () => {
    setActionState(null);
    setFeedback('');
    setCustomPoints(0);
  };

  const handleConfirm = () => {
    if (!actionState) return;
    const sub = submissions.find(s => s.id === actionState.id);
    if (sub) {
      updateSubmission({
        ...sub,
        status: actionState.type,
        feedback: feedback.trim() || undefined,
        awardedPoints: actionState.type === 'approved' ? customPoints : undefined,
      });
    }
    closeAction();
  };

  const tabs: { key: FilterKey; label: string; count: number }[] = [
    { key: 'pending', label: 'Unreviewed', count: submissions.filter(s => s.status === 'submitted').length },
    { key: 'all', label: 'All', count: submissions.length },
    { key: 'approved', label: 'Accepted', count: submissions.filter(s => s.status === 'approved').length },
    { key: 'revision', label: 'Rejected', count: submissions.filter(s => s.status === 'revision').length },
  ];

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'all') return true;
    if (filter === 'pending') return sub.status === 'submitted';
    return sub.status === filter;
  });

  const getStatusLabel = (status: string) => {
    if (status === 'submitted') return 'Pending Review';
    if (status === 'approved') return 'Accepted';
    if (status === 'revision') return 'Rejected';
    return status;
  };

  const getStatusIcon = (status: string) => {
    if (status === 'approved') return <CheckCircle size={13} />;
    if (status === 'submitted') return <Clock size={13} />;
    if (status === 'revision') return <XCircle size={13} />;
    return <AlertCircle size={13} />;
  };

  return (
    <div style={S.page}>
      <div>
        <h1 style={S.h1}>Submission Reviews</h1>
        <p style={S.sub}>Accept or reject intern submissions. You can change your decision at any time.</p>
      </div>

      {/* Tabs */}
      <div style={S.tabs}>
        {tabs.map(({ key, label, count }) => (
          <button key={key} style={S.tab(filter === key)} onClick={() => setFilter(key)}>
            {label}
            <span style={S.countPill(filter === key)}>{count}</span>
          </button>
        ))}
      </div>

      <div style={S.card}>
        {/* Header */}
        <div style={{ ...S.row, ...S.headerRow }}>
          <div>Task / Intern</div>
          <div>Submitted By</div>
          <div>Status</div>
          <div style={{ textAlign: 'right' }}>Actions</div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#64748b', fontSize: 15 }}>
            {filter === 'pending' ? '🎉 All caught up! No unreviewed submissions.' : 'No submissions match this filter.'}
          </div>
        ) : (
          filteredSubmissions.map(sub => {
            const intern = interns.find(i => i.id === sub.internId);
            const task = tasks.find(t => t.id === sub.taskId);
            const internship = internships.find(i => i.id === task?.internshipId);
            const isActioning = actionState?.id === sub.id;
            const isReviewed = sub.status === 'approved' || sub.status === 'revision';

            return (
              <div key={sub.id} style={{ ...S.row, borderBottom: '1px solid #f0f4f8' }}>

                {/* Task info */}
                <div>
                  <p style={S.title}>
                    {task?.title || 'Unknown Task'}
                    {task && (
                      <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                        <Star size={11} color="#fbbf24" fill="#fbbf24" /> {task.points} pts max
                      </span>
                    )}
                  </p>
                  <div style={S.meta}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Briefcase size={11} /> {internship?.title || 'General'}
                    </span>
                    <span>•</span>
                    <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                  </div>

                  {sub.content && (
                    <a
                      href={sub.content} target="_blank" rel="noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 12, color: '#0dabab', textDecoration: 'none', fontWeight: 600 }}
                    >
                      <FileText size={13} /> View Work
                    </a>
                  )}

                  {sub.feedback && !isActioning && (
                    <div style={{ marginTop: 8, fontSize: 12, color: '#475569', background: '#f8fafc', padding: '6px 10px', borderRadius: 6, display: 'flex', gap: 5, alignItems: 'flex-start' }}>
                      <MessageSquare size={13} style={{ marginTop: 1, flexShrink: 0 }} />
                      <span style={{ fontStyle: 'italic' }}>{sub.feedback}</span>
                    </div>
                  )}
                </div>

                {/* Intern */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#0a2540', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                    {intern?.name.split(' ').map(n => n[0]).join('').substring(0, 2) || '?'}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>{intern?.name || 'Unknown'}</span>
                </div>

                {/* Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={S.badge(sub.status)}>
                    {getStatusIcon(sub.status)}
                    {getStatusLabel(sub.status)}
                  </span>
                  {sub.status === 'approved' && (
                    <span style={S.pointsBadge}>
                      +{sub.awardedPoints !== undefined ? sub.awardedPoints : task?.points ?? 0} pts awarded
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                  {!isActioning ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                      {/* Primary action buttons - always visible */}
                      {!isReviewed && (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            style={S.btn('#fee2e2', '#b91c1c')}
                            onClick={() => openAction(sub.id, 'revision', sub.feedback)}
                          >
                            <XCircle size={14} /> Reject
                          </button>
                          <button
                            style={S.btn('#16a34a')}
                            onClick={() => openAction(sub.id, 'approved', sub.feedback, task?.points ?? 0)}
                          >
                            <CheckCircle size={14} /> Accept
                          </button>
                        </div>
                      )}

                      {/* Edit review for already-reviewed submissions */}
                      {isReviewed && (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            style={{ ...S.ghostBtn, color: sub.status === 'approved' ? '#b91c1c' : '#16a34a' }}
                            onClick={() => {
                              const newType = sub.status === 'approved' ? 'revision' : 'approved';
                              openAction(sub.id, newType, sub.feedback, task?.points ?? 0);
                            }}
                          >
                            {sub.status === 'approved'
                              ? <><XCircle size={12} /> Change to Reject</>
                              : <><CheckCircle size={12} /> Change to Accept</>
                            }
                          </button>
                          <button
                            style={S.ghostBtn}
                            onClick={() => openAction(sub.id, sub.status as 'approved' | 'revision', sub.feedback, sub.awardedPoints ?? task?.points ?? 0)}
                          >
                            <Edit2 size={12} /> Edit Review
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Inline review panel */
                    <div style={{ width: '100%', minWidth: 240 }}>
                      <div style={S.panel}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{
                            fontSize: 13, fontWeight: 700, color: actionState.type === 'approved' ? '#166534' : '#b91c1c',
                            display: 'flex', alignItems: 'center', gap: 5
                          }}>
                            {actionState.type === 'approved'
                              ? <><CheckCircle size={14} /> Accepting submission</>
                              : <><XCircle size={14} /> Rejecting submission</>
                            }
                          </span>
                          <button onClick={closeAction} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
                            <X size={16} />
                          </button>
                        </div>

                        {actionState.type === 'approved' && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' as const }}>
                              Points to award:
                            </label>
                            <input
                              type="number"
                              min={0}
                              style={S.numInput}
                              value={customPoints}
                              onChange={e => setCustomPoints(Math.max(0, Number(e.target.value)))}
                            />
                          </div>
                        )}

                        <textarea
                          style={S.input}
                          placeholder={actionState.type === 'approved' ? 'Add feedback or praise (optional)...' : 'Reason for rejection (optional)...'}
                          value={feedback}
                          onChange={e => setFeedback(e.target.value)}
                          autoFocus
                        />

                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                          <button onClick={closeAction} style={S.btn('#e2e8f0', '#475569')}>Cancel</button>
                          <button
                            onClick={handleConfirm}
                            style={S.btn(actionState.type === 'approved' ? '#16a34a' : '#dc2626')}
                          >
                            {actionState.type === 'approved' ? 'Confirm Accept' : 'Confirm Reject'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
