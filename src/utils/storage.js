import { getTodayDateString } from './dateUtils'

export const STORAGE_KEY = 'taskflow_todos_v1'
export const THEME_KEY = 'taskflow_theme_mode'

export const CATEGORIES = [
  { id: 'work', label: 'Work', color: 'blue' },
  { id: 'personal', label: 'Personal', color: 'emerald' },
  { id: 'development', label: 'Development', color: 'violet' },
  { id: 'design', label: 'Design', color: 'pink' },
  { id: 'urgent', label: 'Urgent', color: 'amber' },
]

export const PRIORITIES = [
  { id: 'low', label: 'Low', color: 'emerald', dot: 'bg-emerald-500' },
  { id: 'medium', label: 'Medium', color: 'blue', dot: 'bg-blue-500' },
  { id: 'high', label: 'High', color: 'amber', dot: 'bg-amber-500' },
  { id: 'urgent', label: 'Urgent', color: 'rose', dot: 'bg-rose-500' },
]

export const INITIAL_TODOS = [
  {
    id: 'demo-1',
    title: 'Design high-converting Landing Page for client',
    description: 'Create responsive Figma mockups including desktop and mobile viewports with accessibility considerations.',
    completed: false,
    priority: 'high',
    category: 'Design',
    dueDate: getTodayDateString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Implement OAuth authentication & token refresh flow',
    description: 'Integrate Google & GitHub login, verify secure cookie handling and session expiry handling.',
    completed: true,
    priority: 'urgent',
    category: 'Development',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'demo-3',
    title: 'Quarterly team sprint review & retrospective notes',
    description: 'Summarize team velocity, key blockers resolved, and prepare slides for leadership demo.',
    completed: false,
    priority: 'medium',
    category: 'Work',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'demo-4',
    title: '30-minute afternoon cardio or yoga routine',
    description: 'Daily wellness session to keep energy high and prevent RSI.',
    completed: false,
    priority: 'low',
    category: 'Personal',
    dueDate: getTodayDateString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const loadStoredTodos = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TODOS))
      return INITIAL_TODOS
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : INITIAL_TODOS
  } catch (err) {
    console.error('Failed to parse todos from localStorage:', err)
    return INITIAL_TODOS
  }
}

export const saveStoredTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (err) {
    console.error('Failed to save todos to localStorage:', err)
  }
}
