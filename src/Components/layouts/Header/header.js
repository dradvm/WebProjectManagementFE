import classNames from "classnames/bind";
import styles from "./header.module.scss";
const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-logo-wrapper")}>
        <img src="/assets/logo.png" className={cx("logo")} />
        <p className={cx("title")}>CTU-Drive</p>
      </div>
    </div>
  );
}

export default Header;
