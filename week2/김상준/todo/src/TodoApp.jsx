import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { useTodo } from "./hooks/useTodo";
import { useInput } from "./hooks/useInput";

export default function TodoApp({ nickname }) {
  const { todos, addTodo, toggle, remove, clearCompleted, edit } = useTodo(nickname); // ✅ edit 추가
  const { value: text, onChange, clear, inputRef } = useInput("");
  const [filter, setFilter] = useState("all");

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await addTodo(text);
    if (result.success) clear();
  }

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  function handleLogout() {
    localStorage.removeItem("nickname");
    window.location.reload();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{nickname}의 Todo</h1>
            <p className="text-sm text-slate-500">React + Spring Boot 연동</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200"
          >
            로그아웃
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            value={text}
            onChange={onChange}
            placeholder="할 일을 입력하고 Enter를 누르세요"
            className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:opacity-95"
          >
            추가
          </button>
        </form>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            {["all", "active", "completed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded-lg ${
                  filter === type ? "bg-slate-800 text-white" : "bg-slate-100"
                }`}
              >
                {type === "all" ? "전체" : type === "active" ? "진행중" : "완료"}
              </button>
            ))}
          </div>
          <div className="text-sm text-slate-500">
            총 <span className="font-medium">{todos.length}</span> • 완료{" "}
            <span className="font-medium">{todos.filter((t) => t.done).length}</span>
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
                onEdit={edit} // ✅ edit 연결
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
