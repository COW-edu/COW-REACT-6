import React, { useRef, useEffect } from 'react';
import { useTodo } from './hooks/useTodo';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const inputRef = useRef(null);

  const {
    todos,
    input,
    setInput,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
  } = useTodo(inputRef);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="todo-app">
      {' '}
      <h1>오늘 할 일</h1>{' '}
      <TodoInput
        value={input}
        onChange={setInput}
        onSubmit={handleAddTodo}
        inputRef={inputRef}
      />{' '}
      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />{' '}
    </div>
  );
}

export default App;
