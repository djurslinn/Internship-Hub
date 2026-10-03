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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            <div>
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
        <div style={{ padding: '16px', borderBottom: '1px solid #f0f4f8', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Filter size={16} color="#64748b" />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Filter by Internship:</span>
          <select 
            style={{ ...S.select, width: 'auto', padding: '6px 32px 6px 12px' }} 
            value={filterInternshipId} 
            onChange={e => setFilterInternshipId(e.target.value)}
          >
            <option value="all">All Internships</option>
            {internships.map(i => <option key={i.id} value={i.id}>{i.title}</option>)}
          </select>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f0f4f8' }}>
              {['Task', 'Program', 'Due Date', 'Priority', 'Points', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.6 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>No tasks match the selected criteria.</td></tr>
            ) : filteredTasks.map(task => {
              const program = internships.find(i => i.id === task.internshipId);
              return (
                <tr key={task.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>{task.title}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>{task.description?.slice(0, 60)}...</p>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b', fontWeight: 500 }}>
                    {program ? program.title : 'Unknown'}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {new Date(task.dueDate).toLocaleDateString()}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontWeight: 600, fontSize: 12, color: task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#22c55e', textTransform: 'capitalize' }}>{task.priority}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#f59e0b' }}>{task.points}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => handleEdit(task)} style={S.iconBtn()}><Edit2 size={14} /></button>
                      <button onClick={() => deleteTask(task.id)} style={S.iconBtn(true)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
