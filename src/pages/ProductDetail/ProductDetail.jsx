import styles from "./ProductDetail.module.css";
import productsVi from "../../utils/products";
import productsEn from "../../utils/productsEn";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useCart } from "../../context/CartContext";
import { useLang } from "../../context/LanguageContext";
import Toast from "../../components/Toast/Toast";
import { useAuth } from "../../context/AuthContext";

function ProductDetail() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const { lang } = useLang();

  const products = lang === "vi" ? productsVi : productsEn;
  const { productId } = useParams();
  const product = products.find((product) => product.id == productId);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.size ? "M" : "");

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const sizes = ["XS", "S", "M", "L", "XL", "2XL"];

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <>
      <Navbar />
      <div className={styles.productDetailContainer}>
        <div className={styles.productImageSection}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={styles.productInfoSection}>
          <h1>{product.name}</h1>
          <p className={styles.price}>{product.price.toLocaleString()} VND</p>
          <p className={styles.description}>{product.description}</p>

          {product.size && (
            <div className={styles.sizeSection}>
              <p> {lang === "vi" ? "Kích thướcthước" : "size"}</p>
              <div className={styles.sizeList}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeButton} ${
                      selectedSize === size ? styles.activeSize : ""
                    }`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className={styles.quantityControl}>
            <p> {lang === "vi" ? "Số lượng" : "quantity"}</p>
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>

          <button
            onClick={() => {
              if (!user) {
                navigate("/login");
                return;
              }
              addToCart(product.id, selectedSize, quantity);
              setToast({
                show: true,
                message: "Đã thêm vào giỏ hàng",
                type: "success",
              });

              setTimeout(() => {
                setToast({ show: false, message: "", type: "error" });
              }, 1000);
            }}
            className={styles.buyButton}
          >
            {lang === "vi" ? "Thêm vào giỏ hàng" : "Add to cart"}
          </button>
        </div>

        {toast.show && <Toast message={toast.message} type={toast.type} />}
      </div>
    </>
  );
}

export default ProductDetail;
