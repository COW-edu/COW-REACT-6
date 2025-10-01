function Calendar({ selectedDate, onDateSelect, todos }) {
  // 캘린더 생성 함수
  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // 일요일부터 시작
    
    const calendar = [];
    const currentDate = new Date(startDate);
    
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const isCurrentMonth = currentDate.getMonth() === currentMonth;
        const isToday = dateStr === today.toISOString().split('T')[0];
        const isSelected = dateStr === selectedDate;
        const todoCount = todos.filter(todo => todo.date === dateStr).length;
        
        weekDays.push({
          date: new Date(currentDate),
          dateStr,
          isCurrentMonth,
          isToday,
          isSelected,
          todoCount
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      calendar.push(weekDays);
    }
    
    return calendar;
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>캘린더</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', marginBottom: '20px' }}>
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day} style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
            {day}
          </div>
        ))}
        
        {generateCalendar().flat().map((dayInfo) => (
          <div
            key={dayInfo.dateStr}
            onClick={() => onDateSelect(dayInfo.dateStr)}
            style={{
              padding: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: dayInfo.isSelected 
                ? '#007bff' 
                : dayInfo.isToday 
                ? '#e3f2fd' 
                : dayInfo.isCurrentMonth 
                ? 'white' 
                : '#f8f9fa',
              color: dayInfo.isSelected 
                ? 'white' 
                : dayInfo.isCurrentMonth 
                ? 'black' 
                : '#999',
              border: '1px solid #ddd',
              position: 'relative'
            }}
          >
            {dayInfo.date.getDate()}
            {dayInfo.todoCount > 0 && (
              <div style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {dayInfo.todoCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;