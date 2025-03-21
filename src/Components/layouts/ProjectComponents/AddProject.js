import { useState } from "react";
import InputField from "../../layouts/LoginComponents/InputField.js";
import Button from "../../layouts/LoginComponents/Button.js";
import axios from "axios";
import styles from "./AddProject.module.scss";

const AddProject = ({ onClose, onAddProject }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { startDate, endDate } = formData;

    if (startDate && endDate && endDate <= startDate) {
      alert("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const newProject = {
      ...formData,
      progress: 0,
      ownerId: user ? user.id : "",       // ID của người tạo dự án
      ownerName: user ? user.fullName : "", // Tên của người tạo dự án
    };


    // Gọi hàm `onAddProject` từ `ProjectList`
    await onAddProject(newProject);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.AddProjectContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2>Thêm Dự Án</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Tên dự án"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Mô tả dự án (tối đa 200 ký tự)"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength="200"
            className={styles.textarea}
          />
          <InputField
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <InputField
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />

          <div className={styles.ButtonContinue}>
            <Button type="submit" text="Lưu Dự Án" width="300px" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
