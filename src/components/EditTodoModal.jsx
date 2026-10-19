import React, { useState, useEffect } from 'react'
import {
  X,
  Calendar,
  Flag,
  Tag,
  CheckCircle2,
  Clock,
  Save,
} from 'lucide-react'
import { CATEGORIES, PRIORITIES } from '../utils/storage'

function EditTodoForm({ todo, onClose, onSave }) {
  const [title, setTitle] = useState(todo.title || '')
  const [description, setDescription] = useState(todo.description || '')
  const [dueDate, setDueDate] = useState(todo.dueDate || '')
  const [priority, setPriority] = useState(todo.priority || 'medium')
  const [category, setCategory] = useState(todo.category || 'Work')
  const [completed, setCompleted] = useState(Boolean(todo.completed))
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Task title cannot be empty')
      return
    }

    onSave(todo.id, {
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      category,
      completed,
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      {/* Status Toggle Switch */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
        <div className="flex items-center gap-2">
          {completed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <Clock className="w-5 h-5 text-amber-500" />
          )}
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Status: {completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setCompleted(!completed)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            completed
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300'
          }`}
        >
          Toggle to {completed ? 'Pending' : 'Completed'}
        </button>
      </div>

      {/* Title Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Task Title <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (error) setError('')
          }}
          className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
        />
        {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
      </div>

      {/* Description Textarea */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Description / Notes
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Add extra context or steps..."
          className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 resize-none transition-all"
        />
      </div>

      {/* Grid: Due Date, Priority, Category */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Due Date */}
        <div>
          <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            <span>Due Date</span>
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <Flag className="w-3.5 h-3.5 text-amber-500" />
            <span>Priority</span>
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 capitalize"
          >
            {PRIORITIES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            <Tag className="w-3.5 h-3.5 text-pink-500" />
            <span>Category</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.label}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  )
}

export function EditTodoModal({
  isOpen,
  todo,
  onClose,
  onSave,
}) {
  // Handle escape key & document scroll locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !todo) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
              Edit Task
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Update task parameters and status
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inner Form with key for clean state initialization */}
        <EditTodoForm
          key={todo.id}
          todo={todo}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  )
}
