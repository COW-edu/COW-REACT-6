import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import Calendar from '../components/Calendar';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import useSelectedDate from '../hooks/useSelectedDate';
import useTodos from '../hooks/useTodos';

function Dashboard() {
  const { todos, addTodo, deleteTodo, saveTodo, toggleTodo } = useTodos();
  const { selectedDate, selectDate } = useSelectedDate();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    sessionStorage.removeItem('memberId');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="App max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todo List Calendar</h1>
        <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">
          로그아웃
        </button>
      </div>

      <div className="flex gap-5">
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={selectDate}
          todos={todos}
        />

        <div className="flex-1 space-y-4">
          <TodoList
            todos={todos}
            selectedDate={selectedDate}
            onSave={saveTodo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          <TodoForm selectedDate={selectedDate} onAddTodo={addTodo} />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;