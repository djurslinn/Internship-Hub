import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { MessageSquare, Plus, ChevronDown, ChevronUp, Send, User, Clock, Trash2 } from 'lucide-react';

export default function Discussions() {
  const { role, currentUser, discussions, addDiscussion, addReply, deleteDiscussion } = useStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newDiscussion = {
      id: Date.now().toString(),
      authorId: role === 'coordinator' ? 'coordinator' : currentUser?.id || 'unknown',
      authorName: role === 'coordinator' ? 'Coordinator' : currentUser?.name || 'Unknown',
      title: newTitle,
      content: newContent,
      createdAt: new Date().toISOString(),
      replies: []
    };

    addDiscussion(newDiscussion);
    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  const handleReply = (discussionId: string, e: React.FormEvent) => {
    e.preventDefault();
    const content = replyInputs[discussionId];
    if (!content?.trim()) return;

    const newReply = {
      id: Date.now().toString(),
      authorId: role === 'coordinator' ? 'coordinator' : currentUser?.id || 'unknown',
      authorName: role === 'coordinator' ? 'Coordinator' : currentUser?.name || 'Unknown',
      content,
      createdAt: new Date().toISOString(),
    };

    addReply(discussionId, newReply);
    setReplyInputs({ ...replyInputs, [discussionId]: '' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, color: '#111827' }}>
          <MessageSquare size={28} color="#3b82f6" />
          Discussions
        </h1>
        {role === 'coordinator' && (
          <button
            onClick={() => setIsCreating(!isCreating)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px',
              borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '500'
            }}
          >
            <Plus size={18} />
            {isCreating ? 'Cancel' : 'Create Discussion'}
          </button>
        )}
      </div>

      {isCreating && role === 'coordinator' && (
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '18px', marginTop: 0, marginBottom: '16px', color: '#111827' }}>Start a New Discussion</h2>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text"
              placeholder="Discussion Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px' }}
              required
            />
            <textarea
              placeholder="What would you like to discuss?"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', minHeight: '100px', resize: 'vertical' }}
              required
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#10b981', color: 'white', padding: '10px 16px',
                borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '500',
                alignSelf: 'flex-start'
              }}
            >
              Post Discussion
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {(discussions || []).length > 0 ? (
          (discussions || []).map(discussion => (
            <div key={discussion.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div
                onClick={() => setExpandedId(expandedId === discussion.id ? null : discussion.id)}
                style={{ padding: '16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#111827', flex: 1 }}>{discussion.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {role === 'coordinator' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm("Are you sure you want to delete this discussion?")) {
                            deleteDiscussion(discussion.id);
                          }
                        }}
                        style={{ background: '#fee2e2', border: 'none', borderRadius: '4px', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        title="Delete Discussion"
                      >
                        <Trash2 size={16} color="#ef4444" />
                      </button>
                    )}
                    {expandedId === discussion.id ? <ChevronUp size={20} color="#6b7280" /> : <ChevronDown size={20} color="#6b7280" />}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#6b7280', alignItems: 'center' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={14} /> {discussion.authorName}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {formatDate(discussion.createdAt)}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3b82f6' }}>
                    <MessageSquare size={14} /> {(discussion.replies || []).length} replies
                  </span>
                </div>
              </div>

              {expandedId === discussion.id && (
                <div style={{ borderTop: '1px solid #e5e7eb', padding: '16px', backgroundColor: '#f9fafb' }}>
                  <p style={{ margin: '0 0 20px 0', color: '#374151', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                    {discussion.content}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Replies</h4>
                    {discussion.replies && discussion.replies.length > 0 ? (
                      discussion.replies.map(reply => (
                        <div key={reply.id} style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px', color: '#6b7280' }}>
                            <span style={{ fontWeight: '600', color: '#111827' }}>{reply.authorName}</span>
                            <span>{formatDate(reply.createdAt)}</span>
                          </div>
                          <p style={{ margin: 0, color: '#374151', fontSize: '14px' }}>{reply.content}</p>
                        </div>
                      ))
                    ) : (
                      <p style={{ margin: 0, fontSize: '14px', color: '#6b7280', fontStyle: 'italic' }}>No replies yet.</p>
                    )}
                  </div>

                  <form onSubmit={(e) => handleReply(discussion.id, e)} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder={role === 'coordinator' ? "Write a reply..." : "Share your thoughts..."}
                      value={replyInputs[discussion.id] || ''}
                      onChange={(e) => setReplyInputs({ ...replyInputs, [discussion.id]: e.target.value })}
                      style={{ flex: 1, padding: '10px 12px', borderRadius: '20px', border: '1px solid #d1d5db', fontSize: '14px' }}
                    />
                    <button
                      type="submit"
                      disabled={!replyInputs[discussion.id]?.trim()}
                      style={{
                        backgroundColor: replyInputs[discussion.id]?.trim() ? '#3b82f6' : '#9ca3af',
                        color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: replyInputs[discussion.id]?.trim() ? 'pointer' : 'default'
                      }}
                    >
                      <Send size={18} style={{ transform: 'translateX(-1px) translateY(1px)' }} />
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db' }}>
            <MessageSquare size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <p style={{ margin: 0 }}>No discussions yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
