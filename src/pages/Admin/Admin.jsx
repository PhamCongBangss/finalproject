import { NavLink, Outlet } from "react-router-dom";
import styles from "./Admin.module.css";

export default function Admin() {
  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
        >
          Tổng quan
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
        >
          Người dùng
        </NavLink>
        <NavLink
          to="products"
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
        >
          Sản phẩm
        </NavLink>
        <NavLink
          to="orders"
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
        >
          Đơn hàng
        </NavLink>
      </nav>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
