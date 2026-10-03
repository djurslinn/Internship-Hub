import { useState } from 'react';
import { useStore } from '../store/useStore';
import type { Task } from '../types';
import { Plus, Edit2, Trash2, Calendar, Filter } from 'lucide-react';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 20 },
  h1: { margin: 0, fontSize: 26, fontWeight: 800, color: '#0a2540', letterSpacing: -0.5 },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  formCard: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6 },
  input: { width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const },
  select: { width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const },
  textarea: { width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', fontFamily: 'inherit', resize: 'vertical' as const, boxSizing: 'border-box' as const },
  btn: (primary?: boolean) => ({
    display: 'inline-flex', alignItems: 'center' as const, gap: 6, padding: '9px 18px', borderRadius: 8, border: 'none',
    fontWeight: 600, fontSize: 13, cursor: 'pointer',
    background: primary ? '#0a2540' : '#f1f5f9',
    color: primary ? '#fff' : '#475569',
  }),
  iconBtn: (danger?: boolean) => ({
    padding: '6px', borderRadius: 6, border: 'none', cursor: 'pointer',
    background: 'transparent', color: danger ? '#ef4444' : '#94a3b8',
    display: 'flex', alignItems: 'center' as const,
  }),
};

export default function CoordinatorTasks() {
  const tasks = useStore(state => state.tasks);
  const internships = useStore(state => state.internships);
  const addTask = useStore(state => state.addTask);
  const updateTask = useStore(state => state.updateTask);
  const deleteTask = useStore(state => state.deleteTask);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Task>>({});
  const [filterInternshipId, setFilterInternshipId] = useState<string>('all');

  const handleAddNew = () => {
    setIsEditing('new');
    setFormData({ 
      title: '', 
      description: '', 
      dueDate: new Date().toISOString().split('T')[0], 
      priority: 'medium', 
      points: 10, 
      internshipId: internships.length > 0 ? internships[0].id : '' 
    });
  };

  const handleEdit = (task: Task) => { setIsEditing(task.id); setFormData(task); };

  const handleSave = () => {
    if (!formData.title?.trim() || !formData.internshipId) return;
    
    if (isEditing === 'new') {
      addTask({ 
        id: `t-${Date.now()}`, 
        title: formData.title, 
        description: formData.description || '', 
        dueDate: formData.dueDate!, 
        priority: formData.priority as Task['priority'], 
        points: Number(formData.points) || 0, 
        internshipId: formData.internshipId 
      });
    } else {
      updateTask(formData as Task);
    }
    setIsEditing(null);
  };

  const filteredTasks = filterInternshipId === 'all' 
    ? tasks 
    : tasks.filter(t => t.internshipId === filterInternshipId);

  return (
    <div style={S.page}>
      <style>{`
        .ct-table-header {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #f0f4f8;
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
        .ct-table-row {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid #f8fafc;
          gap: 16px;
        }
        .ct-col-task { flex: 2; min-width: 0; }
        .ct-col-prog { flex: 1; min-width: 0; color: #64748b; font-weight: 500; font-size: 13px; }
        .ct-col-date { flex: 1; min-width: 0; color: #64748b; font-size: 13px; }
        .ct-col-prio { width: 80px; flex-shrink: 0; }
        .ct-col-pts { width: 60px; flex-shrink: 0; font-weight: 700; color: #f59e0b; font-size: 13px; }
        .ct-col-acts { width: 60px; flex-shrink: 0; display: flex; gap: 6px; justify-content: flex-end; }
        
        @media (max-width: 768px) {
          .ct-table-header {
            display: none;
          }
          .ct-table-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 16px;
          }
          .ct-col-task {
            width: 100%;
          }
          .ct-col-prog, .ct-col-date, .ct-col-prio, .ct-col-pts {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .ct-col-prog::before { content: "Program:"; font-weight: 600; color: #0f172a; }
          .ct-col-date::before { content: "Due Date:"; font-weight: 600; color: #0f172a; }
          .ct-col-prio::before { content: "Priority:"; font-weight: 600; color: #0f172a; }
          .ct-col-pts::before { content: "Points:"; font-weight: 600; color: #0f172a; }
          .ct-col-acts {
            width: 100%;
            justify-content: flex-start;
            margin-top: 8px;
          }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <h1 style={S.h1}>Manage Tasks</h1>
        <button onClick={handleAddNew} style={S.btn(true)}><Plus size={15} /> Create Task</button>
      </div>

      {isEditing && (
        <div style={S.formCard}>
          <p style={{ margin: '0 0 16px', fontWeight: 700, fontSize: 15, color: '#0a2540' }}>{isEditing === 'new' ? 'New Task' : 'Edit Task'}</p>
          <div style={S.formGrid}>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={S.label}>Title</label>
              <input style={S.input} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Task title..." />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={S.label}>Description</label>
              <textarea style={S.textarea} rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Describe what needs to be done..." />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={S.label}>Internship Program (Required)</label>
              <select style={S.select} value={formData.internshipId || ''} onChange={e => setFormData({ ...formData, internshipId: e.target.value })}>
                {internships.length === 0 && <option value="">No internships available</option>}
                {internships.map(i => <option key={i.id} value={i.id}>{i.title}</option>)}
              </select>
            </div>
            <div>
              <label style={S.label}>Priority</label>
              <select style={S.select} value={formData.priority || 'medium'} onChange={e => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Due Date</label>
              <input type="date" style={S.input} value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} />
            </div>
            <div>
              <label style={S.label}>Points</label>
              <input type="number" style={S.input} value={formData.points} onChange={e => setFormData({ ...formData, points: Number(e.target.value) })} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
            <button onClick={() => setIsEditing(null)} style={S.btn()}>Cancel</button>
            <button onClick={handleSave} style={S.btn(true)}>Save Task</button>
          </div>
        </div>
      )}

      <div style={S.card}>
        <div style={{ padding: '16px', borderBottom: '1px solid #f0f4f8', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Filter size={16} color="#64748b" />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Filter by Internship:</span>
          <select 
            style={{ ...S.select, width: 'auto', padding: '6px 32px 6px 12px', flex: '1' }} 
            value={filterInternshipId} 
            onChange={e => setFilterInternshipId(e.target.value)}
          >
            <option value="all">All Internships</option>
            {internships.map(i => <option key={i.id} value={i.id}>{i.title}</option>)}
          </select>
        </div>
        
        <div style={{ width: '100%' }}>
          <div className="ct-table-header">
            <div className="ct-col-task">Task</div>
            <div className="ct-col-prog">Program</div>
            <div className="ct-col-date">Due Date</div>
            <div className="ct-col-prio">Priority</div>
            <div className="ct-col-pts">Points</div>
            <div className="ct-col-acts"></div>
          </div>
          
          <div>
            {filteredTasks.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>No tasks match the selected criteria.</div>
            ) : filteredTasks.map(task => {
              const program = internships.find(i => i.id === task.internshipId);
              return (
                <div key={task.id} className="ct-table-row">
                  <div className="ct-col-task">
                    <p style={{ margin: 0, fontWeight: 600, color: '#0f172a', fontSize: 13 }}>{task.title}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>{task.description?.slice(0, 60)}...</p>
                  </div>
                  <div className="ct-col-prog">
                    {program ? program.title : 'Unknown'}
                  </div>
                  <div className="ct-col-date">
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="ct-col-prio">
                    <span style={{ fontWeight: 600, fontSize: 12, color: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#22c55e', textTransform: 'capitalize' }}>{task.priority}</span>
                  </div>
                  <div className="ct-col-pts">{task.points}</div>
                  <div className="ct-col-acts">
                    <button onClick={() => handleEdit(task)} style={S.iconBtn()}><Edit2 size={14} /></button>
                    <button onClick={() => deleteTask(task.id)} style={S.iconBtn(true)}><Trash2 size={14} /></button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
