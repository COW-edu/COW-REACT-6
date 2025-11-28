import TodoItem from './TodoItem.jsx';

function TodoList({ todos, selectedDate, onSave, onToggle, onDelete }) {

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