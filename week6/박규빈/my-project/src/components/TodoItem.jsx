import React from 'react';

function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
  const itemClasses = `
    flex items-center gap-3 px-1 py-4 border-b border-gray-200 text-lg
    last:border-b-0
  `;

  const checkboxClasses = `
    w-6 h-6 border-2 rounded-md cursor-pointer relative flex-shrink-0
    flex items-center justify-center text-white text-lg
    ${todo.completed ? 'bg-teal-500 border-teal-500' : 'border-gray-300'}
  `;

  const textClasses = `
    ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}
  `;

  return (
    <li className={itemClasses}>
      <span className={checkboxClasses} onClick={() => onToggleTodo(todo.id)}>
        {todo.completed && '✔'}
      </span>
      <div className="flex-grow text-left flex flex-col gap-1">
        <span className={textClasses}>{todo.text}</span>
        <span className="text-sm text-gray-500">{todo.createdAt}</span>
      </div>
      <button
        onClick={() => onDeleteTodo(todo.id)}
        className="bg-red-500 text-white px-2.5 py-1.5 rounded-md cursor-pointer text-xs font-bold transition hover:bg-red-600 ml-auto"
      >
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
