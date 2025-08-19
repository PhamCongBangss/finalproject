import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateProduct.module.css";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "hat",
    price: "",
    stock: "",
    discount: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const categories = ["hat", "jacket", "T-shirt", "figure"];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append text fields
      for (let key in formData) {
        data.append(key, formData[key]);
      }

      // Append file
      if (image) {
        data.append("image", image);
      }

      await axios.post("http://localhost:3001/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Thêm sản phẩm thành công!");
      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "hat",
        price: "",
        stock: "",
        discount: "",
      });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err.response || err.message);
      alert("Có lỗi xảy ra khi thêm sản phẩm");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Thêm sản phẩm mới</h2>

      <label className={styles.label}>Tên sản phẩm</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={styles.input}
        required
      />

      <label className={styles.label}>Mô tả</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className={styles.textarea}
        required
      />

      <label className={styles.label}>Danh mục</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className={styles.select}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <label className={styles.label}>Số lượng tồn kho</label>
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        min="0"
        className={styles.input}
      />

      <label className={styles.label}>Giá (VNĐ)</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        min="0"
        className={styles.input}
        required
      />

      <label className={styles.label}>Giảm giá (%)</label>
      <input
        type="number"
        name="discount"
        value={formData.discount}
        onChange={handleChange}
        min="0"
        max="100"
        className={styles.input}
      />

      <label className={styles.label}>Ảnh sản phẩm</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.fileInput}
      />

      {preview && (
        <div className={styles.preview}>
          <img src={preview} alt="preview" className={styles.imgPreview} />
        </div>
      )}

      <button type="submit" className={styles.submitBtn}>
        Thêm sản phẩm
      </button>
    </form>
  );
};

export default CreateProduct;
