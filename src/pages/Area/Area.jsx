import Navbar from "../../components/Navbar/Navbar";
import styles from "./Area.module.css";
import { useLang } from "../../context/LanguageContext";
import dictionaryArea from "../../utils/dictionaryArea";

function Area() {
  const { lang } = useLang();
  const t = dictionaryArea[lang];

  const regions = [
    { key: "demacia", img: "../../../public/demacia.jpg" },
    { key: "noxus", img: "../../../public/noxus.jpg" },
    { key: "ionia", img: "../../../public/ionia.jpg" },
    { key: "piltover", img: "../../../public/piltover.jpg" },
    { key: "freljord", img: "../../../public/frejord1.jpg" },
    { key: "shurima", img: "../../../public/shurima.jpg" },
    { key: "targon", img: "../../../public/targon.jpg" },
    { key: "bandle", img: "../../../public/bandle.jpg" },
    { key: "bilgewater", img: "../../../public/billgaterwater.jpg" },
    { key: "island_of_nightmares", img: "../../../public/dao.jpg" },
  ];

  return (
    <>
      <Navbar />

      <div className={styles.areaContainer}>
        {regions.map((region, index) => (
          <div key={index} className={styles.banner}>
            <div
              className={styles.backgroundImage}
              style={{ backgroundImage: `url(${region.img})` }}
            />
            <div className={styles.overlay}>
              <p>{t[region.key]}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Area;
