# TaskFlow Pro ⚡

An industry-level, production-grade Task & Project Management web application built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🌟 Key Features

### Core Capabilities
- **Add New Tasks**: Fast quick-add field or rich task creation with description, priority, category, and due date.
- **Mark Completed / Pending**: Fluid checkbox toggle with celebratory confetti animation on completion.
- **Delete Tasks**: Safe deletion flow with confirmation dialog and an instant undo toast notification.
- **Edit Tasks**: Accessible modal to edit title, description, category, priority, due date, and status.
- **Task Status Badges**: Clear visual status indicators (`Completed` vs `Pending`).
- **Responsive Layout**: Designed mobile-first, adapting seamlessly from phones to ultra-wide displays.

### Bonus Features
- **Smart Task Filtering**:
  - Filter by Status: **All**, **Pending**, **Completed** (with real-time task counts).
  - Filter by **Category**: Work, Personal, Development, Design, Urgent.
  - Filter by **Priority**: Low, Medium, High, Urgent.
- **Due Date Intelligence**:
  - Visual badges for **Overdue**, **Due Today**, and **Upcoming** dates.
  - Prevent overdue tasks from going unnoticed with high-visibility warning indicators.
- **Local Storage Synchronization**:
  - Automatically persists all tasks, edits, deletions, and dark/light mode preference.
  - Pre-seeded with sample tasks on initial launch for immediate interactivity.
- **Sorting & Search**:
  - Instant fuzzy search across titles, descriptions, and categories.
  - Sort by Due Date (soonest/furthest), Priority (high/low), Date Created, or Alphabetically.
  - Keyboard shortcut: Press `/` anywhere to focus search.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🏗️ Project Architecture

```
src/
├── components/
│   ├── Header.jsx             # Top bar, branding, global search, theme toggle
│   ├── StatsOverview.jsx      # Metrics cards & completion progress bar
│   ├── TodoInput.jsx          # Quick add & expandable task creation form
│   ├── FilterBar.jsx          # Status pills, category & priority filters, sorting
│   ├── TodoItem.jsx           # Individual task card with status & action triggers
│   ├── TodoList.jsx           # List container with animated empty states
│   ├── EditTodoModal.jsx      # Dialog for editing tasks
│   ├── DeleteConfirmModal.jsx # Confirmation dialog before deletion
│   └── Toast.jsx              # Toast notification with Undo capability
├── hooks/
│   ├── useTodos.js            # Central state management, CRUD, filters, stats
│   └── useTheme.js            # Dark/Light theme manager with localStorage sync
├── utils/
│   ├── dateUtils.js           # Smart date calculations (overdue, today, format)
│   └── storage.js             # LocalStorage persistence & seed data
├── App.jsx                    # Root application layout
├── index.css                  # Tailwind CSS v4 styling & scrollbars
└── main.jsx                   # Application entrypoint
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: CSS animations + Canvas Confetti
- **Code Quality**: Oxlint (0 errors, 0 warnings)
