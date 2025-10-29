import { useEffect, useState } from "react";

export function useTodo() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem("todos-v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("todos-v1", JSON.stringify(todos));
    } catch {
      // ignore
    }
  }, [todos]);

  function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return { success: false, reason: "empty" };
    if (todos.some((t) => t.text === trimmed))
      return { success: false, reason: "duplicate" };

    const newTodo = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      text: trimmed,
      done: false,
      createdAt: Date.now(),
    };
    setTodos((t) => [newTodo, ...t]);
    return { success: true };
  }

  function toggle(id) {
    setTodos((t) =>
      t.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  }

  function remove(id) {
    setTodos((t) => t.filter((item) => item.id !== id));
  }

  function clearCompleted() {
    setTodos((t) => t.filter((item) => !item.done));
  }

  function editText(id, newText) {
    setTodos((t) =>
      t.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
  }

  return { todos, addTodo, toggle, remove, clearCompleted, editText };
}
