import { sidebarItems } from "../../../../routes";
import CreateFrom from "../CreateForm/createForm";
import SidebarItem from "../SidebarItem/sidebarItem";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import { useContext, useState } from "react";
import { sidebarContext } from "../../../../App";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Sidebar() {
  const [active, setActive] = useState(0);
  const sidebarContextData = useContext(sidebarContext);
  if (!sidebarContextData) {
    return <div>Loading...</div>;
  }
  const { sidebarIndexClicked, setSidebarIndexClicked } = sidebarContextData;

  return (
    <div className={cx("wrapper")}>
      <CreateFrom />
      <div className={cx("sidebar-item-wrapper")}>
        {sidebarItems.map((item, index) => (
          <div onClick={() => setActive(index)}>
            <SidebarItem key={index} item={item} index={active} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
