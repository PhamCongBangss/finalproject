import { useEffect, useState } from "react";
import "./ChampionList.css";
import ChampionCard from "../ChampionCard/ChampionCard";
import ChampionModal from "../ChampionModal/ChampionModal";
import { useLang } from "../../context/LanguageContext";

function ChampionList({ searchChamp, tag }) {
  const [champion, setChampion] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentChamp, setCurrentChamp] = useState(null);
  const { lang } = useLang();

  useEffect(() => {
    const fetchChampion = async () => {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/15.9.1/data/${
            lang === "vi" ? "vi_VN" : "en_US"
          }/champion.json`
        );
        const data = await response.json();
        const champions = Object.values(data.data).map((champion) => ({
          id: champion.id,
          title: champion.title,
          tags: champion.tags,
        }));
        console.log(champions);
        setChampion(champions);
      } catch (error) {
        console.error("Error fetching champion data:", error);
      }
    };
    fetchChampion();
  }, [lang]);

  function handleChangeCurrentChamp(champ) {
    setCurrentChamp(champ);
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  if (!champion) return <p>Loading...</p>;

  const champions = champion.filter((champ) => {
    const matchSearch =
      searchChamp.lenngth !== 0
        ? champ.id.toLowerCase().includes(searchChamp.toLowerCase())
        : true;
    const matchSort = tag !== "All" ? champ.tags.includes(tag) : true;
    return matchSearch && matchSort;
  });

  return (
    <>
      <div className="champion-header">
        <img
          className="champion-icon"
          src="../../../public/champicon.png"
          alt=""
        />
        <div className="champion-line-wrapper">
          <div className="line" />
          <h2 className="champion-title">CHAMPIONS</h2>
          <div className="line" />
        </div>
      </div>
      {champions.length === 0 ? (
        <div className="no-champ">No champion found</div>
      ) : (
        <div className="champion">
          {champions.map((champ) => (
            <ChampionCard
              champ={champ}
              handleChangeCurrentChamp={handleChangeCurrentChamp}
            />
          ))}
        </div>
      )}

      {isOpenModal && (
        <ChampionModal
          handleCloseModal={handleCloseModal}
          currentChamp={currentChamp}
        />
      )}
    </>
  );
}

export default ChampionList;
