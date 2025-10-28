import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  // useState 이용하여 todo 관리
  // 시작할 때 localStorage에서 데이터 불러오도록 초기값 설정
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    // localStorage에 저장된 값이 있으면 JSON 형태로 파싱, 없으면 빈 배열 반환
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState('');

  // todo 내용 변경될 때 localStorage 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // todo 등록한 시간
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const createdAt = `${year}.${month}.${day}. ${hours}:${minutes}`;

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: input, completed: false, createdAt: createdAt },
    ]);
    setInput('');
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="todo-app">
      <h1>오늘 할 일</h1>
      <TodoInput value={input} onChange={setInput} onSubmit={handleAddTodo} />
      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
