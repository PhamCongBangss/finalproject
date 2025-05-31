import { useState } from "react";
import styles from "./ProductCard.module.css";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => setLiked(!liked);
  return (
    <Link to={`/shop/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <span className={styles.tag}>{product.tag}</span>
        <button className={styles.heartButton} onClick={toggleLike}>
          <FaHeart
            className={liked ? styles.heartIconActive : styles.heartIcon}
          />
        </button>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{product.price.toLocaleString()} VND</p>
      </div>
    </Link>
  );
}

export default ProductCard;
