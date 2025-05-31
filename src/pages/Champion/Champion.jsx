import { useState } from "react";
import ChampionList from "../../components/ChampionList/ChampionList";
import Navbar from "../../components/Navbar/Navbar";
import SearchChamp from "../../components/SearchChamp/SearchChamp";
import "./Champion.css";

function Champion() {
  const [searchChamp, setSearchChamp] = useState("");
  const [tag, setTag] = useState("All");
  const [isOpenSort, setIsOpenSort] = useState(false);

  function handleOpenSort() {
    setIsOpenSort((isOpenSort) => !isOpenSort);
  }

  function handleCloseSort() {
    setIsOpenSort(false);
  }

  function handleChangeTag(newTag) {
    setTag(newTag);
    setIsOpenSort(false);
  }

  function handleSearchChamp(e) {
    setSearchChamp(e.target.value);
  }

  return (
    <>
      <div className="bg-overlay">
        <img src="../../../public/background.jpg" alt="" />
      </div>

      <Navbar />
      <SearchChamp
        handleChangeTag={handleChangeTag}
        handleSearchChamp={handleSearchChamp}
        searchChamp={searchChamp}
        tag={tag}
        isOpenSort={isOpenSort}
        handleOpenSort={handleOpenSort}
        handleCloseSort={handleCloseSort}
      />
      <ChampionList searchChamp={searchChamp} tag={tag} />
    </>
  );
}

export default Champion;
