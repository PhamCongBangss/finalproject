import { useEffect, useState } from "react";
import styles from "./ProductCard.module.css";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function ProductCard({ product }) {
  const discountedPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked(!liked);
  console.log(product.image);
  return (
    <Link data-aos="fade-up" to={`/shop/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={`http://localhost:3001/img/products/${product.image}`}
          alt={product.name}
          className={styles.image}
        />
        <span className={styles.tag}>{product.category}</span>
        <button className={styles.heartButton} onClick={toggleLike}>
          <FaHeart
            className={liked ? styles.heartIconActive : styles.heartIcon}
          />
        </button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.priceContainer}>
          <p className={styles.price}>{product.price.toLocaleString()} VND</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
