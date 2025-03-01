import Sidebar from "../SidebarComponents/Sidebar/sidebar";
import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss"; // Import SCSS
import Header from "../Header/header";

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  <Header />;
  return (
    <div className={cx("admin-layout")}>
      <Sidebar />
      <div className={cx("content")}>{children}</div>
    </div>
  );
}

export default AdminLayout;
