import { useEffect, useRef, useState } from "react";
import "./ChampionModal.css";
import BarStat from "../BarStat/BarStat";
import SkinsSlider from "../SkinsSlider/SkinsSlider";
import SkillDetail from "../SkillDetail/SkillDetail";
import { useLang } from "../../context/LanguageContext";

function ChampionModal({ handleCloseModal, currentChamp }) {
  const [champInfo, setChampInfo] = useState(null);
  const [currentSkin, setCurrentSkin] = useState(0);
  const [currentSkill, setCurrentSkill] = useState(4);
  const modalRef = useRef(null);
  const { lang } = useLang();
  useEffect(
    function () {
      const fetchChampions = async () => {
        try {
          if (!currentChamp) return;
          const response = await fetch(
            `https://ddragon.leagueoflegends.com/cdn/15.9.1/data/${
              lang === "vi" ? "vi_VN" : "en_US"
            }/champion/${currentChamp}.json`
          );
          const data = await response.json();
          setChampInfo(data.data);
          console.log("Fetched:", data.data);
          console.log(currentChamp);
        } catch (error) {
          console.error("Error fetching champions:", error);
        }
      };

      fetchChampions();
    },
    [currentChamp, lang]
  );

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (modalRef.current && !modalRef.current.contains(e.target))
          handleCloseModal();
      }

      function handleKeyDown(e) {
        if (e.key === "Escape") {
          handleCloseModal();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },
    [handleCloseModal]
  );

  if (!champInfo) return;

  const power = champInfo[currentChamp].info;
  const passiveImg = champInfo[currentChamp].passive.image.full;
  function handlechangSkins(skin) {
    setCurrentSkin(skin);
  }

  function handleChangeSkills(skill) {
    setCurrentSkill(skill);
  }

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content">
        <img
          className="champion-img"
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${currentChamp}_${currentSkin}.jpg`}
          alt="aatrox_0"
        />
        <div className="champion-info">
          <h2 className="champion-name">
            {currentChamp} - {champInfo[currentChamp].title}
          </h2>

          <button className="close-button" onClick={handleCloseModal}>
            X
          </button>

          <div className="skills">
            <img
              className={currentSkill === 4 ? "skill-active" : ""}
              onClick={() => handleChangeSkills(4)}
              src={`http://ddragon.leagueoflegends.com/cdn/15.9.1/img/passive/${passiveImg}`}
              alt=""
            />

            {champInfo[currentChamp].spells.map((spell, index) => (
              <div onClick={() => handleChangeSkills(index)} key={index}>
                <img
                  className={currentSkill === index ? "skill-active" : ""}
                  src={`https://ddragon.leagueoflegends.com/cdn/15.9.1/img/spell/${spell.image.full}`}
                  alt={spell.name}
                />
              </div>
            ))}
          </div>

          <div className="barstat-skilldetail">
            <BarStat info={power} />
            <SkillDetail
              currentSkill={champInfo[currentChamp].spells[currentSkill]}
              skillLabel={currentSkill}
              passive={champInfo[currentChamp].passive}
            />
          </div>
          <SkinsSlider
            currentChamp={currentChamp}
            handlechangSkins={handlechangSkins}
            currentSkin={currentSkin}
          />
        </div>
      </div>
    </div>
  );
}

export default ChampionModal;
