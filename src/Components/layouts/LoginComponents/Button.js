import React from "react";
import styles from "./Button.module.scss";

const Button = ({ text, onClick, width }) => {
  return (
    <button className={styles.button} onClick={onClick} style={{ width }}>
      {text}
    </button>
  );
};

export default Button;
