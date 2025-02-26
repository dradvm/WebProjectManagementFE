import classNames from "classnames/bind";
import styles from "./globalStyles.module.scss";

const cx = classNames.bind(styles);

function GlobalStyles({ children }) {
  return <div className={cx("wrapper")}>{children}</div>;
}

export default GlobalStyles;
