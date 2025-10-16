import { useState } from "react";
import "../styles/TodoInsert.css"

function TodoInsert({ onInsert }) {
    // input 에 쓰이고 있는거 value 로 관리
  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();  // 새로고침 막기
    const text = value.trim();
    if (!text) return;
    onInsert(text);
    setValue(""); // 제출했으면 없애기
  };

  return (
    <form className="todo-wrap" onSubmit={onSubmit}>
      <div className="todo-row">
        <input
          className="todo-input"
          placeholder="할 일을 입력하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="todo-btn" type="submit">확인</button>
      </div>
    </form>
  );
}

export default TodoInsert;
