import { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { 
  Users, 
  CheckCircle, 
  Award, 
  Search, 
  Filter, 
  Check, 
  X, 
  ChevronUp, 
  ChevronDown,
  BookOpen
} from 'lucide-react';

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

export default function Analytics() {
  const { interns, tasks, submissions, internships, polls, discussions } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  // Generate all intern-task combinations
  const allCombinations = useMemo(() => {
    const combos = [];
    for (const intern of interns) {
      // Find tasks for this intern's internship
      const internTasks = tasks.filter(t => t.internshipId === intern.internshipId);
      for (const task of internTasks) {
        const submission = submissions.find(s => s.taskId === task.id && s.internId === intern.id);
        
        let status = 'Not Started';
        if (submission) {
          if (submission.status === 'approved') status = 'Approved';
          else if (submission.status === 'pending') status = 'Submitted';
          else if (submission.status === 'revision') status = 'Revision';
          else status = submission.status; // Fallback
        }

        combos.push({
          id: `${intern.id}-${task.id}`,
          internId: intern.id,
          studentName: intern.name,
          program: intern.internship || internships.find(i => i.id === intern.internshipId)?.title || 'Unknown',
          taskName: task.title,
          points: task.points,
          status,
          completed: status === 'Approved'
        });
      }
    }
    return combos;
  }, [interns, tasks, submissions, internships]);

  // Overall Stats
  const totalInterns = interns.length;
  const totalPossibleTasks = allCombinations.length;
  const approvedTasks = allCombinations.filter(c => c.completed).length;
  const overallCompletionRate = totalPossibleTasks > 0 ? Math.round((approvedTasks / totalPossibleTasks) * 100) : 0;
  const totalPointsAwarded = allCombinations.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0);

  // Per-Student Summary
  const studentSummaries = useMemo(() => {
    return interns.map(intern => {
      const internCombos = allCombinations.filter(c => c.internId === intern.id);
      const totalAssigned = internCombos.length;
      const completed = internCombos.filter(c => c.completed).length;
      const points = internCombos.filter(c => c.completed).reduce((sum, c) => sum + c.points, 0);
      const completionRate = totalAssigned > 0 ? Math.round((completed / totalAssigned) * 100) : 0;
      
      const pollsVoted = polls.filter(p => p.votedBy.includes(intern.id)).length;
      const discussionsStarted = discussions.filter(d => d.authorId === intern.id).length;
      const discussionReplies = discussions.reduce((sum, d) => sum + d.replies.filter(r => r.authorId === intern.id).length, 0);
      
      let overallStatus = 'At Risk';
      if (completionRate === 0 && totalAssigned === 0) overallStatus = 'No Tasks';
      else if (completionRate >= 80) overallStatus = 'On Track';
      else if (completionRate >= 50) overallStatus = 'In Progress';

      return {
        ...intern,
        totalAssigned,
        completed,
        points,
        completionRate,
        pollsVoted,
        discussionsStarted,
        discussionReplies,
        overallStatus,
        programName: intern.internship || internships.find(i => i.id === intern.internshipId)?.title || 'Unknown'
      };
    });
  }, [interns, allCombinations, polls, discussions, internships]);

  // Filtering
  const filteredCombinations = useMemo(() => {
    return allCombinations.filter(combo => {
      const matchesSearch = combo.studentName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProgram = programFilter ? combo.program === programFilter : true;
      const matchesStatus = statusFilter ? combo.status === statusFilter : true;
      return matchesSearch && matchesProgram && matchesStatus;
    });
  }, [allCombinations, searchTerm, programFilter, statusFilter]);

  // Sorting
  const sortedCombinations = useMemo(() => {
    let sortable = [...filteredCombinations];
    if (sortConfig !== null) {
      sortable.sort((a, b) => {
        let aValue: any = a[sortConfig.key as keyof typeof a];
        let bValue: any = b[sortConfig.key as keyof typeof b];
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [filteredCombinations, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} style={{ marginLeft: 4 }} /> : <ChevronDown size={14} style={{ marginLeft: 4 }} />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return { bg: '#dcfce7', text: '#166534' }; // green
      case 'Submitted': return { bg: '#dbeafe', text: '#1e40af' }; // blue
      case 'Revision': return { bg: '#ffedd5', text: '#9a3412' }; // orange
      default: return { bg: '#f3f4f6', text: '#374151' }; // gray
    }
  };

  const uniquePrograms = Array.from(new Set(allCombinations.map(c => c.program)));
  const uniqueStatuses = Array.from(new Set(allCombinations.map(c => c.status)));

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>Analytics Dashboard</h1>
        <p style={{ color: '#6b7280', margin: 0 }}>Comprehensive overview of all intern progress and task completions.</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#eff6ff', padding: '12px', borderRadius: '12px', marginRight: '16px' }}>
            <Users size={24} color="#3b82f6" />
          </div>
          <div>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>Total Interns</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{totalInterns}</p>
          </div>
        </div>
        
        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#f3e8ff', padding: '12px', borderRadius: '12px', marginRight: '16px' }}>
            <BookOpen size={24} color="#a855f7" />
          </div>
          <div>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>Total Tasks</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{totalPossibleTasks}</p>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#dcfce7', padding: '12px', borderRadius: '12px', marginRight: '16px' }}>
            <CheckCircle size={24} color="#22c55e" />
          </div>
          <div>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>Completion Rate</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{overallCompletionRate}%</p>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fef3c7', padding: '12px', borderRadius: '12px', marginRight: '16px' }}>
            <Award size={24} color="#f59e0b" />
          </div>
          <div>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>Total Points Awarded</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{totalPointsAwarded}</p>
          </div>
        </div>
      </div>

      {/* Detailed Table Section */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '32px' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>Detailed Student-Task Breakdown</h2>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
              <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search by student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 10px 10px 38px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Filter size={18} color="#6b7280" />
              <select 
                value={programFilter} 
                onChange={(e) => setProgramFilter(e.target.value)}
                style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', backgroundColor: 'white' }}
              >
                <option value="">All Programs</option>
                {uniquePrograms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', backgroundColor: 'white' }}
              >
                <option value="">All Statuses</option>
                {uniqueStatuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                {['studentName', 'program', 'taskName', 'points', 'status', 'completed'].map((key) => (
                  <th 
                    key={key}
                    onClick={() => requestSort(key)}
                    style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', cursor: 'pointer', userSelect: 'none' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {key === 'studentName' ? 'Student Name' : 
                       key === 'program' ? 'Internship Program' : 
                       key === 'taskName' ? 'Task Name' : 
                       key === 'points' ? 'Points' : 
                       key === 'status' ? 'Status' : 'Completed'}
                      {getSortIcon(key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedCombinations.length > 0 ? (
                sortedCombinations.map((combo, index) => {
                  const statusStyle = getStatusColor(combo.status);
                  return (
                    <tr key={combo.id} style={{ borderTop: '1px solid #e5e7eb', backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                      <td style={{ padding: '16px 20px', fontSize: '14px', color: '#111827', fontWeight: '500' }}>{combo.studentName}</td>
                      <td style={{ padding: '16px 20px', fontSize: '14px', color: '#4b5563' }}>{combo.program}</td>
                      <td style={{ padding: '16px 20px', fontSize: '14px', color: '#4b5563', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{combo.taskName}</td>
                      <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '600', color: combo.completed ? '#166534' : '#4b5563' }}>
                        {combo.points}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ 
                          backgroundColor: statusStyle.bg, 
                          color: statusStyle.text, 
                          padding: '4px 10px', 
                          borderRadius: '9999px', 
                          fontSize: '12px', 
                          fontWeight: '600' 
                        }}>
                          {combo.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        {combo.completed ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', backgroundColor: '#dcfce7', borderRadius: '50%' }}>
                            <Check size={16} color="#166534" />
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', backgroundColor: '#f3f4f6', borderRadius: '50%' }}>
                            <X size={16} color="#9ca3af" />
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                    No results found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intern Activity Overview Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: '32px' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>Intern Activity Overview</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Intern Name</th>
                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Program</th>
                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Tasks</th>
                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Polls</th>
                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Discussions</th>
                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Points</th>
                <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentSummaries.map((student, index) => {
                let statusColor = '#374151';
                let statusBg = '#f3f4f6';
                if (student.overallStatus === 'On Track') { statusColor = '#166534'; statusBg = '#dcfce7'; }
                else if (student.overallStatus === 'In Progress') { statusColor = '#1e40af'; statusBg = '#dbeafe'; }
                else if (student.overallStatus === 'At Risk') { statusColor = '#9a3412'; statusBg = '#ffedd5'; }

                return (
                  <tr key={student.id} style={{ borderTop: '1px solid #e5e7eb', backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#111827', fontWeight: '500' }}>{student.name}</td>
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#4b5563' }}>{student.programName}</td>
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#4b5563' }}>{student.completed} / {student.totalAssigned}</td>
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#4b5563' }}>{student.pollsVoted} voted</td>
                    <td style={{ padding: '16px 20px', fontSize: '14px', color: '#4b5563' }}>{student.discussionsStarted} topics / {student.discussionReplies} replies</td>
                    <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '600', color: '#d97706' }}>{student.points} pts</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ 
                        backgroundColor: statusBg, 
                        color: statusColor, 
                        padding: '4px 10px', 
                        borderRadius: '9999px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        whiteSpace: 'nowrap'
                      }}>
                        {student.overallStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
