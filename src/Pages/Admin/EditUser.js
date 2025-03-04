import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ username: "", email: "" });

  useEffect(() => {
    // Lấy thông tin người dùng từ API theo ID
    console.log("Lấy dữ liệu user có ID:", id);
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cập nhật tài khoản:", formData);
    // Gửi dữ liệu lên server (API PUT)
  };

  return (
    <div>
      <h2>Sửa tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
};

export default EditUser;
