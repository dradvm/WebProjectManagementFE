import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./form.module.scss";
const cx = classNames.bind(styles);
function FormItem({ url, name, date }) {
  return (
    <a href={url} className={cx("wrapper", "default-link")}>
      <p>{name}</p>

      <p>{date}</p>
    </a>
  );
}

export default FormItem;
