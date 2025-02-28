import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../Components/layouts/LoginComponents/InputField";
import styles from "./login.module.scss";
import Button from "../../Components/layouts/LoginComponents/Button";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log({ fullName, dob, gender, phone, email, password });
    // Gửi dữ liệu đăng ký lên server tại đây
  };

  return (
    <div className={styles.loginContainer}>
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
            <input type="radio" name="gender" value="Nam" />
            Nam
          </label>
          <label>
            <input type="radio" name="gender" value="Nữ" />
            Nữ
          </label>
          <label>
            <input type="radio" name="gender" value="Khác" />
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
          <Button type="submit">Đăng ký</Button>
        </div>
      </form>
      <p>
      Already have an account? <Link className={styles.linkStyle} to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
