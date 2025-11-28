import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTodo as apiDeleteTodo, toggleTodo as apiToggleTodo, createTodo, getTodos, updateTodo } from '../api/todos';
const getStoredMemberId = () => sessionStorage.getItem('memberId');

export default function useTodos() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [memberId, setMemberId] = useState(() => getStoredMemberId());

  const ensureMemberId = useCallback(() => {
    const storedId = memberId || getStoredMemberId();
    if (!storedId) {
      navigate('/login');
      throw new Error('로그인이 필요합니다.');
    }
    if (storedId !== memberId) {
      setMemberId(storedId);
    }
    return storedId;
  }, [memberId, setMemberId]);

  const fetchTodos = useCallback(async () => {
    try {
      const currentMemberId = ensureMemberId();
      const data = await getTodos(currentMemberId);
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
      if (error.message.includes('401') || error.message.includes('로그인')) {
        navigate('/');
      }
    }
  }, [ensureMemberId, navigate]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async ({ text, time, date }) => {
    const currentMemberId = ensureMemberId();
    const newTodo = { text, time, date, completed: false };
    const savedTodo = await createTodo(currentMemberId, newTodo);
    setTodos((prev) => [...prev, savedTodo]);
  }, [ensureMemberId]);

  const deleteTodo = useCallback(async (id) => {
    const currentMemberId = ensureMemberId();
    await apiDeleteTodo(currentMemberId, id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, [ensureMemberId]);

  const saveTodo = useCallback(async (id, updatedData) => {
    const currentMemberId = ensureMemberId();
    await updateTodo(currentMemberId, id, updatedData);
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo)));
  }, [ensureMemberId]);

  const toggleTodo = useCallback(async (id) => {
    const currentMemberId = ensureMemberId();
    const target = todos.find((todo) => todo.id === id);
    if (!target) {
      return;
    }
    const nextCompleted = !target.completed;
    await apiToggleTodo(currentMemberId, id, { completed: nextCompleted });
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: nextCompleted } : todo)));
  }, [ensureMemberId, todos]);

  return { todos, addTodo, deleteTodo, saveTodo, toggleTodo, fetchTodos };
}
