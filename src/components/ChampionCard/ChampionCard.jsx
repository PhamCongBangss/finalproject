import "./ChampionCard.css";

function ChampionCard({ champ, handleChangeCurrentChamp }) {
  return (
    <div
      className="champion-card"
      onClick={() => handleChangeCurrentChamp(champ.id)}
    >
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}
        alt="aatrox_0"
      />
      <div className="champion-overlay">
        <p>{champ.id}</p>
        <p className="title">{champ.title}</p>
      </div>
    </div>
  );
}

export default ChampionCard;
