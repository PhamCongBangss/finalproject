import "./SkillDetail.css";
function SkillDetail({ currentSkill, skillLabel, passive }) {
  return (
    <div className="skill-detail">
      <p className="skill-name">
        <span className="key-lebel">
          {skillLabel === 0
            ? "Q"
            : skillLabel === 1
            ? "W"
            : skillLabel === 2
            ? "E"
            : skillLabel === 3
            ? "R"
            : "P"}
        </span>
        - {skillLabel <= 3 ? currentSkill.name : passive.name}
      </p>
      <p className="skill-description">
        {skillLabel <= 3
          ? currentSkill.description.replace(/<[^>]+>/g, "")
          : passive.description.replace(/<[^>]+>/g, "")}
      </p>
    </div>
  );
}

export default SkillDetail;
