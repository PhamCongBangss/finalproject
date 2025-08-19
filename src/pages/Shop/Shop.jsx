import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ShopCard/ProductCard";

import styles from "./Shop.module.css";
import { Flame } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import shopdictionary from "../../utils/shopdictionary";
import usePageTitleByPath from "../../utils/usePageTitleByPath";
import axios from "axios";

function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  usePageTitleByPath();

  const { lang } = useLang();
  const t = shopdictionary[lang];

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [tagActive, setTagActive] = useState(0);

  // Các tag hiển thị tiếng Việt
  const tags = ["Tất cả", "Mũ", "Áo khoác", "Áo thun", "Figure"];
  // Các key category tương ứng gửi query backend
  const tagsKeys = ["", "hat", "jacket", "T-shirt", "figure"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Lấy category theo tag
        const category = tagActive > 0 ? tagsKeys[tagActive] : "";
        const query = [];
        if (category) query.push(`category=${category}`);
        if (searchInput) query.push(`name=${searchInput}`);
        const url = `http://localhost:3001/api/products${
          query.length ? "?" + query.join("&") : ""
        }`;

        const res = await axios.get(url);
        setProducts(res.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [tagActive, searchInput]);

  if (!products) return null;

  return (
    <>
      <Navbar />
      <div className={styles.shopContainer}>
        <div className={styles.productCard}>
          <div className={styles.banner}>
            <div className={styles.backgroundImage}></div>
            <div className={styles.overlay}>
              <div className={styles.icon}>
                <Flame size={32} />
              </div>
              <h1>{t.shopTitle}</h1>
              <p>{t.shopDescription}</p>
            </div>
          </div>

          <div className={styles.filter}>
            <div className={styles.tagContainer}>
              {tags.map((tag, index) => (
                <button
                  onClick={() => setTagActive(index)}
                  key={tag}
                  className={`${styles.tagButton} ${
                    tagActive === index ? styles.isActive : ""
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className={styles.inputBox}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder={t.searchPlaceholder}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>

          {products.length > 0 ? (
            <div className={styles.productDisplay}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className={styles.noProduct}>{t.noProductMessage}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Shop;
