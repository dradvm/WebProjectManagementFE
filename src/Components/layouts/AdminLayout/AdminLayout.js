import Sidebar from "../SidebarComponents/Sidebar/sidebar";
import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss"; // Import SCSS

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  return (
    <div className={cx("admin-layout")}>
      <Sidebar />
      <div className={cx("content")}>{children}</div>
    </div>
  );
}

export default AdminLayout;
