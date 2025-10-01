import React from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';

function TodoList({ todos, handleToggle, handleDelete }) {
  return (
    <ul className="todo-list">
      {/* todos 배열을 순회하며 각 todo 항목을 TodoItem 컴포넌트로 렌더링
        - key: React가 각 항목을 식별하여 효율적으로 업데이트하기 위해 필수
      */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;
