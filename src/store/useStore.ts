import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role, Intern, Task, Submission, Poll, Discussion, Announcement, Achievement, Internship } from '../types';
import { mockInterns, mockTasks, mockSubmissions, mockPolls, mockDiscussions, mockAnnouncements, mockAchievements } from '../data/mockData';

export const mockInternships: Internship[] = [
  { id: 'int1', title: 'Web Development', description: 'Develop web applications using modern technologies', registrationLink: 'https://example.com/reg/web' },

];

interface AppState {
  role: Role;
  currentUser: Intern | null; // null if coordinator
  internships: Internship[];
  interns: Intern[];
  tasks: Task[];
  submissions: Submission[];
  polls: Poll[];
  discussions: Discussion[];
  announcements: Announcement[];
  achievements: Achievement[];

  setRole: (role: Role) => void;
  setCurrentUser: (user: Intern | null) => void;

  // Internships
  addInternship: (internship: Internship) => void;
  updateInternship: (internship: Internship) => void;
  deleteInternship: (id: string) => void;

  // Tasks
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;

  // Submissions
  addSubmission: (submission: Submission) => void;
  updateSubmission: (submission: Submission) => void;

  // Polls
  addPoll: (poll: Poll) => void;
  deletePoll: (id: string) => void;
  votePoll: (pollId: string, optionId: string, internId: string) => void;

  // Discussions
  addDiscussion: (discussion: Discussion) => void;
  deleteDiscussion: (id: string) => void;
  addReply: (discussionId: string, reply: any) => void;

  // Announcements
  // Announcements
  addAnnouncement: (ann: Announcement) => void;
  deleteAnnouncement: (id: string) => void;

  // Demo Reset
  resetDemoData: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      role: null,
      currentUser: null,
      internships: mockInternships,
      interns: mockInterns,
      tasks: mockTasks,
      submissions: mockSubmissions,
      polls: mockPolls,
      discussions: mockDiscussions,
      announcements: mockAnnouncements,
      achievements: mockAchievements,

      setRole: (role) => set({ role }),
      setCurrentUser: (user) => set({ currentUser: user }),

      addInternship: (internship) => set((state) => ({ internships: [...state.internships, internship] })),
      updateInternship: (internship) => set((state) => ({ internships: state.internships.map(i => i.id === internship.id ? internship : i) })),
      deleteInternship: (id) => set((state) => ({ internships: state.internships.filter(i => i.id !== id) })),

      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (task) => set((state) => ({ tasks: state.tasks.map(t => t.id === task.id ? task : t) })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter(t => t.id !== id) })),

      addSubmission: (submission) => set((state) => ({ submissions: [...state.submissions, submission] })),
      updateSubmission: (submission) => set((state) => {
        let interns = [...state.interns];

        // If it was just approved, we need to add points
        const oldSub = state.submissions.find(s => s.id === submission.id);
        if (oldSub && oldSub.status !== 'approved' && submission.status === 'approved') {
          const task = state.tasks.find(t => t.id === submission.taskId);
          if (task) {
            const pointsToAdd = submission.awardedPoints !== undefined ? submission.awardedPoints : task.points;
            interns = interns.map(i => i.id === submission.internId ? { ...i, points: i.points + pointsToAdd } : i);
          }
        }

        return {
          submissions: state.submissions.map(s => s.id === submission.id ? submission : s),
          interns
        };
      }),

      addPoll: (poll) => set((state) => ({ polls: [...state.polls, poll] })),
      deletePoll: (id: string) => set((state) => ({ polls: state.polls.filter(p => p.id !== id) })),
      votePoll: (pollId, optionId, internId) => set((state) => {
        const polls = state.polls.map(p => {
          if (p.id === pollId) {
            const options = p.options.map(o => o.id === optionId ? { ...o, votes: o.votes + 1 } : o);
            return { ...p, options, votedBy: [...p.votedBy, internId] };
          }
          return p;
        });
        return { polls };
      }),

      addDiscussion: (discussion) => set((state) => ({ discussions: [...state.discussions, discussion] })),
      deleteDiscussion: (id: string) => set((state) => ({ discussions: state.discussions.filter(d => d.id !== id) })),
      addReply: (discussionId, reply) => set((state) => {
        const discussions = state.discussions.map(d => {
          if (d.id === discussionId) {
            return { ...d, replies: [...d.replies, reply] };
          }
          return d;
        });
        return { discussions };
      }),

      addAnnouncement: (ann) => set((state) => ({ announcements: [...state.announcements, ann] })),
      deleteAnnouncement: (id) => set((state) => ({ announcements: state.announcements.filter(a => a.id !== id) })),

      resetDemoData: () => {
        if (window.confirm("Warning: You are about to exit the demo and reset all demo data. Any changes made will be lost. Are you sure?")) {
          set({
            internships: mockInternships,
            interns: mockInterns,
            tasks: mockTasks,
            submissions: mockSubmissions,
            polls: mockPolls,
            discussions: mockDiscussions,
            announcements: mockAnnouncements,
            achievements: mockAchievements,
            role: null,
            currentUser: null,
          });
          window.location.href = '/';
        }
      }
    }),
    {
      name: 'internhub-storage',
    }
  )
);
