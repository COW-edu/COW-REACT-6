import TodoItem from './TodoItem.jsx';

function TodoList({ todos, selectedDate, onSave, onToggle, onDelete }) {
  // 선택된 날짜의 할 일만 필터링
  const filteredTodos = todos.filter(todo => todo.date === selectedDate);

  return (
    <div style={{ flex: 1 }}>
      <h2>{selectedDate} 할 일</h2>
      
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onSave={onSave}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;