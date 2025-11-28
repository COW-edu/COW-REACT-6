// src/api.js
import axios from "axios";

// 기본 axios 인스턴스
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 🔥 로그인 후 토큰을 axios 기본 헤더에 저장하는 함수
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// 🔥 페이지 새로고침해도 토큰 유지
const savedToken = localStorage.getItem("accessToken");
if (savedToken) {
  setAuthToken(savedToken);
}

export default api;
