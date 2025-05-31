import React from "react";
import styles from "./OrderHistory.module.css";
import { useAuth } from "../../context/AuthContext";
import products from "../../utils/products";

const OrderHistory = () => {
  const { user } = useAuth();
  const getProduct = (id) => products.find((product) => product.id === id);

  const getTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
      const product = getProduct(item.id);
      const price = item.quantity * (product?.price || 0);
      return total + price;
    }, 0);
  };

  if (!user || !user.cart || user.cart.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Lịch sử đơn hàng</h2>
        <p style={{ color: "white" }}>Chưa có đơn hàng nào.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lịch sử đơn hàng</h2>
      {user.cart.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderInfo}>
            <strong>Mã đơn:</strong> {order.id}
          </div>
          <div className={styles.orderInfo}>
            <strong>Ngày đặt:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </div>
          <div className={styles.orderInfo}>
            <strong>Người nhận:</strong> {order.fullname}
          </div>
          <div className={styles.orderInfo}>
            <strong>Điện thoại:</strong> {order.phone}
          </div>
          <div className={styles.orderInfo}>
            <strong>Địa chỉ:</strong> {order.address}
          </div>
          <div className={styles.orderInfo}>
            <strong>Ghi chú:</strong> {order.note}
          </div>

          <div className={styles.productList}>
            {order.cartItems.map((item, idx) => {
              const product = getProduct(item.id);
              const price = item.quantity * (product?.price || 0);

              return (
                <div key={idx} className={styles.productItem}>
                  <div className={styles.productDetails}>
                    <img
                      className={styles.img}
                      src={product?.image || "/ao1.webp"}
                      alt="Sản phẩm"
                    />
                    <div className={styles.productInfo}>
                      <div>
                        <strong>Tên:</strong> {product?.name || "Không rõ"}
                      </div>
                      {item.size ? (
                        <div>
                          <strong>Size:</strong> {item.size}
                        </div>
                      ) : (
                        ""
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
            {getTotalPrice(order.cartItems).toLocaleString()} VND
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
