import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import InputField from "../../Components/layouts/LoginComponents/InputField";
import styles from "./login.module.scss";
import Button from "../../Components/layouts/LoginComponents/Button";

const SignUp = ({ onClose }) => {
  // Nhận prop onClose để đóng form
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Nam");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpRef = useRef(null); // Tham chiếu đến form

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log({ fullName, dob, gender, phone, email, password });
    // Gửi dữ liệu đăng ký lên server tại đây
  };

  // Xử lý sự kiện click bên ngoài form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (signUpRef.current && !signUpRef.current.contains(event.target)) {
        onClose(); // Đóng form khi click bên ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      {" "}
      {/* Lớp phủ nền */}
      <div className={styles.loginContainer} ref={signUpRef}>
        <h2>Create Your Account</h2>
        <form onSubmit={handleSignUp}>
          <InputField
            type="text"
            placeholder="Họ và Tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="date"
            placeholder="Ngày sinh"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <InputField
            type="tel"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className={styles.gendergroup}>
            <label>
              <input
                type="radio"
                name="gender"
                value="Nam"
                checked={gender === "Nam"}
                onChange={(e) => setGender(e.target.value)}
              />
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Nữ"
                checked={gender === "Nữ"}
                onChange={(e) => setGender(e.target.value)}
              />
              Nữ
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Khác"
                checked={gender === "Khác"}
                onChange={(e) => setGender(e.target.value)}
              />
              Khác
            </label>
          </div>

          <InputField
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.ButtonContinue}>
            <Button type="submit" text="Đăng ký" width="300px" />
          </div>
        </form>
        <p>
          Already have an account?{" "}
          <Link className={styles.linkStyle} to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
