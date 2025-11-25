// src/hooks/useTodo.js
import { useEffect, useState } from "react";
import api from "../api";

export function useTodo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const res = await api.get("/todos");
      setTodos(res.data.data);
    } catch (err) {
      console.error("❌ 할 일 불러오기 실패:", err);
    }
  }

  // 🔥 여기 문제였던 addTodo 수정됨
  async function addTodo(text) {
    try {
      const res = await api.post("/todos", { text });
      const newTodo = res.data.data;

      setTodos((prev) => [...prev, newTodo]);

      return { success: true, todo: newTodo };

    } catch (err) {
      console.error("❌ 새 할 일 추가 실패:", err);
      return { success: false };
    }
  }

  async function toggle(id, done) {
    try {
      await api.patch(`/todos/${id}`, { done });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done } : t))
      );
    } catch (err) {
      console.error("❌ 상태 변경 실패:", err);
    }
  }

  async function edit(id, text) {
    try {
      const res = await api.put(`/todos/${id}`, { text });
      const updated = res.data.data;

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    } catch (err) {
      console.error("❌ 수정 실패:", err);
    }
  }

  async function remove(id) {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("❌ 삭제 실패:", err);
    }
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  return {
    todos,
    addTodo,
    toggle,
    edit,
    remove,
    clearCompleted,
  };
}
