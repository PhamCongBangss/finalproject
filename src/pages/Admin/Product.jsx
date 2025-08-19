import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Product.module.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/products");
        setProducts(res.data.data.products);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      }
    };
    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleEdit = (id) => {
    console.log("Sửa sản phẩm:", id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quản lý sản phẩm</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Hàng tồn</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:3001/img/products/${product.image}`}
                    alt={product.name}
                    className={styles.productImg}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()} ₫</td>
                <td>{product.stock}</td>
                <td className={styles.description}>{product.description}</td>
                <td>
                  <button
                    className={`${styles.btn} ${styles.detailBtn}`}
                    onClick={() => openModal(product)}
                  >
                    Xem
                  </button>
                  <button
                    className={`${styles.btn} ${styles.editBtn}`}
                    onClick={() => handleEdit(product._id)}
                  >
                    Sửa
                  </button>
                  <button
                    className={`${styles.btn} ${styles.deleteBtn}`}
                    onClick={() => handleDelete(product._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedProduct && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>{selectedProduct.name}</h3>
            <img
              src={`http://localhost:3001/img/products/${selectedProduct.image}`}
              alt={selectedProduct.name}
              className={styles.modalImg}
            />
            <p>
              <strong>Giá:</strong> {selectedProduct.price.toLocaleString()} ₫
            </p>
            <p>
              <strong>Hàng tồn:</strong> {selectedProduct.stock}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedProduct.description}
            </p>
            <button className={styles.closeBtn} onClick={closeModal}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
