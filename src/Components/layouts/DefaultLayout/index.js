import classNames from "classnames/bind";
import styles from "./defaultLayout.module.scss";
import Header from "./../Header/header";
import Sidebar from "../../layouts/SidebarComponents/Sidebar/sidebar";
import Content from "../ContentComponent/Content/content";
import { useContext } from "react";
import { itemsContext } from "../../../App";
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  const { userRole } = useContext(itemsContext);

  return (
    <div>
      <Header />
      <div className={cx("wrapper")}>
        <Sidebar />
        <div style={{ flex: "1" }}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
