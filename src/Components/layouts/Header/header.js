import classNames from "classnames/bind";
import styles from "./header.module.scss";
import InputField from "../LoginComponents/InputField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../Login/login";
import SignUp from "../../Login/signUp";
import Button from "../LoginComponents/Button";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function Header() {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear(); // Xóa localStorage
    setLogout(true);
    navigate("/login"); // Chuyển hướng về trang login
  };
  return (
    <div className={cx("wrapper")}>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <div className={cx("header-logo-wrapper")}>
          <img src="/assets/logo.png" className={cx("logo")} />
          <p className={cx("title")}>CTU-Drive</p>
        </div>
      </Link>
      <div>
        <Button text="Đăng xuất" onClick={handleLogout} width={"150px"} />
      </div>
    </div>
  );
}

export default Header;
