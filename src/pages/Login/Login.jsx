import { useState } from "react";
import styles from "./Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast/Toast";

function Login() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    wrong: "",
  });
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const success = login(username, password);

    const newErrors = {
      username: username.trim() ? "" : "Tên đăng nhập không được để trống",
      password: password.trim() ? "" : "Mật khẩu không được để trống",
    };

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      return;
    }
    if (success) {
      setToast({
        show: true,
        message: "Đăng nhập thành công",
        type: "success",
      });
      setTimeout(() => {
        setToast({ show: false, message: "", type: "success" });
        navigate("/homepage");
      }, 1500);
    } else {
      setErrors({
        ...newErrors,
        wrong: "Sai tài khoản hoặc mật khẩu",
      });
      setToast({
        show: true,
        message: "Đăng nhập thất bại!",
        type: "error",
      });
      setTimeout(() => {
        setToast({ show: false, message: "", type: "error" });
      }, 1500);
    }
  }

  return (
    <>
      <div className={styles.loginPage}>
        <form className={styles.loginContainer}>
          <div className={styles.login}>
            <p className={styles.loginHeader}>đăng nhập</p>
            <div className={styles.username}>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors((prev) => ({ ...prev, username: "", wrong: "" }));
                }}
                autoComplete="username"
                id="username"
                type="text"
                placeholder="Tên đăng nhập"
              />
              {errors.username && (
                <p style={{ color: "red", fontSize: 13, marginTop: "-10px" }}>
                  {errors.username}
                </p>
              )}
            </div>

            <div className={styles.password}>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "", wrong: "" }));
                }}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                autoComplete="password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eye}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p style={{ color: "red", fontSize: 13, marginTop: "-10px" }}>
                  {errors.password}
                </p>
              )}
            </div>
            <div className={styles.checkboxContainer}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe"> Ghi nhớ đăng nhập lần sau</label>
            </div>

            <button
              onClick={(e) => handleSubmit(e)}
              className={styles.btnLogin}
            >
              ➜
            </button>
            {errors.wrong && (
              <p style={{ color: "red", marginTop: 10 }}>{errors.wrong}</p>
            )}
            <p className={styles.registerText}>
              Không có tài khoản?{" "}
              <span
                className={styles.registerNow}
                onClick={() => navigate("/signup")}
              >
                Đăng ký ngay
              </span>
            </p>
          </div>
        </form>

        {toast.show && <Toast message={toast.message} type={toast.type} />}

        <div className={styles.imgBackground}></div>
      </div>
    </>
  );
}

export default Login;
