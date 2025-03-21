import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import InputField from "../layouts/LoginComponents/InputField";
import Button from "../layouts/LoginComponents/Button";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loginMessage, setLoginMessage] = useState("");
    const loginRef = useRef(null);
    const handleLogin = (e) => {
        e.preventDefault();
        authService.login({
            email: email,
            matKhau: password
        })
            .then((res) => {
                setLoginMessage("Login successful! ");
                console.log(setIsAuthenticated)
                setIsAuthenticated(true);
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            })
            .catch((err) => {
                console.log(err)
                setLoginMessage(err.message)
            })



        // if (email === "test@gmail.com" && password === "123456") {
        //     localStorage.setItem("token", "fake-jwt-token");
        //     setLoginMessage("Login successful! ");
        //     setIsAuthenticated(true);
        //     setTimeout(() => {
        //         navigate("/");
        //     }, 1500);
        // } else {
        //     setLoginMessage("Invalid email or password. Please try again!");
        // }
    };

    return (
        <div className={styles.overlay}>
            {" "}
            <div className={styles.loginContainer} ref={loginRef}>
                <h2>Login Your Account</h2>
                <form onSubmit={handleLogin}>
                    <InputField
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={styles.ButtonContinue}>
                        <Button type="submit" text="Tiếp tục" width="300px" onClick={(e) => handleLogin(e)} />
                    </div>
                </form>

                <p>
                    Don't have an account?{" "}
                    <Link className={styles.linkStyle} to="/signup">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;