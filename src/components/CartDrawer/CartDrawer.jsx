import React, { useEffect, useState } from "react";
import styles from "./CartDrawer.module.css";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, deleteItem, updateQuantity } = useCart();
  const [productsData, setProductsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const dataPromises = cart.map((item) =>
          axios.get(`http://localhost:3001/api/products/${item.id}`)
        );
        const responses = await Promise.all(dataPromises);

        const productsMap = {};
        responses.forEach((res) => {
          const product = res.data.data.product;
          productsMap[product._id] = product;
        });
        setProductsData(productsMap);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchProducts();
    } else {
      setProductsData({});
      setLoading(false);
    }
  }, [cart]);

  const totalPrice = cart.reduce((total, item) => {
    const product = productsData[item.id];
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
          {loading ? (
            <p>Đang tải...</p>
          ) : cart.length === 0 ? (
            <p className={styles.empty}>Không có sản phẩm nào trong giỏ.</p>
          ) : (
            cart.map((item) => {
              const product = productsData[item.id];
              if (!product) return null;
              return (
                <div key={item.itemId} className={styles.item}>
                  <img
                    src={`http://localhost:3001/img/products/${product.image}`}
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
