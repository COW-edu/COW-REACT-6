import React from 'react';
import './TodoInput.css';

function TodoInput({ input, setInput, handleSubmit }) {
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="할 일을 입력하세요."
        autoComplete="off"
        // value와 onChange를 통해 input 값을 React의 state와 동기화 (제어 컴포넌트)
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoInput;
