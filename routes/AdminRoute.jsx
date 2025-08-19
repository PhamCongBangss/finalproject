import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";
import styles from "./AdminRoute.module.css";

export function AdminRoute({ children }) {
  const { user, loadingUser } = useAuth();

  if (loadingUser) return <div className={styles.loading}>Đang tải...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Bạn không có quyền truy cập trang này.</h2>
        <p className={styles.message}>
          Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
        </p>
      </div>
    );
  }

  return children;
}
