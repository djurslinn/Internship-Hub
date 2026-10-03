import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Edit2, Plus, Save, BarChart2, Check, Trash2 } from 'lucide-react';

export default function Polls() {
  const role = useStore((state: any) => state.role);
  const user = useStore((state: any) => state.currentUser); // Get current user for voting
  const polls = useStore((state: any) => state.polls || []);
  const addPoll = useStore((state: any) => state.addPoll);
  const deletePoll = useStore((state: any) => state.deletePoll);
  const votePoll = useStore((state: any) => state.votePoll);
  
  // A fallback ID just in case user object isn't fully mocked
  const currentUserId = user?.id || 'intern-user-id';

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<{ id: string; text: string; votes: number }[]>([]);
  const [isActive, setIsActive] = useState(true);

  const openCreate = () => {
    setEditId(null);
    setQuestion('');
    setOptions([
      { id: Math.random().toString(36).substring(2, 9), text: '', votes: 0 },
      { id: Math.random().toString(36).substring(2, 9), text: '', votes: 0 }
    ]);
    setIsActive(true);
    setIsFormOpen(true);
  };

  const openEdit = (poll: any) => {
    setEditId(poll.id);
    setQuestion(poll.question);
    // Deep copy options so we don't accidentally mutate state directly
    setOptions(poll.options.map((opt: any) => ({ ...opt })));
    setIsActive(poll.active);
    setIsFormOpen(true);
  };

  const addOption = () => {
    setOptions([...options, { id: Math.random().toString(36).substring(2, 9), text: '', votes: 0 }]);
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(opt => opt.id !== id));
    }
  };

  const updateOptionText = (id: string, text: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, text } : opt));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty options
    const validOptions = options.filter(opt => opt.text.trim() !== '');
    if (validOptions.length < 2) {
      alert('A poll must have at least two valid options.');
      return;
    }

    if (editId) {
      const updatedPoll = {
        id: editId,
        question,
        options: validOptions,
        active: isActive,
        votedBy: polls.find((p: any) => p.id === editId)?.votedBy || []
      };
      
      useStore.setState((state: any) => ({
        polls: state.polls.map((p: any) => p.id === editId ? updatedPoll : p)
      }));
    } else {
      const newPoll = {
        id: Math.random().toString(36).substring(2, 11),
        question,
        options: validOptions,
        active: isActive,
        votedBy: []
      };
      if (addPoll) {
        addPoll(newPoll);
      } else {
        useStore.setState((state: any) => ({
          polls: [newPoll, ...state.polls]
        }));
      }
    }
    setIsFormOpen(false);
  };

  const handleVote = (pollId: string, optionId: string) => {
    if (votePoll) {
      votePoll(pollId, optionId, currentUserId);
    } else {
      // Inline fallback if votePoll is not yet fully functional in store
      useStore.setState((state: any) => ({
        polls: state.polls.map((p: any) => {
          if (p.id !== pollId) return p;
          if (p.votedBy.includes(currentUserId)) return p; // already voted
          return {
            ...p,
            votedBy: [...p.votedBy, currentUserId],
            options: p.options.map((o: any) => 
              o.id === optionId ? { ...o, votes: o.votes + 1 } : o
            )
          };
        })
      }));
    }
  };

  const calculateTotalVotes = (pollOptions: any[]) => {
    return pollOptions.reduce((sum, opt) => sum + opt.votes, 0);
  };

  const styles = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    title: { fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: '#111827' },
    button: { padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' },
    form: { background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '2rem', border: '1px solid #e5e7eb' },
    input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' as const, fontFamily: 'inherit' },
    optionRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' },
    addOptionBtn: { padding: '0.5rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '500' },
    iconBtn: { background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '0.25rem', borderRadius: '4px' },
    formActions: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' },
    rightActions: { display: 'flex', gap: '1rem' },
    cancelBtn: { padding: '0.5rem 1rem', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' },
    saveBtn: { padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' },
    card: { background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1.5rem', border: '1px solid #e5e7eb' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' },
    cardTitle: { margin: 0, fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    badge: { padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold' },
    badgeActive: { background: '#d1fae5', color: '#065f46' },
    badgeInactive: { background: '#fee2e2', color: '#991b1b' },
    optionBox: { display: 'flex', flexDirection: 'column' as const, gap: '0.75rem' },
    voteRow: { display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' as const },
    voteBtn: { flex: 1, padding: '0.75rem 1rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', textAlign: 'left' as const, transition: 'all 0.2s', position: 'relative' as const, overflow: 'hidden' as const, zIndex: 1 },
    voteBtnDisabled: { cursor: 'default' },
    barBg: { position: 'absolute' as const, left: 0, top: 0, bottom: 0, background: '#dbeafe', zIndex: -1, transition: 'width 0.5s ease-out' },
    voteTextContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    voteCount: { fontWeight: '600', color: '#4b5563', fontSize: '0.875rem' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <BarChart2 size={28} color="#3b82f6" />
          Polls
        </h1>
        {role === 'coordinator' && !isFormOpen && (
          <button style={styles.button} onClick={openCreate}>
            <Plus size={18} /> New Poll
          </button>
        )}
      </div>

      {isFormOpen && (
        <form style={styles.form} onSubmit={handleSave}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.25rem' }}>
            {editId ? 'Edit Poll' : 'Create Poll'}
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Question</label>
            <input
              style={{ ...styles.input, marginBottom: 0 }}
              placeholder="What would you like to ask?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Options</label>
            {options.map((opt, index) => (
              <div key={opt.id} style={styles.optionRow}>
                <input
                  style={{ ...styles.input, marginBottom: 0, flex: 1 }}
                  placeholder={`Option ${index + 1}`}
                  value={opt.text}
                  onChange={(e) => updateOptionText(opt.id, e.target.value)}
                  required
                />
                <button
                  type="button"
                  style={{ ...styles.iconBtn, color: options.length > 2 ? '#ef4444' : '#9ca3af', cursor: options.length > 2 ? 'pointer' : 'not-allowed' }}
                  onClick={() => removeOption(opt.id)}
                  disabled={options.length <= 2}
                  title={options.length <= 2 ? "Minimum 2 options required" : "Remove option"}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button type="button" style={styles.addOptionBtn} onClick={addOption}>
              <Plus size={16} /> Add Option
            </button>
          </div>

          <div style={styles.formActions}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: '500' }}>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                style={{ width: '1rem', height: '1rem' }}
              />
              Poll is active
            </label>
            <div style={styles.rightActions}>
              <button type="button" style={styles.cancelBtn} onClick={() => setIsFormOpen(false)}>
                Cancel
              </button>
              <button type="submit" style={styles.saveBtn}>
                <Save size={18} /> Save Poll
              </button>
            </div>
          </div>
        </form>
      )}

      <div>
        {polls.length === 0 ? (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>No polls available at the moment.</p>
        ) : (
          polls.map((poll: any) => {
            const totalVotes = calculateTotalVotes(poll.options);
            const hasVoted = poll.votedBy?.includes(currentUserId);
            
            return (
              <div key={poll.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={{ flex: 1 }}>
                    <h3 style={styles.cardTitle}>
                      {poll.question}
                      <span style={{ ...styles.badge, ...(poll.active ? styles.badgeActive : styles.badgeInactive) }}>
                        {poll.active ? 'Active' : 'Closed'}
                      </span>
                    </h3>
                  </div>
                  {role === 'coordinator' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{ ...styles.iconBtn, background: '#f3f4f6', padding: '0.4rem' }}
                        onClick={() => openEdit(poll)}
                        title="Edit Poll"
                      >
                        <Edit2 size={16} color="#4b5563" />
                      </button>
                      <button
                        style={{ ...styles.iconBtn, background: '#fee2e2', padding: '0.4rem' }}
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this poll?")) {
                            deletePoll(poll.id);
                          }
                        }}
                        title="Delete Poll"
                      >
                        <Trash2 size={16} color="#ef4444" />
                      </button>
                    </div>
                  )}
                </div>

                <div style={styles.optionBox}>
                  {poll.options.map((opt: any) => {
                    const percentage = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                    const canVote = poll.active && !hasVoted && role !== 'coordinator';
                    
                    return (
                      <div key={opt.id} style={styles.voteRow}>
                        <button
                          style={{
                            ...styles.voteBtn,
                            ...(!canVote ? styles.voteBtnDisabled : {}),
                            borderColor: hasVoted ? '#bfdbfe' : '#e5e7eb'
                          }}
                          onClick={() => canVote && handleVote(poll.id, opt.id)}
                          disabled={!canVote}
                        >
                          {(hasVoted || role === 'coordinator' || !poll.active) && (
                            <div style={{ ...styles.barBg, width: `${percentage}%` }} />
                          )}
                          <div style={styles.voteTextContent}>
                            <span style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {opt.text}
                            </span>
                            {(hasVoted || role === 'coordinator' || !poll.active) && (
                              <span style={styles.voteCount}>{opt.votes} votes ({percentage}%)</span>
                            )}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
                
                <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#6b7280', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total votes: {totalVotes}</span>
                  {hasVoted && <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Check size={14} /> You voted</span>}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
