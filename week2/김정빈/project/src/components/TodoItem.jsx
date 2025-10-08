import { useState } from 'react';

function TodoItem({ todo, onSave, onToggle, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState('');
  const [editingTime, setEditingTime] = useState('');
  const [editingDate, setEditingDate] = useState('');

  // 편집 시작
  const startEdit = () => {
    setIsEditing(true);
    setEditingText(todo.text);
    setEditingTime(todo.time || '');
    setEditingDate(todo.date || '');
  };

  // 편집 저장
  const saveEdit = () => {
    if (editingText.trim() !== '') {
      onSave(todo.id, {
        text: editingText,
        time: editingTime,
        date: editingDate
      });
    }
    setIsEditing(false);
    setEditingText('');
    setEditingTime('');
    setEditingDate('');
  };

  // 편집 취소
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingText('');
    setEditingTime('');
    setEditingDate('');
  };

  return (
    <li>
      {isEditing ? (
        // 편집 모드
        <>
          <input 
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') cancelEdit();
            }}
          />
          <input 
            type="date"
            value={editingDate}
            onChange={(e) => setEditingDate(e.target.value)}
          />
          <input 
            type="time"
            value={editingTime}
            onChange={(e) => setEditingTime(e.target.value)}
          />
          <button onClick={saveEdit}>저장</button>
          <button onClick={cancelEdit}>취소</button>
        </>
      ) : (
        // 일반 모드
        <>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
            {todo.date && <span style={{ color: 'green', marginLeft: '10px' }}>[{todo.date}]</span>}
            {todo.time && <span style={{ color: 'blue', marginLeft: '5px' }}>({todo.time})</span>}
          </span>
          <button onClick={startEdit}>수정</button>
          <button onClick={() => onToggle(todo.id)}>
            {todo.completed ? '미완료' : '완료'}
          </button>
          <button onClick={() => onDelete(todo.id)}>삭제</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;