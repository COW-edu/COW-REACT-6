import { useState, useEffect } from 'react';

// 1. 서버 주소 설정
const API_URL = 'http://localhost:3001/todos';

export const useTodo = (inputRef) => {
  // 2. 초기 상태 : 로컬스토리지에서 가져오기
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState('');

  // 3. (GET) 컴포넌트 마운트 시 서버에서 데이터 가져오기
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('서버에서 데이터를 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        setTodos(data); // 서버 데이터로 상태 업데이트
      } catch (error) {
        console.error(error);
        // 에러 발생 시 로컬스토리지 데이터로 유지
      }
    };

    fetchTodos();
  }, []); // 빈 배열: 처음 한 번만 실행

  // 4. (Storage) todos 상태가 변경될 때마다 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 5. (POST) 할 일 추가
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newTodoBase = {
      text: input.trim(),
      completed: false,
      createdAt: new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodoBase),
      });

      if (!response.ok) {
        throw new Error('할 일 추가에 실패했습니다.');
      }

      const newTodoFromServer = await response.json(); // id가 포함된 새 todo
      setTodos((prevTodos) => [...prevTodos, newTodoFromServer]);
      setInput('');

      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 6. (DELETE) 할 일 삭제
  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('할 일 삭제에 실패했습니다.');
      }

      // 서버에서 성공적으로 삭제 -> 화면(상태)에서도 삭제
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // 7. (PATCH) 할 일 완료/미완료 토글
  const handleToggleTodo = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    if (!todoToToggle) return;

    const updatedCompleted = !todoToToggle.completed;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH', // PUT : 전체 교체, PATCH : 부분 수정
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: updatedCompleted }),
      });

      if (!response.ok) {
        throw new Error('상태 변경에 실패했습니다.');
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedCompleted } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return {
    todos,
    input,
    setInput,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};
