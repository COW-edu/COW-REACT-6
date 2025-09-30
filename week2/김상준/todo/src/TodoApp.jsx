import React, { useEffect, useState } from "react";

// Simple Todo App (single-file React component)
// - Tailwind CSS utility classes used for styling (no extra imports required)
// - Default export is the component so you can drop this into a file like TodoApp.jsx
// - LocalStorage persistence, add / toggle / delete, basic accessibility

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem("todos-v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  useEffect(() => {
    try {
      localStorage.setItem("todos-v1", JSON.stringify(todos));
    } catch (e) {
      // ignore
    }
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      text: trimmed,
      done: false,
      createdAt: Date.now(),
    };
    setTodos((t) => [newTodo, ...t]);
    setText("");
  }

  function toggle(id) {
    setTodos((t) => t.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  }

  function remove(id) {
    setTodos((t) => t.filter((item) => item.id !== id));
  }

  function clearCompleted() {
    setTodos((t) => t.filter((item) => !item.done));
  }

  function editText(id, newText) {
    setTodos((t) => t.map((item) => (item.id === id ? { ...item, text: newText } : item)));
  }

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <header className="mb-4">
          <h1 className="text-2xl font-semibold">Todo</h1>
          <p className="text-sm text-slate-500">작고 빠른 React + Tailwind 예제</p>
        </header>

        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <label htmlFor="new-todo" className="sr-only">
            새 할 일
          </label>
          <input
            id="new-todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="할 일을 입력하고 Enter를 누르세요"
            className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:opacity-95"
            aria-label="추가"
          >
            추가
          </button>
        </form>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2" role="tablist" aria-label="필터">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-lg ${filter === "all" ? "bg-slate-800 text-white" : "bg-slate-100"}`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3 py-1 rounded-lg ${filter === "active" ? "bg-slate-800 text-white" : "bg-slate-100"}`}
            >
              진행중
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded-lg ${filter === "completed" ? "bg-slate-800 text-white" : "bg-slate-100"}`}
            >
              완료
            </button>
          </div>

          <div className="text-sm text-slate-500">
            총 <span className="font-medium">{todos.length}</span> • 완료 <span className="font-medium">{todos.filter(t => t.done).length}</span>
          </div>
        </div>

        <ul className="space-y-2"> 
          {filtered.length === 0 ? (
            <li className="text-center text-slate-400 py-6">할 일이 없습니다</li>
          ) : (
            filtered.map((t) => (
              <li key={t.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggle(t.id)}
                  aria-label={`완료 체크: ${t.text}`}
                />

                <EditableText value={t.text} onSave={(newText) => editText(t.id, newText)} done={t.done} />

                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => remove(t.id)}
                    className="text-sm px-3 py-1 rounded-md bg-red-50 text-red-700"
                    aria-label={`삭제 ${t.text}`}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        <footer className="mt-4 flex items-center justify-between">
          <button
            onClick={clearCompleted}
            className="text-sm px-3 py-1 rounded-lg bg-slate-100"
          >
            완료된 항목 지우기
          </button>

          <div className="text-sm text-slate-500">Tip: 항목을 클릭하면 수정 가능합니다.</div>
        </footer>
      </div>
    </div>
  );
}

// Small inline editable component
function EditableText({ value, onSave, done }) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(value);

  useEffect(() => setLocal(value), [value]);

  function save() {
    const trimmed = local.trim();
    if (!trimmed) return; // prevent empty
    onSave(trimmed);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex-1">
        <input
          autoFocus
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
      className={`text-left flex-1 ${done ? "line-through text-slate-400" : ""}`}
      aria-label={`편집 ${value}`}
    >
      {value}
    </button>
  );
}
