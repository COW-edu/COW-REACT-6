import React from 'react';

export default function TodoItem({
  item,
  isDone,
  onToggle,
  onDelete,
  onImportant,
}) {
  return (
    <li
      className={`flex justify-between items-center p-3 bg-[#f8f9fa] rounded-xl dark:bg-[#2c2c2c] ${
        isDone ? 'opacity-70' : ''
      }`}
    >
      <label
        className={`flex items-center gap-2 cursor-pointer select-none ${
          isDone
            ? 'text-[#868e96] line-through'
            : 'text-[#212529] dark:text-white'
        }`}
      >
        <span className="text-base">
          {item.text} {item.category && `[${item.category}]`}
        </span>
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onImportant();
          }}
          className={`text-lg cursor-pointer hover:text-[#f59f00] dark:bg-transparent ${
            item.isImportant ? 'text-[#fab005]' : 'text-[#fab005]'
          }`}
        >
          {item.isImportant ? '⭐' : '☆'}
        </button>
        <input
          type="checkbox"
          checked={isDone}
          onChange={onToggle}
          className="cursor-pointer w-4 h-4"
        />
        <button
          onClick={onDelete}
          className="text-lg text-[#e03131] hover:text-[#c92a2a] bg-transparent dark:bg-transparent"
        >
          ⛔
        </button>
      </div>
    </li>
  );
}
