import React from "react";
import styles from "./InputField.module.scss";

const InputField = ({ type,name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      className={styles.input}
    />
  );
};

export default InputField;