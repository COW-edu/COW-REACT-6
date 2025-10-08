import { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';

function App() { // 함수형 컴포넌트 
  const [todos, setTodos] = useState([]); //초기값을 빈 배열로 선언, setTodos는 변경 함수
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // 선택된 날짜

  // 할 일 추가 함수
  const addTodo = (todoData) => {
    setTodos([...todos, { 
      id: Date.now(), 
      text: todoData.text, 
      time: todoData.time,
      date: todoData.date,
      completed: false 
    }]);
  };

  // 날짜 선택 함수
  const selectDate = (dateStr) => {
    setSelectedDate(dateStr);
  };

  // 할 일 삭제 함수
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id)); // 새로운 리스트를 만드는데 키가 일치하는거만 뺌 
  };

  // 할 일 저장 함수 (편집 완료)
  const saveTodo = (id, updatedData) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updatedData } : todo
    ));
  };

  // 할 일 완료/미완료 토글 함수
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="App">
      <h1>Todo List Calendar</h1>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 캘린더 컴포넌트 */}
        <Calendar 
          selectedDate={selectedDate}
          onDateSelect={selectDate}
          todos={todos}
        />

        {/* 할 일 관리 영역 */}
        <div style={{ flex: 1 }}>
          <TodoList
            todos={todos}
            selectedDate={selectedDate}
            onSave={saveTodo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
          
          <TodoForm
            selectedDate={selectedDate}
            onAddTodo={addTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;