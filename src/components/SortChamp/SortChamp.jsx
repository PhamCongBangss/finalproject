import { useEffect, useRef } from "react";
import "./SortChamp.css";
function SortChamp({ handleChangeTag, handleCloseSort }) {
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
        Tất cả
      </div>
      <div onClick={() => handleChangeTag("Fighter")} className="sort-option">
        Đấu sĩ
      </div>
      <div onClick={() => handleChangeTag("Tank")} className="sort-option">
        Đỡ đòn
      </div>
      <div onClick={() => handleChangeTag("Mage")} className="sort-option">
        Pháp sư
      </div>
      <div onClick={() => handleChangeTag("Assassin")} className="sort-option">
        Sát thủ
      </div>
      <div onClick={() => handleChangeTag("Marksman")} className="sort-option">
        Xạ thủ
      </div>
      <div onClick={() => handleChangeTag("Support")} className="sort-option">
        Hỗ trợ
      </div>
    </div>
  );
}

export default SortChamp;
