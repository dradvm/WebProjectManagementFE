import Sidebar from "../SidebarComponents/Sidebar/sidebar";
import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss";
import Header from "../Header/header";

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  return (
    <div className={cx("admin-layout")}>
      <Header />
      <div className={cx("main")}>
        <Sidebar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
