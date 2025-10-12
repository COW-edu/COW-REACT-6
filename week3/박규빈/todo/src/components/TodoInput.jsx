import React from 'react';
import './TodoInput.css';

function TodoInput({ value, onChange, onSubmit }) {
  return (
    <form className="todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="할 일을 입력하세요."
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoInput;
