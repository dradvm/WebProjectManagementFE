import axios from "axios";

const API_URL = "http://localhost:5000/users"; // Link API giả lập

// Lấy danh sách tài khoản
export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Thêm tài khoản mới
export const addUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};
