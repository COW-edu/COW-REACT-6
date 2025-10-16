import "../styles/TodoItem.css"

export default function TodoItem({ todo, onToggle, onRemove }) {
  const { id, text, done } = todo;

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-check"
        checked={done}
        onChange={() => onToggle(id)}
      />
      <span className={`todo-text ${done ? "done" : ""}`}>{text}</span>
      <button className="todo-btn" onClick={() => onRemove(id)}>
        삭제
      </button>
    </li>
  );
}
