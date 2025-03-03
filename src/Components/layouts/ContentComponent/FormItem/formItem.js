import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./formItem.module.scss"; // Renamed to formItem.module.scss for clarity
const cx = classNames.bind(styles);

function FormItem({ url, name, date }) {
  return (
    <a href={url} className={cx("wrapper", "default-link")}>
      <div className={cx("content")}>
        <p className={cx("name")}>{name}</p>
        <p className={cx("date")}>{date}</p>
      </div>
    </a>
  );
}

export default FormItem;
