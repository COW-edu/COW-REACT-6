import React, { useState } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  // [상태 관리] todos: 할 일 목록 배열, input: 입력창의 값
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // [핸들러] 할 일 추가 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // 함수형 업데이트: 항상 최신 상태를 기반으로 안전하게 상태를 업데이트
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput('');
  };

  // [핸들러] 할 일 삭제 함수
  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // [핸들러] 할 일 완료 상태 토글 함수
  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="todo-app">
      <h1>오늘 할 일</h1>
      {/* 자식 컴포넌트에 상태와 핸들러 함수를 props로 전달 */}
      <TodoInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
      <TodoList
        todos={todos}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
