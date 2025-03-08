import { sidebarItems, adminSidebarItems } from "../../../../routes";
import CreateFrom from "../CreateForm/createForm";
import SidebarItem from "../SidebarItem/sidebarItem";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { itemsContext } from "../../../../App";
import { Link, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function Sidebar() {
  const [active, setActive] = useState(0);
  const sidebarContextData = useContext(itemsContext);
  const location = useLocation();

  if (!sidebarContextData) {
    return <div>Loading...</div>;
  }

  const { userRole } = sidebarContextData; // Lấy userRole từ context

  const isAdmin = userRole === "user"; // Kiểm tra quyền admin

  return (
    <div className={cx("wrapper")}>
      <CreateFrom />
      <div className={cx("sidebar-item-wrapper")}>
        {(isAdmin ? adminSidebarItems : sidebarItems).map((item, index) => (
          <div key={index} onClick={() => setActive(index)}>
            <SidebarItem item={item} index={active} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
