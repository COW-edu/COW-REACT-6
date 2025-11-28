import { useRef, useState } from "react";
import TodoInsert from "../components/TodoInsert";
import TodoList from "../components/TodoList";
import "../styles/TodoPage.css"

export default function TodoPage() {
  // todo 객체들을 state로 관리
  const [todos, setTodos] = useState(() => {
    // 새로고침해도 storage에 있다면 그걸 쓰고 아니며 빈배열
    const data= localStorage.getItem("todos"); // 키를 todos 
    return data ? JSON.parse(data) : [];
  });

  // todos가 변경될 때마다 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  
  // useRef로 index 관리
  const nextId = useRef(1); 

  // text를 받아 이전 todo에 기존 인덱스 +1, 새로운 text, 완료되지않은 item 추가
  const handleInsert = (text) => {
    setTodos(prev => [
      ...prev,                           
      { id: nextId.current++, text, done: false }
    ]);
  };

  // 클릭된 id의 완료상태를 반대로 바꿈
  // map 함수로 todo 하나하나돌면서 클릭된 id 와 같은 아이디이면 바꿈 
  const handleToggle = (id) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // 삭제할 id와 같지 않은 아이디만 filter 함
  const handleRemove = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    //그리고 각 컴포넌트에 props로 넣어주기
    <div className="todo-page">
      <TodoInsert onInsert={handleInsert} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onRemove={handleRemove}
      />
    </div>
  );
}
