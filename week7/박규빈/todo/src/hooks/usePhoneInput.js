import { useState } from 'react';
import { formatPhoneNumber } from '../utils/formatters';

export function usePhoneInput(initialValue = '') {
  // 초기값도 포맷팅 적용
  const initial = formatPhoneNumber(initialValue);

  const [value, setValue] = useState(initial.formatted); // 화면 표시용 (하이픈 O)
  const [rawValue, setRawValue] = useState(initial.raw); // 실제 전송용 (하이픈 X)

  const onChange = (e) => {
    const input = e.target.value;
    const { raw, formatted } = formatPhoneNumber(input);

    setRawValue(raw);
    setValue(formatted);
  };

  return { value, rawValue, onChange, setValue, setRawValue };
}
