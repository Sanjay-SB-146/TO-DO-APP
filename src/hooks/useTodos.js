import { useState, useEffect, useMemo, useCallback } from 'react'
import confetti from 'canvas-confetti'
import { loadStoredTodos, saveStoredTodos } from '../utils/storage'
import { isOverdue } from '../utils/dateUtils'

const PRIORITY_WEIGHTS = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
}

export function useTodos() {
  const [todos, setTodos] = useState(() => loadStoredTodos())
  const [statusFilter, setStatusFilter] = useState('all') // 'all' | 'pending' | 'completed'
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('created-desc') // 'created-desc' | 'dueDate-asc' | 'priority-desc' | 'alpha-asc'

  // Persist to localStorage whenever todos change
  useEffect(() => {
    saveStoredTodos(todos)
  }, [todos])

  // Fire celebratory confetti on milestone completion or task completion
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#22c55e'],
      })
    } catch {
      // safe fallback if canvas is unavailable
    }
  }, [])

  // Action: Add new task
  const addTodo = useCallback(({ title, description = '', dueDate = '', priority = 'medium', category = 'Personal' }) => {
    if (!title || !title.trim()) return null
    const newTodo = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: title.trim(),
      description: description.trim(),
      completed: false,
      dueDate: dueDate || '',
      priority: priority || 'medium',
      category: category || 'Personal',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTodos((prev) => [newTodo, ...prev])
    return newTodo
  }, [])

  // Action: Update existing task
  const updateTodo = useCallback((id, updates) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
        }
        return todo
      })
    )
  }, [])

  // Action: Toggle completion status
  const toggleComplete = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const nextCompleted = !todo.completed
          if (nextCompleted) {
            triggerConfetti()
          }
          return {
            ...todo,
            completed: nextCompleted,
            updatedAt: new Date().toISOString(),
          }
        }
        return todo
      })
    )
  }, [triggerConfetti])

  // Action: Delete task
  const deleteTodo = useCallback((id) => {
    const deleted = todos.find((t) => t.id === id)
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    return deleted
  }, [todos])

  // Action: Restore task (undo)
  const restoreTodo = useCallback((todo) => {
    if (!todo || !todo.id) return
    setTodos((prev) => [todo, ...prev])
  }, [])

  // Action: Clear all completed tasks
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }, [])

  // Computed metrics
  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((t) => t.completed).length
    const pending = total - completed
    const overdue = todos.filter((t) => isOverdue(t.dueDate, t.completed)).length
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0

    return {
      total,
      completed,
      pending,
      overdue,
      completionPercentage,
    }
  }, [todos])

  // Filtered and Sorted todos
  const filteredTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        // Status filter
        if (statusFilter === 'pending' && todo.completed) return false
        if (statusFilter === 'completed' && !todo.completed) return false

        // Category filter
        if (categoryFilter !== 'all' && todo.category?.toLowerCase() !== categoryFilter.toLowerCase()) {
          return false
        }

        // Priority filter
        if (priorityFilter !== 'all' && todo.priority !== priorityFilter) {
          return false
        }

        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim()
          const matchTitle = todo.title.toLowerCase().includes(query)
          const matchDesc = todo.description?.toLowerCase().includes(query)
          const matchCategory = todo.category?.toLowerCase().includes(query)
          if (!matchTitle && !matchDesc && !matchCategory) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'dueDate-asc': {
            if (!a.dueDate) return 1
            if (!b.dueDate) return -1
            return a.dueDate.localeCompare(b.dueDate)
          }
          case 'dueDate-desc': {
            if (!a.dueDate) return 1
            if (!b.dueDate) return -1
            return b.dueDate.localeCompare(a.dueDate)
          }
          case 'priority-desc': {
            const weightA = PRIORITY_WEIGHTS[a.priority] || 1
            const weightB = PRIORITY_WEIGHTS[b.priority] || 1
            return weightB - weightA
          }
          case 'priority-asc': {
            const weightA = PRIORITY_WEIGHTS[a.priority] || 1
            const weightB = PRIORITY_WEIGHTS[b.priority] || 1
            return weightA - weightB
          }
          case 'alpha-asc': {
            return a.title.localeCompare(b.title)
          }
          case 'created-asc': {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          }
          case 'created-desc':
          default: {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          }
        }
      })
  }, [todos, statusFilter, categoryFilter, priorityFilter, searchQuery, sortBy])

  return {
    todos,
    filteredTodos,
    stats,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    priorityFilter,
    setPriorityFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    addTodo,
    updateTodo,
    toggleComplete,
    deleteTodo,
    restoreTodo,
    clearCompleted,
  }
}
