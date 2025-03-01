import classNames from "classnames/bind";
import styles from "./header.module.scss";
import InputField from "../LoginComponents/InputField";
import { useState } from "react";
import Login from "../../Login/login";
import SignUp from "../../Login/signUp";
import Button from "../LoginComponents/Button";
const cx = classNames.bind(styles);
function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-logo-wrapper")}>
        <img src="/assets/logo.png" className={cx("logo")} />
        <p className={cx("title")}>CTU-Drive</p>
      </div>
      <div>
        <Button
          text="Đăng nhập"
          onClick={() => {
            setIsLogin((prev) => !prev);
            setIsSignup(false);
          }}
          width={"150px"}
        />

        <Button
          text="Đăng ký"
          onClick={() => {
            setIsSignup((prev) => !prev);
            setIsLogin(false);
          }}
          width={"150px"}
        />
        {isLogin && <Login />}
        {isSignup && <SignUp />}
      </div>
    </div>
  );
}

export default Header;
