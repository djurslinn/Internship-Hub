import { useState } from 'react';
import type { ReactNode } from 'react';
import { useStore } from '../store/useStore';
import { Calendar, CheckCircle, Clock, AlertCircle, Upload } from 'lucide-react';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 20 },
  h1: { margin: 0, fontSize: 26, fontWeight: 800, color: '#0a2540', letterSpacing: -0.5 },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  taskBody: { padding: '0 20px 20px', borderTop: '1px solid #f0f4f8' },
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, marginTop: 16 },
  textarea: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, resize: 'vertical' as const, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const },
  btn: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 20px', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer' },
};

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; color: string; icon: ReactNode }> = {
    approved: { label: 'Approved', color: '#22c55e', icon: <CheckCircle size={12} /> },
    submitted: { label: 'Submitted', color: '#3b82f6', icon: <Clock size={12} /> },
    revision: { label: 'Revision', color: '#ef4444', icon: <AlertCircle size={12} /> },
    pending: { label: 'Pending', color: '#f59e0b', icon: <Clock size={12} /> },
  };
  const m = map[status] ?? map.pending;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, background: m.color + '18', color: m.color }}>
      {m.icon} {m.label}
    </span>
  );
};

export default function InternTasks() {
  const tasks = useStore(state => state.tasks);
  const submissions = useStore(state => state.submissions);
  const addSubmission = useStore(state => state.addSubmission);
  const updateSubmission = useStore(state => state.updateSubmission);
  
  const currentUser = useStore(state => state.currentUser || state.interns[0]);

  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [submitContents, setSubmitContents] = useState<Record<string, string>>({});

  const getSubmission = (taskId: string) => {
    return submissions.find(s => s.taskId === taskId && s.internId === currentUser.id);
  };

  const handleContentChange = (taskId: string, val: string) => {
    setSubmitContents(prev => ({ ...prev, [taskId]: val }));
  };

  const handleSubmit = (taskId: string) => {
    const content = submitContents[taskId]?.trim();
    if (!content) return;
    
    const existing = getSubmission(taskId);
    if (existing) {
      updateSubmission({
        ...existing,
        content,
        status: 'submitted',
        submittedAt: new Date().toISOString()
      });
    } else {
      addSubmission({
        id: `s-${Date.now()}`,
        taskId,
        internId: currentUser.id,
        submittedAt: new Date().toISOString(),
        status: 'submitted',
        content
      });
    }
    
    setSubmitContents(prev => ({ ...prev, [taskId]: '' }));
  };

  return (
    <div style={S.page}>
      <style>{`
        .it-task-header {
          padding: 18px 20px;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }
        .it-task-title {
          margin: 0;
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
        }
        .it-task-meta {
          margin: 4px 0 0;
          font-size: 12px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        @media (max-width: 500px) {
          .it-task-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .it-task-meta {
            gap: 8px;
          }
        }
      `}</style>

      <h1 style={S.h1}>My Tasks</h1>
      {tasks.map(task => {
        const sub = getSubmission(task.id);
        const status = sub?.status ?? 'pending';
        const isOpen = selectedTask === task.id;
        const priorityColor = task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#22c55e';

        return (
          <div key={task.id} style={S.card}>
            <div className="it-task-header" style={{ background: isOpen ? '#f8fafc' : '#fff' }} onClick={() => setSelectedTask(isOpen ? null : task.id)}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <p className="it-task-title">{task.title}</p>
                <div className="it-task-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> Due {new Date(task.dueDate).toLocaleDateString()}</span>
                  <span style={{ fontWeight: 800, color: '#f59e0b', fontSize: 13, background: '#fef3c7', padding: '2px 8px', borderRadius: 12 }}>{task.points} pts</span>
                  <span style={{ fontWeight: 600, color: priorityColor, textTransform: 'capitalize' }}>{task.priority} priority</span>
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <StatusBadge status={status} />
              </div>
            </div>

            {isOpen && (
              <div style={S.taskBody}>
                <label style={S.label}>Description</label>
                <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{task.description}</p>
                
                {sub?.feedback && status === 'revision' && (
                  <div style={{ marginTop: 12, padding: '12px 14px', background: '#fef2f2', borderRadius: 8, border: '1px solid #fecaca' }}>
                    <p style={{ margin: 0, fontSize: 13, color: '#b91c1c', fontWeight: 600 }}>Feedback for Revision:</p>
                    <p style={{ margin: '4px 0 0', fontSize: 13, color: '#991b1b' }}>{sub.feedback}</p>
                  </div>
                )}

                {(status === 'pending' || status === 'revision') ? (
                  <>
                    <label style={S.label}>Your Submission</label>
                    <textarea
                      style={S.textarea}
                      rows={3}
                      placeholder="Paste a link to your PR, design, or describe your work…"
                      value={submitContents[task.id] ?? ''}
                      onChange={e => handleContentChange(task.id, e.target.value)}
                    />
                    <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleSubmit(task.id)}
                        disabled={!(submitContents[task.id] || '').trim()}
                        style={{ ...S.btn, background: (submitContents[task.id] || '').trim() ? '#0a2540' : '#e2e8f0', color: (submitContents[task.id] || '').trim() ? '#fff' : '#94a3b8', cursor: (submitContents[task.id] || '').trim() ? 'pointer' : 'not-allowed' }}
                      >
                        <Upload size={14} /> {status === 'revision' ? 'Resubmit Task' : 'Submit Task'}
                      </button>
                    </div>
                  </>
                ) : status === 'submitted' ? (
                  <div style={{ marginTop: 16, padding: '12px 14px', background: '#eff6ff', borderRadius: 8, border: '1px solid #bfdbfe' }}>
                    <p style={{ margin: 0, fontSize: 13, color: '#1d4ed8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Clock size={16} /> Awaiting Review
                    </p>
                    <p style={{ margin: '6px 0 0', fontSize: 13, color: '#2563eb' }}>You have submitted your work and it is currently awaiting review.</p>
                  </div>
                ) : status === 'approved' ? (
                  <div style={{ marginTop: 16, padding: '12px 14px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                    <p style={{ margin: 0, fontSize: 13, color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle size={16} /> Approved
                    </p>
                    <p style={{ margin: '6px 0 0', fontSize: 13, color: '#15803d' }}>
                      Excellent work! You earned <strong>{task.points} points</strong> for completing this task.
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
