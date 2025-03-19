// import axios from "axios";

import createAxios from "../utils/axios";

// const API_URL = "http://localhost:5000/users"; // Địa chỉ API backend

// //Lấy danh sách người dùng
// export const getUsers = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

// //Thêm người dùng mới
// export const addUser = async (user) => {
//   const response = await axios.post(API_URL, user);
//   return response.data;
// };

// //Xóa người dùng theo ID
// export const deleteUser = async (id) => {
//   const response = await axios.delete(`${API_URL}/${id}`);
//   return response.data; // Trả về kết quả xóa
// };


const axios = createAxios("/users")

const userService = {
  getAllNguoiDung: () => axios.get(""),
  getListNguoiDungNotInDuAn: (id) => axios.get(`/listNguoiDungNotInDuAn/${id}`),
  getListNguoiDungInDuAn: (id) => axios.get(`/listNguoiDungInDuAn/${id}`)
}

export default userService
