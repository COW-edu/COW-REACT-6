import useLocalStorage from './useLocalStorage';

export default function useTodos() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const addTodo = ({ text, time, date }) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, time, date, completed: false },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const saveTodo = (id, updatedData) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updatedData } : todo)));
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  return { todos, addTodo, deleteTodo, saveTodo, toggleTodo };
}
