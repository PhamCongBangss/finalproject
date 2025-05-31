import React from "react";
import styles from "./CartDrawer.module.css";
import products from "../../utils/products";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, deleteItem, updateQuantity } = useCart();
  const getProduct = (id) => products.find((product) => product.id === id);

  const totalPrice = cart.reduce((total, item) => {
    const product = getProduct(item.id);
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);

  return (
    <>
      <div
        className={`${styles.overlay} ${!isOpen ? styles.overlayHidden : ""}`}
        onClick={onClose}
      />

      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.header}>
          <h2>GIỎ HÀNG</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.content}>
          {cart.length === 0 ? (
            <p className={styles.empty}>Không có sản phẩm nào trong giỏ.</p>
          ) : (
            cart.map((item, index) => {
              const product = getProduct(item.id);
              if (!product) return null;
              return (
                <div key={index} className={styles.item}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <strong>{product.name}</strong>
                    <p className={styles.price}>
                      {product.price.toLocaleString()} VND
                    </p>
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() => updateQuantity(item.itemId, -1)}
                        className={styles.qtyBtn}
                      >
                        -
                      </button>
                      <span className={styles.qty}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.itemId, 1)}
                        className={styles.qtyBtn}
                      >
                        +
                      </button>

                      <button
                        onClick={() => deleteItem(item.itemId)}
                        className={styles.deteleBtn}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    {item.size && (
                      <p className={styles.size}>Size: {item.size}</p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.total}>
            Tổng cộng: {totalPrice.toLocaleString()} VND
          </div>
          <Link to="/checkout">
            <button className={styles.checkoutBtn}>THANH TOÁN</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
