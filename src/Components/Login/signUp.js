import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../Components/layouts/LoginComponents/InputField";
import styles from "./login.module.scss";
import Button from "../../Components/layouts/LoginComponents/Button";
import authService from "../../services/authService";
import { itemsContext } from "../../App";

const SignUp = ({ }) => {
  // Nhận prop onClose để đóng form
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Nam");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(itemsContext)
  const navigate = useNavigate();

  const signUpRef = useRef(null); // Tham chiếu đến form

  const handleSignUp = (e) => {
    e.preventDefault();

    // authService.registerNguoiDung({
    //   hoTen: fullName,
    //   laNam: gender === "Nam",
    //   soDienThoai: phone,
    //   email: email,
    //   matKhau: password
    // })
    //   .then((res) => {
    //     console.log(res.data)
    //     setIsAuthenticated(true)
    //     navigate("/")
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data)
    //   })

  };

  return (
    <div className={styles.overlay}>
      {/* Lớp phủ nền */}
      <div className={styles.loginContainer} ref={signUpRef}>
        <h2>Create Your Account</h2>
        <form onSubmit={handleSignUp}>
          <InputField
            type="text"
            placeholder="Họ và Tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="tel"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="^0\d{9}$"
            required
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
          </div>
          <InputField
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
