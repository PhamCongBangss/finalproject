import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ShopCard/ProductCard";
import productsVi from "../../utils/products";
import productsEn from "../../utils/productsEn";

import styles from "./Shop.module.css";
import { Flame } from "lucide-react";
import { useLang } from "../../context/LanguageContext";
import shopdictionary from "../../utils/shopdictionary";

function Shop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { lang } = useLang();

  const products = lang === "vi" ? productsVi : productsEn;

  console.log("Lang is:", lang);
  console.log("First product name:", products[0].name);
  console.log(products);

  const t = shopdictionary[lang];

  const [searchInput, setSearchInput] = useState("");

  const [tagActive, setTagActive] = useState(0);

  function sortProducts() {
    const sortTags = ["all", "hat", "jacket", "tee", "figure"];
    const activeTag = sortTags[tagActive];
    return products.filter((product) => {
      const matchTag = activeTag === "all" || product.tag === activeTag;
      const matchSearch = product.name
        .toLowerCase()
        .includes(searchInput.toLowerCase());
      return matchTag && matchSearch;
    });
  }

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
              {t.tags.map((tag, index) => (
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

          {console.log(sortProducts())}

          {sortProducts().length > 0 ? (
            <div className={styles.productDisplay}>
              {sortProducts().map((product) => (
                <ProductCard key={product.id} product={product} />
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
