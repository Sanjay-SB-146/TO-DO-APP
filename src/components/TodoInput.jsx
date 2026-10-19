import React, { useState } from 'react'
import {
  Plus,
  Calendar,
  Flag,
  Tag,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { PRIORITIES, CATEGORIES } from '../utils/storage'
import { getTodayDateString } from '../utils/dateUtils'

export function TodoInput({ onAddTodo }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('Work')
  const [isExpanded, setIsExpanded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setHasError(true)
      return
    }

    onAddTodo({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || '',
      priority,
      category,
    })

    // Reset fields
    setTitle('')
    setDescription('')
    setDueDate('')
    setPriority('medium')
    setCategory('Work')
    setHasError(false)
    setIsExpanded(false)
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-4 sm:p-5 transition-all duration-200">
      <form onSubmit={handleSubmit}>
        {/* Main Title Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (hasError && e.target.value.trim()) setHasError(false)
              }}
              placeholder="What needs to be accomplished today?"
              className={`w-full px-4 py-3 rounded-xl text-base bg-slate-50 dark:bg-slate-800/80 border text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:bg-white dark:focus:bg-slate-800 transition-all ${
                hasError
                  ? 'border-rose-400 ring-2 ring-rose-400/20'
                  : 'border-slate-200 dark:border-slate-700/80 focus:ring-indigo-500/30 focus:border-indigo-500'
              }`}
            />
            {hasError && (
              <p className="text-xs text-rose-500 mt-1 pl-1">
                Please enter a task title before adding.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-semibold border transition-all ${
                isExpanded || dueDate || description || priority !== 'medium'
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Add extra details (Due date, Priority, Category, Description)"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Details</span>
                </>
              )}
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 active:scale-98 transition-all duration-150 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Expandable Advanced Options Panel */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3.5 animate-fade-in">
            {/* Description textarea */}
            <div className="sm:col-span-3">
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                Task Description / Notes (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add checklist, context, subtasks, or reference links..."
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 resize-none transition-all"
              />
            </div>

            {/* Due Date Input */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>Due Date</span>
              </label>
              <input
                type="date"
                value={dueDate}
                min={getTodayDateString()}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Priority Selector */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                <Flag className="w-3.5 h-3.5 text-amber-500" />
                <span>Priority</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all capitalize"
              >
                {PRIORITIES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} Priority
                  </option>
                ))}
              </select>
            </div>

            {/* Category Selector */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                <Tag className="w-3.5 h-3.5 text-pink-500" />
                <span>Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
