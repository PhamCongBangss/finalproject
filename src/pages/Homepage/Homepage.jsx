import { Flame } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <>
      <Navbar />
      <div className={styles.homepageContainer}>
        <div className={styles.banner}>
          <div className={styles.backgroundImage}></div>
          <div className={styles.overlay}>
            <p>Vũ trụ Liên Minh Huyền Thoại</p>
          </div>
        </div>

        <div className={styles.display}>
          <div className={styles.item}>
            <div className={styles.contentLeft}>
              <h2>Vũ trụ tướng Liên Minh Huyền Thoại</h2>
              <p>
                Mỗi vị tướng trong Liên Minh Huyền Thoại là một biểu tượng –
                mang theo câu chuyện, sức mạnh và phong cách chiến đấu riêng
                biệt. Hãy cùng chúng mình khám phá nhé
              </p>
            </div>
            <div className={styles.contentRight}>
              <Link to="/champion" className={styles.background}></Link>
            </div>
          </div>
        </div>

        <div className={styles.display}>
          <div className={styles.item}>
            <div className={styles.contentLeft}>
              <h2>Những nền văn minh khu vực</h2>
              <p>
                Khám phá những vùng đất huyền thoại như Ionia thanh tịnh, Noxus
                hùng mạnh, hay Piltover hiện đại – mỗi khu vực là một nền văn
                minh riêng biệt, nơi các vị tướng được hun đúc bởi lịch sử, văn
                hóa và những cuộc chiến không hồi kết.
              </p>
            </div>
            <div className={styles.contentRight}>
              <Link
                to="/area"
                className={`${styles.background} ${styles.bg2}`}
              ></Link>
            </div>
          </div>
        </div>

        <div className={styles.display}>
          <div className={styles.item}>
            <div className={styles.contentLeft}>
              <h2>Riot Shop</h2>
              <p>
                Tại Riot Shop, bạn sẽ tìm thấy những món đồ độc quyền, từ trang
                phục, phụ kiện đến vật phẩm trưng bày được lấy cảm hứng từ vũ
                trụ Liên Minh Huyền Thoại, Valorant và nhiều tựa game đình đám
                khác. Mỗi sản phẩm không chỉ là vật phẩm, mà còn là cách thể
                hiện cá tính và niềm đam mê của bạn với thế giới Riot.
              </p>
            </div>
            <div className={styles.contentRight}>
              <Link
                to="/shop"
                className={`${styles.background} ${styles.bg3}`}
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
