import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast/Toast";

function SignUp() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const { signup } = useAuth();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    passwordCheck: "",
  });

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      email: email.trim() ? "" : "Email không được để trống",
      username: username.trim() ? "" : "Tên đăng nhập không được để trống",
      password: password.trim() ? "" : "Mật khẩu không được để trống",
    };

    if (newErrors.username || newErrors.password || newErrors.email) {
      setErrors(newErrors);
      return;
    }

    if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Mật khẩu phải có tối thiểu 8 ký tự",
      }));
      return;
    }

    if (password !== passwordCheck) return;

    const success = signup(email, username, password);
    if (!success) {
      setErrors((prev) => ({
        ...prev,
        username: "Tài khoản đã tồn tại",
      }));
      setToast({ show: true, message: "Đăng ký thất bại!", type: "error" });
      setTimeout(() => {
        setToast({ show: false, message: "", type: "error" });
      }, 1000);
    } else {
      setToast({ show: true, message: "Đăng ký thành công!", type: "success" });
      setTimeout(() => {
        setToast({ show: false, message: "", type: "success" });
        navigate("/login");
      }, 1000);
    }
  }

  return (
    <>
      <div className={styles.signInPage}>
        <form className={styles.signInContainer}>
          <div className={styles.signIn}>
            <p className={styles.signInHeader}>đăng ký</p>
            <div className={styles.info}>
              <p className={styles.infoField}>Email</p>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    email: e.target.value.trim()
                      ? validateEmail(e.target.value)
                        ? ""
                        : "Email không hợp lệ"
                      : "",
                  }));
                }}
                type="text"
                className={styles.inputField}
                placeholder="VD: bang@gmail.com"
              />
              {errors.email && (
                <p
                  style={{
                    color: "red",
                    fontSize: 15,
                    marginTop: "-15px",
                    marginBottom: "5px",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className={styles.info}>
              <p className={styles.infoField}>Tên đăng nhập</p>
              <input
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors((prev) => ({ ...prev, username: "" }));
                }}
                className={styles.inputField}
                placeholder="VD: phamcongbang1234"
              />
              {errors.username && (
                <p
                  style={{
                    color: "red",
                    fontSize: 15,
                    marginTop: "-15px",
                    marginBottom: "5px",
                  }}
                >
                  {errors.username}
                </p>
              )}
            </div>

            <div className={styles.info}>
              <p className={styles.infoField}>Mật khẩu</p>
              <div className={styles.password}>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      password: "",
                      passwordCheck:
                        passwordCheck === e.target.value
                          ? ""
                          : "Mật khẩu không trùng khớp",
                    }));
                  }}
                  type={showPassword1 ? "text" : "password"}
                  className={styles.inputField}
                />
                <span
                  onClick={() => setShowPassword1(!showPassword1)}
                  className={styles.eye}
                >
                  {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.password && (
                  <p
                    style={{
                      color: "red",
                      fontSize: 15,
                      marginTop: "-15px",
                      marginBottom: "5px",
                    }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.info}>
              <p className={styles.infoField}>Nhập lại mật khẩu</p>

              <div className={styles.password}>
                <input
                  value={passwordCheck}
                  onChange={(e) => {
                    setPasswordCheck(e.target.value);
                    if (!password)
                      setErrors((prev) => ({
                        ...prev,
                        passwordCheck: "",
                      }));
                    setErrors((prev) => ({
                      ...prev,
                      passwordCheck:
                        password === e.target.value
                          ? ""
                          : "Mật khẩu không trùng khớp",
                    }));
                  }}
                  type={showPassword2 ? "text" : "password"}
                  className={styles.inputField}
                />
                <span
                  onClick={() => setShowPassword2(!showPassword2)}
                  className={styles.eye}
                >
                  {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.passwordCheck && (
                  <p
                    style={{
                      color: "red",
                      fontSize: 15,
                      marginTop: "-15px",
                      marginBottom: "5px",
                    }}
                  >
                    {errors.passwordCheck}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button onClick={(e) => handleSubmit(e)} className={styles.btnSignIn}>
            ➜
          </button>
          <p className={styles.loginText}>
            Đã có tài khoản?
            <span
              onClick={() => navigate("/login")}
              className={styles.loginNow}
            >
              {" Đăng nhập ngay"}
            </span>
          </p>
        </form>

        {toast.show && <Toast message={toast.message} type={toast.type} />}

        <div className={styles.imgBackground}></div>
      </div>
    </>
  );
}

export default SignUp;
