import { useState } from 'react';
import { getStorageData, setStorageData } from '../utils/storage';

export function useTodos(selectedDateKey) {
  const [todos, setTodos] = useState(() => {
    const data = getStorageData(`todo-${selectedDateKey}`);
    return data?.todos || [];
  });

  const [dones, setDones] = useState(() => {
    const data = getStorageData(`todo-${selectedDateKey}`);
    return data?.dones || [];
  });

  const [prevKey, setPrevKey] = useState(selectedDateKey);

  // 날짜 변경 감지 및 상태 업데이트
  if (selectedDateKey !== prevKey) {
    const data = getStorageData(`todo-${selectedDateKey}`);
    setPrevKey(selectedDateKey);
    setTodos(data?.todos || []);
    setDones(data?.dones || []);
  }

  const saveToStorage = (newTodos, newDones) => {
    setStorageData(`todo-${selectedDateKey}`, {
      todos: newTodos,
      dones: newDones,
    });
    setTodos(newTodos);
    setDones(newDones);

    if (localStorage.getItem('autoSaveAlert') === 'true') {
      alert('✅ 자동 저장되었습니다.');
    }
  };

  const addTodo = (text, category) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      category,
      isImportant: false,
    };
    saveToStorage([...todos, newTodo], dones);
  };

  const toggleTodo = (item, isDone) => {
    if (isDone) {
      const newDones = dones.filter((t) => t.id !== item.id);
      const newTodos = [...todos, item];
      saveToStorage(newTodos, newDones);
    } else {
      const newTodos = todos.filter((t) => t.id !== item.id);
      const newDones = [...dones, item];
      saveToStorage(newTodos, newDones);
    }
  };

  const deleteTodo = (id, isDone) => {
    if (isDone) {
      saveToStorage(
        todos,
        dones.filter((t) => t.id !== id)
      );
    } else {
      saveToStorage(
        todos.filter((t) => t.id !== id),
        dones
      );
    }
  };

  const toggleImportant = (id, isDone) => {
    const targetList = isDone ? dones : todos;
    const updatedList = targetList.map((item) =>
      item.id === id ? { ...item, isImportant: !item.isImportant } : item
    );
    if (isDone) saveToStorage(todos, updatedList);
    else saveToStorage(updatedList, dones);
  };

  return { todos, dones, addTodo, toggleTodo, deleteTodo, toggleImportant };
}
