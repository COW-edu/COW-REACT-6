import { useEffect, useState } from "react";
import api from "../api"; // ✅ axios 인스턴스

export function useTodo(nickname) {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(`todos_${nickname}`);
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ 서버에서 최신 데이터 불러오기
  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await api.get(`/users/${nickname}/todos`);
        const latestTodos = res.data.data;
        setTodos(latestTodos);
        localStorage.setItem(`todos_${nickname}`, JSON.stringify(latestTodos));
      } catch (err) {
        console.error("❌ 할 일 목록 불러오기 실패:", err);
      }
    }

    if (nickname) fetchTodos();
  }, [nickname]);

  // ✅ todos가 바뀔 때마다 로컬스토리지 갱신
  useEffect(() => {
    if (todos && nickname) {
      localStorage.setItem(`todos_${nickname}`, JSON.stringify(todos));
    }
  }, [todos, nickname]);

  // ✅ 새 할 일 추가
  async function addTodo(text) {
    if (!text.trim()) return { success: false };
    try {
      const res = await api.post(`/users/${nickname}/todos`, { text });
      const newTodo = res.data.data;
      const updated = [...todos, newTodo];
      setTodos(updated);
      return { success: true };
    } catch (err) {
      console.error("❌ 할 일 추가 실패:", err);
      return { success: false };
    }
  }

  // ✅ 완료 상태 변경
  async function toggle(id, done) {
    try {
      await api.patch(`/todos/${id}`, { done });
      const updated = todos.map((t) =>
        t.id === id ? { ...t, done } : t
      );
      setTodos(updated);
    } catch (err) {
      console.error("❌ 완료 상태 변경 실패:", err);
    }
  }

  // ✅ 내용 수정 (신규)
  async function edit(id, newText) {
    try {
      const res = await api.put(`/todos/${id}`, { text: newText });
      const updatedTodo = res.data.data;
      const updatedList = todos.map((t) =>
        t.id === id ? updatedTodo : t
      );
      setTodos(updatedList);
    } catch (err) {
      console.error("❌ 할 일 수정 실패:", err);
    }
  }

  // ✅ 삭제
  async function remove(id) {
    try {
      await api.delete(`/todos/${id}`);
      const updated = todos.filter((t) => t.id !== id);
      setTodos(updated);
    } catch (err) {
      console.error("❌ 할 일 삭제 실패:", err);
    }
  }

  // ✅ 완료된 항목만 지우기
  function clearCompleted() {
    const active = todos.filter((t) => !t.done);
    setTodos(active);
  }

  return { todos, addTodo, toggle, remove, clearCompleted, edit };
}
