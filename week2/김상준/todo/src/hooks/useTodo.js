import { useEffect, useState } from "react";
import api from "../api";

// ✅ 닉네임별 Todo 관리 (서버 연동)
export function useTodo(nickname = "sangjun") {
  const [todos, setTodos] = useState([]);

  // 🚀 1. 서버에서 목록 불러오기
  async function loadTodos() {
    try {
      const res = await api.get(`/users/${nickname}/todos`);
      if (res.data.success) {
        setTodos(res.data.data);
        localStorage.setItem("todos", JSON.stringify(res.data.data));
      }
    } catch (err) {
      console.error("할 일 목록 불러오기 실패:", err);
    }
  }

  // 🚀 2. 새 할 일 추가
  async function addTodo(text) {
    if (!text.trim()) return { success: false, reason: "empty" };

    try {
      const res = await api.post(`/users/${nickname}/todos`, { text });
      if (res.data.success) {
        const newTodo = res.data.data;
        const updated = [...todos, newTodo];
        setTodos(updated);
        localStorage.setItem("todos", JSON.stringify(updated));
        return { success: true };
      }
    } catch (err) {
      console.error("할 일 추가 실패:", err);
      return { success: false };
    }
  }

  // 🚀 3. 완료 상태 변경
  async function toggle(id) {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    try {
      const res = await api.patch(`/todos/${id}`, { done: !target.done });
      if (res.data.success) {
        const updated = todos.map((t) =>
          t.id === id ? { ...t, done: !t.done } : t
        );
        setTodos(updated);
        localStorage.setItem("todos", JSON.stringify(updated));
      }
    } catch (err) {
      console.error("상태 변경 실패:", err);
    }
  }

  // 🚀 4. 삭제
  async function remove(id) {
    try {
      const res = await api.delete(`/todos/${id}`);
      if (res.data.success) {
        const updated = todos.filter((t) => t.id !== id);
        setTodos(updated);
        localStorage.setItem("todos", JSON.stringify(updated));
      }
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  }

  // 🚀 5. 완료된 항목 일괄 삭제 (로컬에서만)
  function clearCompleted() {
    const active = todos.filter((t) => !t.done);
    setTodos(active);
    localStorage.setItem("todos", JSON.stringify(active));
  }

  // 🚀 첫 렌더 시 서버 데이터 불러오기
  useEffect(() => {
    loadTodos();
  }, [nickname]);

  return { todos, addTodo, toggle, remove, clearCompleted };
}
