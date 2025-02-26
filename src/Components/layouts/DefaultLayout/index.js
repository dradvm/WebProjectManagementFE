import classNames from "classnames/bind";
import styles from "./defaultLayout.module.scss";
import Header from "./../Header/header";
import Sidebar from "../../layouts/SidebarComponents/Sidebar/sidebar";
import Content from "./../Content/content";
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className={cx("wrapper")}>
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
