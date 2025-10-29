import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { useTodo } from "./hooks/useTodo";
import { useInput } from "./hooks/useInput";

export default function TodoApp() {
  const { todos, addTodo, toggle, remove, clearCompleted, editText } = useTodo();
  const { value: text, onChange, clear, inputRef } = useInput("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  function handleSubmit(e) {
    e.preventDefault();
    const result = addTodo(text);
    if (result.success) {
      clear();
    } else if (result.reason === "duplicate") {
      alert("이미 같은 할 일이 있습니다!");
    }
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

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <label htmlFor="new-todo" className="sr-only">
            새 할 일
          </label>
          <input
            id="new-todo"
            ref={inputRef}
            value={text}
            onChange={onChange}
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
              className={`px-3 py-1 rounded-lg ${
                filter === "all" ? "bg-slate-800 text-white" : "bg-slate-100"
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3 py-1 rounded-lg ${
                filter === "active" ? "bg-slate-800 text-white" : "bg-slate-100"
              }`}
            >
              진행중
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded-lg ${
                filter === "completed" ? "bg-slate-800 text-white" : "bg-slate-100"
              }`}
            >
              완료
            </button>
          </div>

          <div className="text-sm text-slate-500">
            총 <span className="font-medium">{todos.length}</span> • 완료{" "}
            <span className="font-medium">
              {todos.filter((t) => t.done).length}
            </span>
          </div>
        </div>

        <ul className="space-y-2">
          {filtered.length === 0 ? (
            <li className="text-center text-slate-400 py-6">할 일이 없습니다</li>
          ) : (
            filtered.map((t) => (
              <TodoItem
                key={t.id}
                todo={t}
                onToggle={toggle}
                onRemove={remove}
                onEdit={editText}
              />
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

          <div className="text-sm text-slate-500">
            Tip: 항목을 클릭하면 수정 가능합니다.
          </div>
        </footer>
      </div>
    </div>
  );
}
