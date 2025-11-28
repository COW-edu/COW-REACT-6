import TodoItem from "../components/TodoItem";

export default function TodoList({ todos, onToggle, onRemove }) {
  return (
    <div className="todo-container">
        <ul className="todo-list">
            {todos.map((t) => ( // todo 요소 하나씩 li 로 만듦
              <TodoItem 
              todo= {t}
              onToggle={onToggle}
              onRemove={onRemove}
              />
            ))}
        </ul>
    
      </div>
  );
}
