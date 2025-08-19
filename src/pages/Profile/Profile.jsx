import { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast/Toast";

function Profile() {
  const fileInputRef = useRef();
  const [isShowToast, setIsShowToast] = useState(false);
  const { user, checkLogin, updateMe } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    setCurrentUser({
      username: user?.username || "",
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      avatar: user?.avatar
        ? `http://localhost:3001/img/users/${user.avatar}`
        : "",
    });
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (currentUser.avatar && selectedFile) {
        URL.revokeObjectURL(currentUser.avatar);
      }
      setSelectedFile(file);
      setCurrentUser((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(currentUser);
    setCurrentUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave() {
    console.log(currentUser.avatar);
    console.log(user.avatar);
    const { fullName, email, phone, address } = currentUser;

    updateMe({ fullName, email, phone, address }, selectedFile)
      .then(() => {
        setIsShowToast(true);
        setTimeout(() => {
          setIsShowToast(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (!currentUser) return null;
  return (
    <div className={styles.profileDisplay}>
      <p className={styles.myProfileText}>Hồ sơ của tôi</p>
      <p className={styles.myProfiledes}>
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </p>
      <div className={styles.edit}>
        <div className={styles.profileInfo}>
          <div className={styles.info}>
            <p>Tên đăng nhập</p>
            <input
              name="username"
              value={currentUser.username}
              className={styles.inputInfo}
              type="text"
              readOnly
            />
          </div>

          <div className={styles.info}>
            <p>Họ và tên</p>
            <input
              value={currentUser.fullName}
              className={styles.inputInfo}
              type="text"
              name="fullName"
              onChange={handleChange}
            />
          </div>

          <div className={styles.info}>
            <p>Email</p>
            <input
              value={currentUser.email}
              className={styles.inputInfo}
              type="text"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className={styles.info}>
            <p>Số điện thoại</p>
            <input
              value={currentUser.phone}
              className={styles.inputInfo}
              type="text"
              name="phone"
              onChange={handleChange}
            />
          </div>

          <div className={styles.info}>
            <p>Địa chỉ</p>
            <input
              value={currentUser.address}
              className={styles.inputInfo}
              type="text"
              name="address"
              onChange={handleChange}
            />
          </div>

          {isShowToast && <Toast message="Thay đổi thành công" />}
        </div>

        <div className={styles.avt}>
          <div className={styles.avtImg}>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="avatar"
                className={styles.imgPreview}
              />
            ) : (
              <span>Chưa có ảnh</span>
            )}
          </div>
          <input
            ref={fileInputRef}
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className={styles.uploadBtn}
          >
            Tải ảnh lên
          </button>
        </div>
      </div>

      <div className={styles.saveButtonWrapper}>
        <button onClick={handleSave} className={styles.saveButton}>
          💾 Lưu thay đổi
        </button>
      </div>
    </div>
  );
}

export default Profile;
