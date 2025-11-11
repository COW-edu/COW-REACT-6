import axios from "axios";

// ✅ 백엔드 서버 주소
// 서버가 8080 포트에서 실행 중이라면 이렇게 두면 됨
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default api;
