import { FaTrash } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import { useCart } from "../../context/CartContext";
import styles from "./Checkout.module.css";
import products from "../../utils/products";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/Toast/Toast";

function Checkout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const { cart, updateQuantity, deleteItem, buyProduct, clearCart } = useCart();

  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const getProduct = (id) => products.find((product) => product.id === id);

  const totalPrice = cart.reduce((total, item) => {
    const product = getProduct(item.id);
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);

  return (
    <>
      <Navbar />
      <div className={styles.checkOutContainer}>
        <div className={styles.cartInfo}>
          <p className={styles.title}>Giỏ hàng của bạn</p>
          <div className={styles.cartInfo}>
            {cart.map((cartItem, index) => {
              const product = getProduct(cartItem.id);
              const price = cartItem.quantity * product.price;
              return (
                <div key={index} className={styles.cartItem}>
                  <span>{index + 1}</span>
                  <img
                    className={styles.itemImg}
                    src={product.image}
                    alt={product.name}
                  />
                  <div className={styles.itemDetail}>
                    <p className={styles.itemName}>{product.name}</p>
                    {cartItem.size && (
                      <p className={styles.size}>Size: {cartItem.size}</p>
                    )}
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
            })}
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
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
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

          <button
            onClick={() => {
              setToast({
                show: true,
                message: "Đặt hàng thành công",
                type: "success",
              });
              setTimeout(() => {
                buyProduct({ fullname, phone, address, note, cartItems: cart });
                clearCart();
                setToast({ show: false, message: "", type: "error" });
                navigate("/shop");
              }, 1000);
            }}
            className={styles.checkOutBtns}
          >
            Đặt hàng
          </button>
        </div>
        {toast.show && <Toast message={toast.message} type={toast.type} />}
      </div>
    </>
  );
}

export default Checkout;
