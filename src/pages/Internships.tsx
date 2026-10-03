import { useState } from 'react';
import { useStore } from '../store/useStore';
import type { Internship } from '../types';
import { Plus, Edit2, Trash2, Link as LinkIcon, Users, Target } from 'lucide-react';

const S = {
  page: { display: 'flex', flexDirection: 'column' as const, gap: 20 },
  h1: { margin: 0, fontSize: 26, fontWeight: 800, color: '#0a2540', letterSpacing: -0.5 },
  sub: { margin: '4px 0 0', fontSize: 14, color: '#64748b' },
  card: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 24 },
  formCard: { background: '#fff', borderRadius: 12, border: '1px solid #e5eaf0', padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 20 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6 },
  input: { width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const },
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
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 0', borderBottom: '1px solid #f0f4f8' },
};

export default function Internships() {
  const internships = useStore(state => state.internships);
  const tasks = useStore(state => state.tasks);
  const interns = useStore(state => state.interns);
  const addInternship = useStore(state => state.addInternship);
  const updateInternship = useStore(state => state.updateInternship);
  const deleteInternship = useStore(state => state.deleteInternship);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Internship>>({});

  const handleAddNew = () => {
    setIsEditing('new');
    setFormData({ title: '', description: '', registrationLink: '' });
  };

  const handleEdit = (int: Internship) => { setIsEditing(int.id); setFormData(int); };

  const handleSave = () => {
    if (!formData.title?.trim()) return;
    if (isEditing === 'new') {
      addInternship({ 
        id: `int-${Date.now()}`, 
        title: formData.title, 
        description: formData.description || '', 
        registrationLink: formData.registrationLink || '' 
      });
    } else {
      updateInternship(formData as Internship);
    }
    setIsEditing(null);
  };

  return (
    <div style={S.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={S.h1}>Internships Programs</h1>
          <p style={S.sub}>Manage available internships and their registration links.</p>
        </div>
        {!isEditing && (
          <button onClick={handleAddNew} style={S.btn(true)}><Plus size={16} /> New Internship</button>
        )}
      </div>

      {isEditing && (
        <div style={S.formCard}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700 }}>{isEditing === 'new' ? 'Create New Internship' : 'Edit Internship'}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={S.label}>Title</label>
              <input style={S.input} value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Frontend Engineering" />
            </div>
            <div>
              <label style={S.label}>Registration Link</label>
              <input style={S.input} value={formData.registrationLink || ''} onChange={e => setFormData({ ...formData, registrationLink: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <label style={S.label}>Description</label>
              <textarea style={S.textarea} rows={3} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 10 }}>
              <button onClick={() => setIsEditing(null)} style={S.btn()}>Cancel</button>
              <button onClick={handleSave} style={S.btn(true)}>Save Internship</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {internships.map(int => {
          const programTasks = tasks.filter(t => t.internshipId === int.id).length;
          const programInterns = interns.filter(i => i.internshipId === int.id || i.internship === int.title).length;
          
          return (
            <div key={int.id} style={{...S.card, padding: 20}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0a2540' }}>{int.title}</h3>
                  <p style={{ margin: '6px 0 16px', fontSize: 14, color: '#64748b' }}>{int.description}</p>
                  
                  <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0dabab', fontSize: 13, fontWeight: 600 }}>
                      <LinkIcon size={14} />
                      <a href={int.registrationLink} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Registration Link</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 13, fontWeight: 500 }}>
                      <Users size={14} /> {programInterns} Interns
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#475569', fontSize: 13, fontWeight: 500 }}>
                      <Target size={14} /> {programTasks} Tasks
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button onClick={() => handleEdit(int)} style={S.iconBtn()}><Edit2 size={16} /></button>
                  <button onClick={() => deleteInternship(int.id)} style={S.iconBtn(true)}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
