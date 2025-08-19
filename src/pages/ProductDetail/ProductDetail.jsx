import styles from "./ProductDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Toast from "../../components/Toast/Toast";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext"; // ✅ import hook CartContext
import axios from "axios";
import Reviews from "../../components/Reviews/Reviews";
import { Star } from "lucide-react";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const { addToCart } = useCart(); // ✅ lấy hàm addToCart
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/products/${productId}`
        );
        setProduct(res.data.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [productId]);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) return null;

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    addToCart(product.id, "M", quantity); // ✅ thêm sản phẩm vào giỏ hàng, size tạm là "M"
    setToast({
      show: true,
      message: "Đã thêm vào giỏ hàng",
      type: "success",
    });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "error" });
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className={styles.productDetailContainer}>
        <div className={styles.productImageSection}>
          <img
            src={`http://localhost:3001/img/products/${product.image}`}
            alt={product.name}
          />
        </div>
        <div className={styles.productInfoSection}>
          <h1 className={styles.productName}>
            {product.name}
            <span className={styles.averageRating}>
              <span className={styles.ratingText}>
                {product.rating ? product.rating.toFixed(1) : 0}
                <Star color="yellow" size={30} className={styles.starIcon} /> (
                {product.numReviews || 0})
              </span>
            </span>
          </h1>

          <p className={styles.price}>{product.price.toLocaleString()} VND</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.quantityControl}>
            <p>Số lượng</p>
            <button onClick={decreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>

          <button onClick={handleAddToCart} className={styles.buyButton}>
            Thêm vào giỏ hàng
          </button>
        </div>

        {toast.show && <Toast message={toast.message} type={toast.type} />}

        <Reviews />
      </div>
    </>
  );
}

export default ProductDetail;
