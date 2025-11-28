import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span className="checkbox" onClick={() => onToggleTodo(todo.id)}></span>
      <div className="todo-text-container">
        <span className="todo-text">{todo.text}</span>
        <span className="todo-timestamp">{todo.createdAt}</span>
      </div>
      <button onClick={() => onDeleteTodo(todo.id)}>삭제</button>
    </li>
  );
}

export default TodoItem;
