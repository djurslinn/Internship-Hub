export type Role = 'intern' | 'coordinator' | null;

export type TaskStatus = 'pending' | 'submitted' | 'approved' | 'revision';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  points: number;
  internshipId?: string;
}

export interface Submission {
  id: string;
  taskId: string;
  internId: string;
  submittedAt: string;
  status: TaskStatus;
  content: string;
  feedback?: string;
  awardedPoints?: number;
}

export interface Intern {
  id: string;
  name: string;
  role: 'intern';
  internship: string;
  internshipId?: string;
  skills: string[];
  points: number;
}

export interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  active: boolean;
  votedBy: string[]; // intern ids
}

export interface Discussion {
  id: string;
  authorId: string; // intern or coordinator id
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
  replies: {
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    createdAt: string;
  }[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface InternAchievement {
  internId: string;
  achievementId: string;
  unlockedAt: string;
}
export interface Internship {
  id: string;
  title: string;
  description: string;
  registrationLink: string;
}
