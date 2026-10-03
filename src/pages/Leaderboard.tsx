import { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { Trophy, Medal, Search, Filter, Calendar, CheckCircle, Award } from 'lucide-react';

export default function Leaderboard() {
  const { interns, tasks, submissions, internships, currentUser, role } = useStore();
  const [activeTab, setActiveTab] = useState<'overall' | 'tasks'>('overall');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInternship, setSelectedInternship] = useState<string>('all');

  const filteredInterns = useMemo(() => {
    return interns.filter(intern => {
      const matchesSearch = intern.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesInternship = selectedInternship === 'all' || intern.internshipId === selectedInternship;
      return matchesSearch && matchesInternship;
    });
  }, [interns, searchQuery, selectedInternship]);

  const overallLeaderboard = useMemo(() => {
    const board = filteredInterns.map(intern => {
      const internSubmissions = submissions.filter(
        s => s.internId === intern.id && s.status === 'approved'
      );
      return {
        ...intern,
        approvedTasksCount: internSubmissions.length
      };
    });
    
    return board.sort((a, b) => b.points - a.points);
  }, [filteredInterns, submissions]);

  const taskLeaderboard = useMemo(() => {
    const filteredTasks = tasks.filter(
      t => selectedInternship === 'all' || t.internshipId === selectedInternship
    );
    
    return filteredTasks.map(task => {
      const taskSubmissions = submissions
        .filter(s => s.taskId === task.id && s.status === 'approved')
        .map(sub => {
          const intern = interns.find(i => i.id === sub.internId);
          return {
            ...sub,
            internName: intern?.name || 'Unknown Intern',
            internId: intern?.id || '',
            points: task.points
          };
        })
        .filter(s => {
           if (searchQuery && !s.internName.toLowerCase().includes(searchQuery.toLowerCase())) {
             return false;
           }
           return true;
        })
        .sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());
        
      return {
        ...task,
        completions: taskSubmissions
      };
    }).filter(t => t.completions.length > 0);
  }, [tasks, submissions, interns, selectedInternship, searchQuery]);

  const getRankIcon = (index: number) => {
    switch(index) {
      case 0: return <Award size={24} color="#F59E0B" style={{ marginRight: '8px' }} />;
      case 1: return <Award size={24} color="#94A3B8" style={{ marginRight: '8px' }} />;
      case 2: return <Award size={24} color="#B45309" style={{ marginRight: '8px' }} />;
      default: return <span style={{ width: '24px', display: 'inline-block', textAlign: 'center', marginRight: '8px', fontWeight: 'bold', color: '#64748B' }}>#{index + 1}</span>;
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        .lb-overall-table th, .lb-overall-table td {
          padding: 16px;
        }
        .lb-overall-header {
          background-color: #F8FAFC;
          border-bottom: 1px solid #E2E8F0;
        }
        .lb-task-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          border-radius: 8px;
          gap: 12px;
        }
        .lb-task-right {
          display: flex;
          align-items: center;
          gap: 16px;
          color: #64748B;
          font-size: 14px;
        }
        
        @media (max-width: 768px) {
          .lb-overall-table thead {
            display: none;
          }
          .lb-overall-table tr {
            display: flex;
            flex-direction: column;
            padding: 16px;
            border-bottom: 1px solid #E2E8F0;
          }
          .lb-overall-table td {
            padding: 4px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .lb-overall-table td::before {
            content: attr(data-label);
            font-weight: 600;
            color: #475569;
            margin-right: 16px;
          }
          
          .lb-task-item {
            flex-direction: column;
            align-items: flex-start;
          }
          .lb-task-right {
            width: 100%;
            justify-content: space-between;
            margin-top: 8px;
          }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <Trophy size={32} color="#4F46E5" style={{ marginRight: '16px' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E293B', margin: 0 }}>Leaderboard</h1>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px', position: 'relative' }}>
          <Search size={20} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search interns by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ position: 'relative', minWidth: '200px' }}>
          <Filter size={20} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <select
            value={selectedInternship}
            onChange={(e) => setSelectedInternship(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none', appearance: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }}
          >
            <option value="all">All Programs</option>
            {internships.map(prog => (
              <option key={prog.id} value={prog.id}>{prog.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('overall')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'overall' ? '2px solid #4F46E5' : '2px solid transparent',
            color: activeTab === 'overall' ? '#4F46E5' : '#64748B',
            fontWeight: activeTab === 'overall' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Overall Ranking
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'tasks' ? '2px solid #4F46E5' : '2px solid transparent',
            color: activeTab === 'tasks' ? '#4F46E5' : '#64748B',
            fontWeight: activeTab === 'tasks' ? '600' : '500',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Task Leaderboard
        </button>
      </div>

      {activeTab === 'overall' && (
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table className="lb-overall-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead className="lb-overall-header">
              <tr>
                <th style={{ textAlign: 'left', color: '#475569', fontWeight: '600' }}>Rank</th>
                <th style={{ textAlign: 'left', color: '#475569', fontWeight: '600' }}>Intern</th>
                <th style={{ textAlign: 'left', color: '#475569', fontWeight: '600' }}>Program</th>
                <th style={{ textAlign: 'right', color: '#475569', fontWeight: '600' }}>Tasks Approved</th>
                <th style={{ textAlign: 'right', color: '#475569', fontWeight: '600' }}>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {overallLeaderboard.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#64748B' }}>
                    No interns found matching the criteria.
                  </td>
                </tr>
              ) : (
                overallLeaderboard.map((intern, index) => {
                  const isCurrentUser = role === 'intern' && currentUser?.id === intern.id;
                  return (
                    <tr 
                      key={intern.id} 
                      style={{ 
                        borderBottom: '1px solid #E2E8F0', 
                        backgroundColor: isCurrentUser ? '#EEF2FF' : '#fff',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <td data-label="Rank" style={{ display: 'flex', alignItems: 'center' }}>
                        {getRankIcon(index)}
                      </td>
                      <td data-label="Intern" style={{ fontWeight: '500', color: '#1E293B' }}>
                        {intern.name} {isCurrentUser && <span style={{ marginLeft: '8px', fontSize: '12px', backgroundColor: '#4F46E5', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>You</span>}
                      </td>
                      <td data-label="Program" style={{ color: '#64748B' }}>{intern.internship}</td>
                      <td data-label="Tasks Approved" style={{ textAlign: 'right', color: '#475569' }}>{intern.approvedTasksCount}</td>
                      <td data-label="Total Points" style={{ textAlign: 'right', fontWeight: 'bold', color: '#4F46E5' }}>{intern.points}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {taskLeaderboard.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', backgroundColor: '#fff', borderRadius: '12px', color: '#64748B' }}>
              No task completions found matching the criteria.
            </div>
          ) : (
            taskLeaderboard.map(task => (
              <div key={task.id} style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#1E293B' }}>{task.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#F59E0B', fontWeight: 'bold' }}>
                    <Medal size={20} style={{ marginRight: '6px' }} />
                    {task.points} pts
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {task.completions.map((completion, index) => {
                      const isCurrentUser = role === 'intern' && currentUser?.id === completion.internId;
                      return (
                        <div 
                          key={completion.id} 
                          className="lb-task-item"
                          style={{ 
                            backgroundColor: isCurrentUser ? '#EEF2FF' : (index === 0 ? '#FEF3C7' : '#F8FAFC'),
                            border: index === 0 ? '1px solid #FCD34D' : '1px solid #E2E8F0',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {index === 0 ? (
                              <Award size={20} color="#F59E0B" />
                            ) : (
                              <CheckCircle size={20} color="#10B981" />
                            )}
                            <div>
                              <div style={{ fontWeight: '600', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                {completion.internName}
                                {isCurrentUser && <span style={{ fontSize: '10px', backgroundColor: '#4F46E5', color: '#fff', padding: '2px 4px', borderRadius: '4px' }}>You</span>}
                                {index === 0 && <span style={{ fontSize: '10px', backgroundColor: '#F59E0B', color: '#fff', padding: '2px 4px', borderRadius: '4px' }}>First!</span>}
                              </div>
                            </div>
                          </div>
                          <div className="lb-task-right">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={14} />
                              {new Date(completion.submittedAt).toLocaleDateString()}
                            </div>
                            <div style={{ fontWeight: '600', color: '#4F46E5' }}>+{completion.points} pts</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
