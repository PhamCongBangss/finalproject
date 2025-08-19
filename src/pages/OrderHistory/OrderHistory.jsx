import React, { useEffect, useState } from "react";
import styles from "./OrderHistory.module.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const OrderHistory = () => {
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const res = await axios.get(`http://localhost:3001/api/orders/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error(
          "Error fetching orders:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, token]);

  const getTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
      const price = item.quantity * (item.product?.price || 0);
      return total + price;
    }, 0);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending":
        return "Đang chuẩn bị hàng";
      case "delivering":
        return "Đang giao hàng";
      case "shipped":
        return "Đã giao";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Không rõ";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "delivering":
        return "goldenrod";
      case "shipped":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  if (!user) {
    return (
      <p style={{ color: "white" }}>
        Vui lòng đăng nhập để xem lịch sử đơn hàng.
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lịch sử đơn hàng</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : orders.length === 0 ? (
        <p style={{ color: "white" }}>Chưa có đơn hàng nào.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className={styles.orderCard}>
            <div className={styles.orderInfo}>
              <strong>Mã đơn:</strong> {order._id}
            </div>
            <div className={styles.orderInfo}>
              <strong>Ngày đặt:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div className={styles.orderInfo}>
              <strong>Trạng thái:</strong>{" "}
              <span className={`${styles.status} ${styles[order.status]}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            <div className={styles.productList}>
              {order.products.map((item, idx) => {
                const product = item.product;
                const price = item.quantity * (product?.price || 0);

                return (
                  <div key={idx} className={styles.productItem}>
                    <div className={styles.productDetails}>
                      <img
                        className={styles.img}
                        src={
                          product?.image
                            ? `http://localhost:3001/img/products/${product.image}`
                            : "/ao1.webp"
                        }
                        alt={product?.name || "Sản phẩm"}
                      />
                      <div className={styles.productInfo}>
                        <div>
                          <strong>Tên:</strong> {product?.name || "Không rõ"}
                        </div>
                        {item.size && (
                          <div>
                            <strong>Size:</strong> {item.size}
                          </div>
                        )}
                        <div>
                          <strong>Số lượng:</strong> {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div>
                      <strong>Thành tiền:</strong> {price.toLocaleString()} VND
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.totalPrice}>
              <strong>Tổng cộng:</strong>{" "}
              {getTotalPrice(order.products).toLocaleString()} VND
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
