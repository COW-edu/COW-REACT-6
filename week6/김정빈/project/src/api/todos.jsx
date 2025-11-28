// src/api/todos.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {

  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  

  return config;
});


export const getTodos = async (memberId) => {
  const response = await api.get(`/api/members/${memberId}/todos`);
  return response.data.data;
};

export const createTodo = async (memberId, todo) => {
  const response = await api.post(`/api/members/${memberId}/todos`, todo);
  return response.data.data;
};

export const updateTodo = async (memberId, id, patch) => {
  const response = await api.put(`/api/members/${memberId}/todos/${id}`, patch);
  return response.data.data;
};

export const toggleTodo = async (memberId, id, patch) => {
  const response = await api.patch(`/api/members/${memberId}/todos/${id}`, patch);
  return response.data.data;
};

export const deleteTodo = async (memberId, id) => {
  const response = await api.delete(`/api/members/${memberId}/todos/${id}`);
  return response.data.data;
};

const TodoAPI = {
  list: getTodos,
  create: createTodo,
  update: updateTodo,
  patch: toggleTodo,
  remove: deleteTodo,
};

export default TodoAPI;
