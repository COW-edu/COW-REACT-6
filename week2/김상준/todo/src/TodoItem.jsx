import React from "react";
import EditableText from "./EditableText";

export default function TodoItem({ todo, onToggle, onRemove, onEdit }) {
  return (
    <li className="flex items-center gap-3 p-3 border rounded-lg">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`완료 체크: ${todo.text}`}
      />

      <EditableText
        value={todo.text}
        onSave={(newText) => onEdit(todo.id, newText)}
        done={todo.done}
      />

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => onRemove(todo.id)}
          className="text-sm px-3 py-1 rounded-md bg-red-50 text-red-700"
          aria-label={`삭제 ${todo.text}`}
        >
          삭제
        </button>
      </div>
    </li>
  );
}
