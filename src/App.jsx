import React, { useState } from 'react'
import { Header } from './components/Header'
import { StatsOverview } from './components/StatsOverview'
import { TodoInput } from './components/TodoInput'
import { FilterBar } from './components/FilterBar'
import { TodoList } from './components/TodoList'
import { EditTodoModal } from './components/EditTodoModal'
import { DeleteConfirmModal } from './components/DeleteConfirmModal'
import { Toast } from './components/Toast'
import { useTodos } from './hooks/useTodos'
import { useTheme } from './hooks/useTheme'
import { CheckCircle2 } from 'lucide-react'

export function App() {
  const { theme, toggleTheme } = useTheme()
  const {
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
  } = useTodos()

  const [editingTodo, setEditingTodo] = useState(null)
  const [deletingTodo, setDeletingTodo] = useState(null)
  const [toast, setToast] = useState(null)
  const [lastDeletedTodo, setLastDeletedTodo] = useState(null)

  const showToast = (message, type = 'info', action = false) => {
    setToast({ message, type, action })
  }

  // Handle Add Todo
  const handleAddTodo = (todoData) => {
    const created = addTodo(todoData)
    if (created) {
      showToast(`Task "${created.title}" added successfully`, 'success')
    }
  }

  // Handle Edit Todo Save
  const handleSaveEdit = (id, updates) => {
    updateTodo(id, updates)
    showToast('Task updated successfully', 'success')
  }

  // Handle Request to Delete
  const handleRequestDelete = (id) => {
    const target = todos.find((t) => t.id === id)
    if (target) {
      setDeletingTodo(target)
    }
  }

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deletingTodo) return
    const deleted = deleteTodo(deletingTodo.id)
    setLastDeletedTodo(deleted)
    setDeletingTodo(null)
    showToast(`Task "${deleted.title}" deleted`, 'warning', true)
  }

  // Undo Delete
  const handleUndoDelete = () => {
    if (lastDeletedTodo) {
      restoreTodo(lastDeletedTodo)
      showToast(`Restored "${lastDeletedTodo.title}"`, 'success')
      setLastDeletedTodo(null)
    }
  }

  // Clear Completed Tasks
  const handleClearCompleted = () => {
    const completedCount = stats.completed
    clearCompleted()
    showToast(`Cleared ${completedCount} completed task(s)`, 'info')
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setStatusFilter('all')
    setCategoryFilter('all')
    setPriorityFilter('all')
    setSortBy('created-desc')
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Navigation Bar */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        stats={stats}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Welcome banner */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Work & Productivity Dashboard
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Organize priorities, meet deadlines, and streamline daily milestones.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Local Storage Synced
            </span>
          </div>
        </div>

        {/* Dashboard Statistics Overview */}
        <StatsOverview stats={stats} />

        {/* Quick Add Task Input */}
        <div className="mb-6">
          <TodoInput onAddTodo={handleAddTodo} />
        </div>

        {/* Filter, Sort & Action Bar */}
        <FilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          stats={stats}
          onClearCompleted={handleClearCompleted}
        />

        {/* Task List */}
        <TodoList
          todos={filteredTodos}
          onToggleComplete={toggleComplete}
          onEdit={(todo) => setEditingTodo(todo)}
          onDelete={handleRequestDelete}
          onResetFilters={handleResetFilters}
          totalTasksCount={todos.length}
        />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold text-slate-600 dark:text-slate-400">TaskFlow Pro</span>
            <span>• Industry-Grade To-Do Architecture</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-slate-700 dark:text-slate-300">/</kbd> to search</span>
            <span>All data saved locally</span>
          </div>
        </div>
      </footer>

      {/* Edit Modal */}
      <EditTodoModal
        isOpen={Boolean(editingTodo)}
        todo={editingTodo}
        onClose={() => setEditingTodo(null)}
        onSave={handleSaveEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingTodo)}
        todoTitle={deletingTodo?.title || ''}
        onClose={() => setDeletingTodo(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Notification Toast */}
      <Toast
        toast={toast}
        onDismiss={() => setToast(null)}
        onUndo={handleUndoDelete}
      />
    </div>
  )
}

export default App
