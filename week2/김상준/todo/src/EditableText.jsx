import React, { useEffect, useState, useRef } from "react";

export default function EditableText({ value, onSave, done }) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => setLocal(value), [value]);
  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function save() {
    const trimmed = local.trim();
    if (!trimmed) return;
    onSave(trimmed);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex-1">
        <input
          ref={inputRef}
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") {
              setLocal(value);
              setEditing(false);
            }
          }}
          className="w-full px-2 py-1 border rounded-md focus:outline-none"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className={`text-left flex-1 ${
        done ? "line-through text-slate-400" : ""
      }`}
      aria-label={`편집 ${value}`}
    >
      {value}
    </button>
  );
}
