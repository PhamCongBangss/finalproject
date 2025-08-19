import { FaTrash } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import { useCart } from "../../context/CartContext";
import styles from "./Checkout.module.css";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast/Toast";
import usePageTitleByPath from "../../utils/usePageTitleByPath";
import axios from "axios";

function Checkout() {
  const token = localStorage.getItem("token");
  usePageTitleByPath();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const { cart, updateQuantity, deleteItem, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [productsData, setProductsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const promises = cart.map((item) =>
          axios.get(`http://localhost:3001/api/products/${item.id}`)
        );
        const responses = await Promise.all(promises);
        const dataMap = {};
        responses.forEach((res) => {
          const product = res.data.data.product;
          dataMap[product._id] = product;
        });
        setProductsData(dataMap);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) fetchProducts();
    else {
      setProductsData({});
      setLoading(false);
    }
  }, [cart]);

  const totalPrice = cart.reduce((total, item) => {
    const product = productsData[item.id];
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setToast({ show: true, message: "Giỏ hàng trống", type: "error" });
      setTimeout(
        () => setToast({ show: false, message: "", type: "error" }),
        1500
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/api/orders",
        {
          fullName,
          phone,
          address,
          note,
          cartItems: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setToast({ show: true, message: "Đặt hàng thành công", type: "success" });
      clearCart();
      setTimeout(
        () => setToast({ show: false, message: "", type: "success" }),
        1500
      );
      navigate("/shop");
    } catch (err) {
      console.error(err.response || err.message);
      setToast({ show: true, message: "Đặt hàng thất bại", type: "error" });
      setTimeout(
        () => setToast({ show: false, message: "", type: "error" }),
        1500
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.checkOutContainer}>
        <div className={styles.cartInfo}>
          <p className={styles.title}>Giỏ hàng của bạn</p>
          <div className={styles.cartInfo}>
            {loading ? (
              <p>Đang tải...</p>
            ) : cart.length === 0 ? (
              <p className={styles.empty}>Không có sản phẩm nào trong giỏ.</p>
            ) : (
              cart.map((cartItem, index) => {
                const product = productsData[cartItem.id];
                if (!product) return null;
                const price = cartItem.quantity * product.price;
                return (
                  <div key={cartItem.itemId} className={styles.cartItem}>
                    <span>{index + 1}</span>
                    <img
                      className={styles.itemImg}
                      src={`http://localhost:3001/img/products/${product.image}`}
                      alt={product.name}
                    />
                    <div className={styles.itemDetail}>
                      <p className={styles.itemName}>{product.name}</p>
                    </div>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() => updateQuantity(cartItem.itemId, -1)}
                        className={styles.qtyBtn}
                      >
                        -
                      </button>
                      <span className={styles.qty}>{cartItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(cartItem.itemId, 1)}
                        className={styles.qtyBtn}
                      >
                        +
                      </button>
                    </div>
                    <p className={styles.price}>
                      {`${price.toLocaleString()} VND`}
                    </p>
                    <button
                      onClick={() => deleteItem(cartItem.itemId)}
                      className={styles.deteleBtn}
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })
            )}
          </div>
          <div className={styles.total}>
            Tổng cộng: {totalPrice.toLocaleString()} VND
          </div>
        </div>

        <div className={styles.shipContainer}>
          <p className={styles.title}>Thông tin giao hàng</p>
          <div className={styles.shipInfo}>
            <p className={styles.optionTitle}>Họ và tên</p>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={styles.inputInfo}
            />
          </div>
          <div className={styles.shipInfo}>
            <p className={styles.optionTitle}>Số điện thoại</p>
            <input
              className={styles.inputInfo}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={`${styles.shipInfo}`}>
            <p className={styles.optionTitle}>Địa chỉ</p>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.inputInfo} ${styles.address}`}
            />
          </div>
          <div className={styles.shipInfo}>
            <p className={styles.optionTitle}>Ghi chú</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={`${styles.inputInfo} ${styles.address}`}
            />
          </div>

          <button onClick={handleCheckout} className={styles.checkOutBtns}>
            Đặt hàng
          </button>
        </div>
        {toast.show && <Toast message={toast.message} type={toast.type} />}
      </div>
    </>
  );
}

export default Checkout;
