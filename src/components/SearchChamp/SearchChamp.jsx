import "./SearchChamp.css";
import SortChamp from "../SortChamp/SortChamp";

function SearchChamp({
  handleSearchChamp,
  searchChamp,
  handleChangeTag,
  tag,
  isOpenSort,
  handleOpenSort,
  handleCloseSort,
}) {
  return (
    <div className="search-filter-container">
      <div className="search-container">
        <img
          src="../../../public/champicon.png"
          alt=""
          className="search-icon"
        />
        <input
          value={searchChamp}
          type="text"
          placeholder="Tim tuong"
          className="search-input"
          onChange={handleSearchChamp}
        />
      </div>

      <div className="sort-container">
        <div onClick={handleOpenSort} className="sort">
          {tag === "All"
            ? "Tất cả"
            : tag === "Fighter"
            ? "Đấu sĩ"
            : tag === "Tank"
            ? "Đỡ đòn"
            : tag === "Mage"
            ? "Pháp sư"
            : tag === "Assassin"
            ? "Sát thủ"
            : tag === "Marksman"
            ? "Xạ thủ"
            : "Hỗ trợ"}
          <span style={{ fontSize: "20px" }}>▼</span>
        </div>

        {isOpenSort && (
          <SortChamp
            handleChangeTag={handleChangeTag}
            handleOpenSort={handleOpenSort}
            handleCloseSort={handleCloseSort}
          />
        )}
      </div>
    </div>
  );
}

export default SearchChamp;
