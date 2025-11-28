import { useEffect, useState } from 'react';

function TodoForm({ selectedDate, onAddTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [inputDate, setInputDate] = useState('');

  // selectedDate가 변경되면 inputDate도 업데이트
  useEffect(() => {
    setInputDate(selectedDate);
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const todoDate = inputDate || selectedDate;
      onAddTodo({
        text: inputValue,
        time: inputTime,
        date: todoDate
      });
      
      // 입력 필드 초기화
      setInputValue('');
      setInputTime('');
      setInputDate(selectedDate);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="할 일을 입력하세요"
          style={{ width: '200px', marginRight: '10px' }}
        />
        <input 
          type="date" 
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input 
          type="time" 
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button type="submit">추가</button>
      </form>
    </div>
  );
}

export default TodoForm;