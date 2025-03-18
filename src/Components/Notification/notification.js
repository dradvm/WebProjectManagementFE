import React from "react";
import classNames from "classnames/bind";
import styles from "./notification.module.scss";

const cx = classNames.bind(styles);

function Notifications({ message }) {
  return (
    <div className={cx("notification")}>
      <p>{message}</p>
    </div>
  );
}

export default Notifications;
