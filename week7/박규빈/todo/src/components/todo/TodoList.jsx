import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({
  todos,
  dones,
  onToggle,
  onDelete,
  onImportant,
  filter,
}) {
  const filterList = (list) => {
    return list
      .filter((t) => {
        if (!filter) return true;
        if (filter === 'important-only') return t.isImportant;
        return t.category === filter;
      })
      .sort((a, b) => (b.isImportant ? 1 : 0) - (a.isImportant ? 1 : 0));
  };

  const filteredTodos = filterList(todos);
  const filteredDones = filterList(dones);

  return (
    <div>
      <ul className="space-y-2">
        {filteredTodos.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            isDone={false}
            onToggle={() => onToggle(item, false)}
            onDelete={() => onDelete(item.id, false)}
            onImportant={() => onImportant(item.id, false)}
          />
        ))}
      </ul>

      <hr className="my-6 border-none h-px bg-[#e9ecef] dark:bg-[#444]" />

      <h3 className="text-lg font-bold mb-3">완료된 일</h3>
      <ul className="space-y-2">
        {filteredDones.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            isDone={true}
            onToggle={() => onToggle(item, true)}
            onDelete={() => onDelete(item.id, true)}
            onImportant={() => onImportant(item.id, true)}
          />
        ))}
      </ul>
    </div>
  );
}
