import { useState } from "react";
import styles from "./ChangePass.module.css";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast/Toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ChangePass() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const { user, updateUser } = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    passwordCheck: "",
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  function handleChangPass(e) {
    e.preventDefault();
    if (password.length < 8 || password !== passwordCheck) return;

    if (user.password === oldPassword) {
      updateUser({ password });
      setToast({
        show: true,
        message: "Đổi mật khẩu thành công",
        type: "success",
      });
      setTimeout(() => {
        setToast({ show: false, message: "", type: "error" });
        setOldPassword("");
        setPassword("");
        setPasswordCheck("");
      }, 1000);
    } else {
      setErrors((prev) => ({
        ...prev,
        oldPassword: "Mật khẩu không trùng khớp",
      }));

      setToast({
        show: true,
        message: "Đổi mật khẩu thất bại",
        type: "error",
      });

      setTimeout(() => {
        setToast({ show: false, message: "", type: "success" });
      }, 1000);
    }
  }

  return (
    <form className={styles.changePassContainer}>
      <p className={styles.title}>Thay đổi mật khẩu</p>
      <div className={styles.info}>
        <p className={styles.optionTitle}>Mật khẩu cũ</p>
        <input
          className={styles.inputInfo}
          type={showPassword1 ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
            setErrors((prev) => ({
              ...prev,
              oldPassword: "",
            }));
          }}
        />

        <span
          onClick={() => setShowPassword1(!showPassword1)}
          className={styles.eye}
        >
          {showPassword1 ? <FaEyeSlash /> : <FaEye />}
        </span>

        {errors.oldPassword && (
          <p
            style={{
              color: "red",
              fontSize: 15,
              marginTop: "-15px",
              marginBottom: "5px",
            }}
          >
            {errors.oldPassword}
          </p>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.optionTitle}>Mật khẩu mới</p>
        <input
          className={styles.inputInfo}
          type={showPassword2 ? "text" : "password"}
          value={password}
          onChange={(e) => {
            const newPass = e.target.value;
            setPassword(newPass);

            setErrors((prev) => ({
              ...prev,
              password:
                newPass.length > 0 && newPass.length < 8
                  ? "Mật khẩu phải có tối thiểu 8 ký tự"
                  : "",
              passwordCheck:
                password === e.target.value ? "" : "Mật khẩu không trùng khớp",
            }));
          }}
        />

        <span
          onClick={() => setShowPassword2(!showPassword2)}
          className={styles.eye}
        >
          {showPassword2 ? <FaEyeSlash /> : <FaEye />}
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

      <div className={styles.info}>
        <p className={styles.optionTitle}>Nhập lại mật khẩu mới</p>
        <input
          className={styles.inputInfo}
          type={showPassword3 ? "text" : "password"}
          value={passwordCheck}
          onChange={(e) => {
            setPasswordCheck(e.target.value);

            setErrors((prev) => ({
              ...prev,
              passwordCheck:
                password === e.target.value ? "" : "Mật khẩu không trùng khớp",
            }));
          }}
        />
        <span
          onClick={() => setShowPassword3(!showPassword3)}
          className={styles.eye}
        >
          {showPassword3 ? <FaEyeSlash /> : <FaEye />}
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

      {toast.show && <Toast message={toast.message} type={toast.type} />}

      <button onClick={handleChangPass} className={styles.changeBtn}>
        Thay đổi
      </button>
    </form>
  );
}

export default ChangePass;
