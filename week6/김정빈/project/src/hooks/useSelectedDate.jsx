import { formatDate } from '../utils/date';
import useLocalStorage from './useLocalStorage';

export default function useSelectedDate() {
  const [selectedDate, setSelectedDate] = useLocalStorage(
    'selectedDate',
    () => formatDate(new Date())
  );

  const selectDate = (dateStr) => setSelectedDate(dateStr);

  return { selectedDate, selectDate };
}
