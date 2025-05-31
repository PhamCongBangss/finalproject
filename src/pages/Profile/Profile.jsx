import { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast/Toast";

function Profile() {
  const fileInputRef = useRef();
  const [isShowToast, setIsShowToast] = useState(false);
  const { user, updateUser } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser({
      username: user?.username || "",
      fullname: user?.fullname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      avatar: user?.avatar || "",
    });
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;

        setCurrentUser((prev) => ({
          ...prev,
          avatar: base64data,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave() {
    const { fullname, email, phone, address, avatar } = currentUser;
    updateUser({ fullname, email, phone, address, avatar });
    setIsShowToast(true);
    setTimeout(() => {
      setIsShowToast(false);
    }, 1000);
  }

  if (!currentUser) return;
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
              value={currentUser.fullname}
              className={styles.inputInfo}
              type="text"
              name="fullname"
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
