import styles from "./BarStat.module.css";

const Bar = ({ label, value, color }) => {
  const barWidth = `${(value / 10) * 100}%`;

  return (
    <div className={styles.barContainer}>
      <div className={styles.barLabel}>
        <span className={styles.tag}>{label}</span>
      </div>
      <div className={styles.barBg}>
        <div
          className={styles.barFill}
          style={{
            "--bar-width": barWidth,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </div>
  );
};

const BarStat = ({ info }) => {
  return (
    <div className={styles.StatWrapper}>
      <Bar label="Vật lí" value={info.attack} color="#ef4444" />
      <Bar label="Phòng thủ" value={info.defense} color="#3b82f6" />
      <Bar label="Phép thuật" value={info.magic} color="#8b5cf6" />
      <Bar label="Độ khó" value={info.difficulty} color="#f59e0b" />
    </div>
  );
};

export default BarStat;
