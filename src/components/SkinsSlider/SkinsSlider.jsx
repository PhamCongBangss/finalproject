import React, { useEffect, useState } from "react";
import "./SkinsSlider.css";
import { useLang } from "../../context/LanguageContext";

const AatroxSkinsSlider = ({ currentChamp, handlechangSkins, currentSkin }) => {
  const [skins, setSkins] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;
  const { lang } = useLang();

  useEffect(() => {
    const fetchSkins = async () => {
      const res = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/15.9.1/data/${
          lang === "vi" ? "vi_VN" : "en_US"
        }/champion/${currentChamp}.json`
      );
      const data = await res.json();
      const skinList = data.data[currentChamp].skins;
      setSkins(skinList);
    };

    fetchSkins();
  }, []);

  const nextSlide = () => {
    if (startIndex + visibleCount < skins.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleSkins = skins.slice(startIndex, startIndex + visibleCount);

  if (skins.length == 0) return;

  return (
    <div className="slider-container">
      <button
        style={{
          visibility: `${
            startIndex === 0 || skins.length < visibleCount
              ? "hidden"
              : "visible"
          }`,
        }}
        onClick={prevSlide}
        className="slider-arrow"
      >
        &#8592;
      </button>

      <div className="slider-images-wrapper">
        {visibleSkins.map((skin) => (
          <div key={skin.id} className="slider-item">
            <img
              onClick={() => handlechangSkins(skin.num)}
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentChamp}_${skin.num}.jpg`}
              alt={skin.name}
              className={`slider-image ${
                currentSkin === skin.num ? "skill-active" : ""
              }`}
            />
            <p className="slider-name">{skin.name}</p>
          </div>
        ))}
      </div>

      <button
        style={{
          visibility: `${
            startIndex === skins.length - 4 || skins.length < visibleCount
              ? "hidden"
              : "visible"
          }`,
        }}
        onClick={nextSlide}
        className="slider-arrow"
      >
        &#8594;
      </button>
    </div>
  );
};

export default AatroxSkinsSlider;
