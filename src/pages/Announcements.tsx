import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Edit2, Plus, Save, Megaphone, Clock, Trash2 } from 'lucide-react';

export default function Announcements() {
  const role = useStore((state: any) => state.role);
  const announcements = useStore((state: any) => state.announcements || []);
  const deleteAnnouncement = useStore((state: any) => state.deleteAnnouncement);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const sortedAnnouncements = [...announcements].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const openCreate = () => {
    setEditId(null);
    setTitle('');
    setContent('');
    setIsFormOpen(true);
  };

  const openEdit = (a: any) => {
    setEditId(a.id);
    setTitle(a.title);
    setContent(a.content);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      useStore.setState((state: any) => ({
        announcements: state.announcements.map((a: any) =>
          a.id === editId ? { ...a, title, content } : a
        )
      }));
    } else {
      const newAnn = {
        id: Math.random().toString(36).substring(2, 11),
        title,
        content,
        createdAt: new Date().toISOString()
      };
      
      useStore.setState((state: any) => ({
        announcements: [newAnn, ...state.announcements]
      }));
    }
    setIsFormOpen(false);
  };

  const styles = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: '#111827' },
    button: { padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' },
    card: { background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem', border: '1px solid #e5e7eb' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' },
    cardTitle: { margin: 0, fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' },
    date: { color: '#6b7280', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' },
    content: { margin: 0, color: '#4b5563', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const },
    iconBtn: { background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px' },
    form: { background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '2rem', border: '1px solid #e5e7eb' },
    input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' as const, fontFamily: 'inherit' },
    textarea: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #d1d5db', minHeight: '120px', boxSizing: 'border-box' as const, fontFamily: 'inherit', resize: 'vertical' as const },
    formActions: { display: 'flex', justifyContent: 'flex-end', gap: '1rem' },
    cancelBtn: { padding: '0.5rem 1rem', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' },
    saveBtn: { padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Megaphone size={28} color="#3b82f6" />
          Announcements
        </h1>
        {role === 'coordinator' && !isFormOpen && (
          <button style={styles.button} onClick={openCreate}>
            <Plus size={18} /> New Announcement
          </button>
        )}
      </div>

      {isFormOpen && (
        <form style={styles.form} onSubmit={handleSave}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.25rem' }}>
            {editId ? 'Edit Announcement' : 'Create Announcement'}
          </h2>
          <input
            style={styles.input}
            placeholder="Announcement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            style={styles.textarea}
            placeholder="Announcement Content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div style={styles.formActions}>
            <button type="button" style={styles.cancelBtn} onClick={() => setIsFormOpen(false)}>
              Cancel
            </button>
            <button type="submit" style={styles.saveBtn}>
              <Save size={18} /> Save
            </button>
          </div>
        </form>
      )}

      <div>
        {sortedAnnouncements.length === 0 ? (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>No announcements yet.</p>
        ) : (
          sortedAnnouncements.map((announcement: any) => (
            <div key={announcement.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.cardTitle}>{announcement.title}</h3>
                  <div style={styles.date}>
                    <Clock size={14} />
                    {new Date(announcement.createdAt).toLocaleString()}
                  </div>
                </div>
                {role === 'coordinator' && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      style={{ ...styles.iconBtn, background: '#f3f4f6', padding: '0.4rem' }}
                      onClick={() => openEdit(announcement)}
                      title="Edit Announcement"
                    >
                      <Edit2 size={16} color="#4b5563" />
                    </button>
                    <button
                      style={{ ...styles.iconBtn, background: '#fee2e2', padding: '0.4rem' }}
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this announcement?")) {
                          deleteAnnouncement(announcement.id);
                        }
                      }}
                      title="Delete Announcement"
                    >
                      <Trash2 size={16} color="#ef4444" />
                    </button>
                  </div>
                )}
              </div>
              <p style={styles.content}>{announcement.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
