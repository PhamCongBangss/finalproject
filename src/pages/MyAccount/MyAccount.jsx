import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./MyAccout.module.css";
import usePageTitleByPath from "../../utils/usePageTitleByPath";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function MyAccount() {
  const { checkLogin } = useAuth();

  useEffect(() => {
    checkLogin();
  }, []);

  usePageTitleByPath();
  return (
    <>
      <Navbar />
      <div className={styles.profilePage}>
        <div className={styles.option}>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive
                ? `${styles.optionLink} ${styles.active}`
                : styles.optionLink
            }
          >
            Hồ sơ của tôi
          </NavLink>
          <NavLink
            to="orderhistory"
            className={({ isActive }) =>
              isActive
                ? `${styles.optionLink} ${styles.active}`
                : styles.optionLink
            }
          >
            Lich su don hang
          </NavLink>
          <NavLink
            to="changepass"
            className={({ isActive }) =>
              isActive
                ? `${styles.optionLink} ${styles.active}`
                : styles.optionLink
            }
          >
            Thay đổi mật khẩu
          </NavLink>
        </div>

        <Outlet />
      </div>
    </>
  );
}
