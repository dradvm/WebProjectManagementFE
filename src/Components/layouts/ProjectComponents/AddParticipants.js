import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AddParticipants.module.scss";
import userService from "../../../services/userService";
import duAnService from "../../../services/duAnService";

function AddParticipants({ projectId, onClose, onParticipantsAdded }) {
  const [users, setUsers] = useState([]);
  // Khởi tạo selectedUsers với participants hiện có
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    userService.getListNguoiDungNotInDuAn(projectId)
      .then((res) => {
        setUsers(res.data)
      })
      .catch((error) => console.error("Lỗi khi lấy danh sách người dùng:", error));
  }, []);

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = () => {
    // Gửi PATCH để cập nhật participants
    // axios
    //   .patch(`http://localhost:5000/projects/${projectId}`, {
    //     participants: selectedUsers,
    //   })
    //   .then(() => {
    //     onParticipantsAdded(selectedUsers); // Gọi hàm cha để cập nhật
    //     onClose();
    //   })
    //   .catch((error) => alert("Lỗi khi thêm người tham gia:" + error.message));
    if (selectedUsers.length >= 0) {
      duAnService.addNguoiDungs({
        maDuAn: projectId,
        maNguoiDungs: selectedUsers
      })
        .then((res) => {
          onParticipantsAdded()
        })
        .catch((err) => console.log(err))
    }
    else {
      alert("Vui lòng chọn người thêm")
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Thêm Người Tham Gia</h3>
        <ul>
          {users.map((user) => (
            <li key={user.maNguoiDung}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.maNguoiDung)}
                  onChange={() => handleSelectUser(user.maNguoiDung)}
                />
                {user.maNguoiDung}: {user.hoTen}
              </label>
            </li>
          ))}
        </ul>

        <div className={styles.buttonContainer}>
          <button className={styles.confirmBtn} onClick={handleSubmit}>Xác nhận</button>
          <button className={styles.cancelBtn} onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
}

export default AddParticipants;

