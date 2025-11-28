/*로컬스토리지 & 날짜 관련 함수*/

export const getStorageData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const setStorageData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
