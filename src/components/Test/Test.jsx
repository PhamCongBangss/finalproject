import axios from "axios";
import { useEffect, useState } from "react";

function Test() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => {
        setProducts(res.data.data.products);
      })
      .catch((err) => {
        console.error("Lỗi gọi API:", err);
      });
  }, []);
  return (
    <>
      <div>
        <h1>Danh sách sản phẩm</h1>
        <ul>
          {products.map((p) => (
            <li key={p._id}>
              {p.name} {p.price}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Test;
