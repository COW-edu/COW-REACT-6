// yyyy-mm-dd 포맷 로컬 기준
export const formatDate = (date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().split('T')[0];
};
