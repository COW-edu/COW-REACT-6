// src/EditableText.jsx
import React, { useState } from "react";

export default function EditableText({ value, done, onSave }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  function handleBlur() {
    if (typeof onSave === "function") {
      if (text.trim() && text !== value) {
        onSave(text);
      }
    }
    setEditing(false);
  }

  return editing ? (
    <input
      autoFocus
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleBlur();
      }}
      className="flex-1 px-2 py-1 border-b focus:outline-none"
    />
  ) : (
    <span
      onClick={() => setEditing(true)}
      className={`flex-1 cursor-pointer ${
        done ? "line-through text-gray-400" : ""
      }`}
    >
      {value}
    </span>
  );
}
