import { useState } from "react";
import styles from "./AddUser.module.scss"; 
import { addUser } from "../../services/userService"; // Import API

const AddUser = () => {
  const [user, setUser] = useState({
    userId: "",
    fullName: "",
    isMale: true,
    phoneNumber: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addUser(user); // Gửi dữ liệu lên API
      alert("Người dùng đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm tài khoản:", error);
      alert("Có lỗi xảy ra khi thêm tài khoản.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Thêm Tài Khoản</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Mã người dùng</label>
            <input
              type="text"
              name="userId"
              value={user.userId}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Giới tính</label>
            <div>
              <input
                type="checkbox"
                name="isMale"
                checked={user.isMale}
                onChange={handleChange}
              />
              <label> Nam</label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Số điện thoại</label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Quyền</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>

          <button type="submit" className={styles.button}>
            Thêm tài khoản
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
