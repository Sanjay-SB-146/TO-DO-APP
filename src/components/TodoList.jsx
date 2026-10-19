import React from 'react'
import { Sparkles, FilterX } from 'lucide-react'
import { TodoItem } from './TodoItem'

export function TodoList({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
  onResetFilters,
  totalTasksCount,
}) {
  // Empty State 1: No tasks in system at all
  if (totalTasksCount === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 my-6 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
          You're all clear!
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          No tasks left on your list. Use the input field above to plan your next milestone.
        </p>
      </div>
    )
  }

  // Empty State 2: Filters matched no tasks
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 my-6 animate-fade-in">
        <div className="w-14 h-14 mx-auto mb-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center">
          <FilterX className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
          No matching tasks found
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-xs mx-auto">
          Try adjusting your search query, status, priority, or category filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        )}
      </div>
    )
  }

  // Render list of items
  return (
    <div className="space-y-2.5 my-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
