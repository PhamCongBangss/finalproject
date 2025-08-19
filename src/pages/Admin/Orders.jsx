import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Orders.module.css";
import usePageTitleByPath from "../../utils/usePageTitleByPath";

function Orders() {
  usePageTitleByPath();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/orders", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrders(res.data.data.orders);
      } catch (err) {
        console.error(err.response || err.message);
        setError("Không thể lấy danh sách đơn hàng");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:3001/api/orders/${id}/status`,
        { status },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status } : o))
      );
    } catch (err) {
      console.error(err.response || err.message);
      alert("Không thể cập nhật trạng thái đơn hàng");
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  const statusOptions = ["pending", "delivering", "shipped", "cancelled"];

  return (
    <div className={styles.ordersContainer}>
      <h2>Danh sách đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào</p>
      ) : (
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đơn</th>
              <th>Người đặt</th>
              <th>Tổng tiền</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              const totalPrice =
                order.totalPrice ||
                order.products.reduce(
                  (sum, item) =>
                    sum + (item.product?.price || 0) * item.quantity,
                  0
                );
              return (
                <tr key={order._id}>
                  <td>{i + 1}</td>
                  <td>{order._id}</td>
                  <td>{order.user?.fullName || "N/A"}</td>
                  <td>{totalPrice.toLocaleString()} đ</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`${styles.statusSelect} ${
                        styles[order.status]
                      }`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className={styles.detailBtn}
                      onClick={() => setSelectedOrder(order)}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContentLarge}>
            <h3>Chi tiết đơn hàng</h3>
            <p>
              <strong>Mã đơn:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Người đặt:</strong>{" "}
              {selectedOrder.user?.fullName || "N/A"}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {selectedOrder.phone}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {selectedOrder.address}
            </p>
            <p>
              <strong>Ghi chú:</strong> {selectedOrder.note || "Không có"}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedOrder.status}
            </p>

            <h4>Sản phẩm:</h4>
            <div className={styles.productList}>
              {selectedOrder.products.map((p, idx) => (
                <div key={idx} className={styles.productItem}>
                  <img
                    src={`http://localhost:3001/img/products/${p.product.image}`}
                    alt={p.product?.name}
                    className={styles.productImage}
                  />
                  <div>
                    <p>
                      <strong>{p.product?.name}</strong>
                    </p>
                    <p>Số lượng: {p.quantity}</p>
                    <p>Giá: {(p.product?.price || 0).toLocaleString()} đ</p>
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.totalAmount}>
              <strong>Tổng tiền: </strong>
              {(
                selectedOrder.totalPrice ||
                selectedOrder.products.reduce(
                  (sum, item) =>
                    sum + (item.product?.price || 0) * item.quantity,
                  0
                )
              ).toLocaleString()}{" "}
              đ
            </p>

            <button
              className={styles.closeBtn}
              onClick={() => setSelectedOrder(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
