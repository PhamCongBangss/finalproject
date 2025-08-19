import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTitleByPath() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    switch (path) {
      case "/homepage":
        document.title = "Trang chủ";
        break;
      case "/shop":
        document.title = "Cửa hàng";
        break;

      case "/login":
        document.title = "Đăng nhập";
        break;

      case "/signup":
        document.title = "Đăng ký";
        break;

      case "/champion":
        document.title = "Tướng";
        break;

      case "/region":
        document.title = "Khu vực";
        break;

      default:
        document.title = "Trang không tồn tại";
        break;
    }
  }, [location.pathname]);
}
