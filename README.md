# 🎓 InternHub — Internship Management Platform

A full-featured **demo internship management platform** built with React, TypeScript, Vite, Zustand, and Tailwind CSS.  
Deploy it anywhere — no backend, no database. All data lives in the browser's localStorage and resets when the user exits the demo.

---

## ✨ Features

### Coordinator Dashboard
- 📋 **Task Management** — Create, edit, delete tasks with priority, points and program assignment
- 👥 **Intern Management** — View all 10 sample interns with their progress
- ✅ **Submission Reviews** — Accept or reject submissions, award custom points, add feedback
- 📊 **Analytics** — Per-intern breakdown of tasks, polls, discussions, points and overall status
- 📣 **Announcements** — Create, edit, delete announcements visible to all interns
- 💬 **Discussions** — Post topics, delete threads
- 📊 **Polls** — Create, edit, delete polls; interns vote live
- 🏆 **Leaderboard** — Overall and per-task rankings
- 🎖️ **Achievements** — View and manage achievement badges

### Intern Dashboard
- 📝 **My Tasks** — View assigned tasks, submit work links
- 📈 **Progress** — Visual completion bar, points tracker, task status breakdown
- 🏆 **Leaderboard** — See your rank with "You" tag highlighted
- 🗳️ **Polls** — Vote on active polls
- 💬 **Discussions** — Start topics, reply to threads
- 📣 **Announcements** — Read coordinator updates
- 🎖️ **Achievements** — View unlocked badges
- 📜 **Certificate** — Unlock a certificate of completion when all tasks are approved
- 👤 **Profile** — View personal profile and skills

### Demo Features
- 🔄 **Role Toggle** — Switch between Coordinator ↔ Intern view instantly in the sidebar/topbar
- 💾 **Isolated Per-User Data** — Each browser tab/user gets independent localStorage — no shared state conflicts
- ⚠️ **Exit Demo** — Warning prompt before resetting all data back to defaults

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/internhub.git
cd internhub

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## 🌐 Deploy to Netlify (Free)

### Option A — Drag & Drop (Fastest)
1. Run `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually**
3. Drag and drop the `dist/` folder
4. ✅ Live in seconds!

### Option B — Connect GitHub (Auto-deploy on push)
1. Push this repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import from Git**
3. Select your repo
4. Netlify auto-detects the build settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site** ✅

> The `public/_redirects` file ensures React Router works correctly on all routes.

---

## 🗂️ Project Structure

```
src/
├── components/
│   └── layout/
│       └── DashboardLayout.tsx   # Sidebar, topbar, role toggle
├── data/
│   └── mockData.ts               # 10 sample interns + mock data
├── pages/
│   ├── LandingPage.tsx
│   ├── InternDashboard.tsx
│   ├── CoordinatorDashboard.tsx
│   ├── Submissions.tsx           # Accept/Reject + custom points
│   ├── Analytics.tsx             # Coordinator analytics table
│   ├── Progress.tsx              # Intern progress tracking
│   ├── Polls.tsx                 # Poll voting + management
│   ├── Discussions.tsx           # Thread discussions
│   ├── Announcements.tsx
│   ├── Leaderboard.tsx
│   ├── Achievements.tsx
│   ├── Certificate.tsx
│   └── Profile.tsx
├── store/
│   └── useStore.ts               # Zustand store (persisted to localStorage)
└── types/
    └── index.ts                  # TypeScript interfaces
```

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| [React 19](https://react.dev) | UI framework |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Vite](https://vitejs.dev) | Build tool |
| [Zustand](https://github.com/pmndrs/zustand) | State management + localStorage persistence |
| [React Router v7](https://reactrouter.com) | Client-side routing |
| [Lucide React](https://lucide.dev) | Icons |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility CSS |

---

## 🧪 Sample Data

The app ships with **10 pre-built interns** across 4 programs:
- Frontend Engineering (4 interns)
- Backend Engineering (2 interns)
- Data Science (2 interns)
- Design (2 interns)

All data is stored in `localStorage` — isolated per browser/tab, no server needed.

---

## 📄 License

MIT — free to use, modify and deploy.
