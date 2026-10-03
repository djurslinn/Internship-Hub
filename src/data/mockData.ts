import type { Intern, Task, Poll, Discussion, Announcement, Achievement, Submission } from '../types';

export const mockInterns: Intern[] = [
  { id: 'i1', name: 'Alex Johnson', role: 'intern', internship: 'Frontend Engineering', internshipId: 'int1', skills: ['React', 'TypeScript'], points: 150 },
  { id: 'i2', name: 'Maria Garcia', role: 'intern', internship: 'Frontend Engineering', internshipId: 'int1', skills: ['Vue', 'CSS'], points: 220 },
  { id: 'i3', name: 'James Smith', role: 'intern', internship: 'Backend Engineering', internshipId: 'int2', skills: ['Node.js', 'Python'], points: 180 },
  { id: 'i4', name: 'Linda Chen', role: 'intern', internship: 'Backend Engineering', internshipId: 'int2', skills: ['Java', 'Spring'], points: 50 },
  { id: 'i5', name: 'William Taylor', role: 'intern', internship: 'Frontend Engineering', internshipId: 'int1', skills: ['HTML', 'Tailwind'], points: 100 },
  { id: 'i6', name: 'Sophia Martinez', role: 'intern', internship: 'Data Science', internshipId: 'int3', skills: ['Python', 'Pandas'], points: 300 },
  { id: 'i7', name: 'Daniel Brown', role: 'intern', internship: 'Data Science', internshipId: 'int3', skills: ['R', 'Machine Learning'], points: 120 },
  { id: 'i8', name: 'Olivia Wilson', role: 'intern', internship: 'Design', internshipId: 'int4', skills: ['Figma', 'UI/UX'], points: 90 },
  { id: 'i9', name: 'Lucas Lee', role: 'intern', internship: 'Design', internshipId: 'int4', skills: ['Adobe XD', 'Prototyping'], points: 210 },
  { id: 'i10', name: 'Emma Thomas', role: 'intern', internship: 'Frontend Engineering', internshipId: 'int1', skills: ['React', 'Next.js'], points: 0 },
];

export const mockTasks: Task[] = [
  { id: 't1', title: 'Setup Development Environment', description: 'Install all required tools and clone the repository.', dueDate: '2023-11-01', priority: 'high', points: 50, internshipId: 'int1' },
  { id: 't2', title: 'Build Landing Page', description: 'Create a responsive landing page according to the Figma design.', dueDate: '2023-11-10', priority: 'medium', points: 100, internshipId: 'int1' },
  { id: 't3', title: 'Database Schema Design', description: 'Design the relational database schema for the new module.', dueDate: '2023-11-05', priority: 'high', points: 120, internshipId: 'int2' },
];

export const mockSubmissions: Submission[] = [
  { id: 's1', taskId: 't1', internId: 'i1', submittedAt: '2023-10-25T10:00:00Z', status: 'approved', content: 'Completed setup.' },
  { id: 's2', taskId: 't1', internId: 'i2', submittedAt: '2023-10-26T14:30:00Z', status: 'approved', content: 'Environment ready.' },
  { id: 's3', taskId: 't2', internId: 'i1', submittedAt: '2023-11-08T09:15:00Z', status: 'pending', content: 'PR #42 opened.' },
];

export const mockPolls: Poll[] = [
  {
    id: 'p1',
    question: 'What topic should we cover in the next workshop?',
    options: [
      { id: 'o1', text: 'Advanced React Patterns', votes: 2 },
      { id: 'o2', text: 'GraphQL Basics', votes: 1 },
      { id: 'o3', text: 'CI/CD Pipelines', votes: 0 }
    ],
    active: true,
    votedBy: ['i1', 'i2']
  }
];

export const mockDiscussions: Discussion[] = [
  {
    id: 'd1',
    authorId: 'i1',
    authorName: 'Alex Johnson',
    title: 'Question about the API integration',
    content: 'Are we using REST or GraphQL for the new feature?',
    createdAt: '2023-10-28T10:00:00Z',
    replies: [
      { id: 'r1', authorId: 'c1', authorName: 'Sarah Connor (Coordinator)', content: 'We will stick to REST for this milestone.', createdAt: '2023-10-28T11:00:00Z' }
    ]
  }
];

export const mockAnnouncements: Announcement[] = [
  { id: 'a1', title: 'Welcome to InternHub!', content: 'We are excited to have you all here. Please check your tasks.', createdAt: '2023-10-20T09:00:00Z' },
  { id: 'a2', title: 'Townhall Meeting', content: 'Reminder: Townhall meeting this Friday at 3 PM.', createdAt: '2023-10-25T14:00:00Z' }
];

export const mockAchievements: Achievement[] = [
  { id: 'ach1', title: 'First Task', description: 'Completed the first task.', icon: 'trophy' },
  { id: 'ach2', title: 'Task Master', description: 'Completed 5 tasks.', icon: 'star' },
  { id: 'ach3', title: 'Top Contributor', description: 'Reached 500 points.', icon: 'award' }
];
