// 숫자만 추출하고 하이픈을 넣어주는 함수
export const formatPhoneNumber = (value) => {
  if (!value) return { raw: '', formatted: '' };

  const cleanInput = value.replace(/[^0-9]/g, ''); // 숫자 이외 제거
  let result = '';

  // 길이별 포맷팅 로직
  if (cleanInput.length < 4) {
    result = cleanInput;
  } else if (cleanInput.length < 8) {
    result = `${cleanInput.slice(0, 3)}-${cleanInput.slice(3)}`;
  } else {
    result = `${cleanInput.slice(0, 3)}-${cleanInput.slice(
      3,
      7
    )}-${cleanInput.slice(7, 11)}`;
  }

  return {
    raw: cleanInput.substring(0, 11), // 실제 데이터 (최대 11자리 숫자)
    formatted: result.substring(0, 13), // 화면 표시용 (하이픈 포함)
  };
};
