import styles from "./Toast.module.css";
import clsx from "clsx";

function Toast({ message, type = "success" }) {
  return <div className={clsx(styles.toast, styles[type])}>{message}</div>;
}

export default Toast;
