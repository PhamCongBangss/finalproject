import { useEffect, useRef } from "react";
import "./SortChamp.css";
import { useLang } from "../../context/LanguageContext";
function SortChamp({ handleChangeTag, handleCloseSort }) {
  const { lang } = useLang();
  const sortRef = useRef(null);
  useEffect(function () {
    function handleClickOutside(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        handleCloseSort();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={sortRef} className="sort-options">
      <div onClick={() => handleChangeTag("All")} className="sort-option">
        {lang === "vi" ? "Tất cả" : "All"}
      </div>
      <div onClick={() => handleChangeTag("Fighter")} className="sort-option">
        {lang === "vi" ? "Đấu sĩ" : "Fighter"}
      </div>
      <div onClick={() => handleChangeTag("Tank")} className="sort-option">
        {lang === "vi" ? "Đỡ đòn" : "Tank"}
      </div>
      <div onClick={() => handleChangeTag("Mage")} className="sort-option">
        {lang === "vi" ? "Pháp sư" : "Mage"}
      </div>
      <div onClick={() => handleChangeTag("Assassin")} className="sort-option">
        {lang === "vi" ? "Sát thủ" : "Assassin"}
      </div>
      <div onClick={() => handleChangeTag("Marksman")} className="sort-option">
        {lang === "vi" ? "Xạ thủ" : "Marksman"}
      </div>
      <div onClick={() => handleChangeTag("Support")} className="sort-option">
        {lang === "vi" ? "Hỗ trợ" : "Support"}
      </div>
    </div>
  );
}

export default SortChamp;
