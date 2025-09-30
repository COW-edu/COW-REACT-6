import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, handleToggle, handleDelete }) {
  return (
    // todo.completed 값에 따라 'completed' 클래스를 동적으로 추가/제거
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span
        className="checkbox"
        // onClick에 인자를 전달해야 하므로 화살표 함수로 감싸서 실행
        onClick={() => handleToggle(todo.id)}
      ></span>
      <span className="todo-text">{todo.text}</span>
      <button onClick={() => handleDelete(todo.id)}>삭제</button>
    </li>
  );
}

export default TodoItem;
