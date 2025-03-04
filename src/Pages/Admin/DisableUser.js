import React from "react";
import { useParams } from "react-router-dom";

const DisableUser = () => {
  const { id } = useParams();

  const handleDisable = () => {
    console.log("Vô hiệu hóa tài khoản ID:", id);
    // Gửi yêu cầu API để vô hiệu hóa tài khoản
  };

  return (
    <div>
      <h2>Vô hiệu hóa tài khoản</h2>
      <p>Bạn có chắc chắn muốn vô hiệu hóa tài khoản ID: {id}?</p>
      <button onClick={handleDisable}>Xác nhận</button>
    </div>
  );
};

export default DisableUser;
