import {
  faComment,
  faDiagramProject,
  faList,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CreateFrom from "../CreateForm/createForm";
import SidebarItem from "../SidebarItem/sidebarItem";
import styles from "./sidebar.module.scss";
import classNames from "classnames/bind";
import { useContext } from "react";
import { sidebarContext } from "../../../../App";
import { Link } from "react-router-dom";
import { publicRoutes } from "../../../../routes";
const cx = classNames.bind(styles);
function Sidebar() {
  const { sidebarIndexClicked, setSidebarIndexClicked } =
    useContext(sidebarContext);
  const sidebarItems = [
    { name: "Trang chủ", icon: "faHouse" },
    { name: "Dự án", icon: "faDiagramProject" },
    { name: "Thông báo", icon: "faComment" },
    { name: "Danh mục Forms", icon: "faList" },
    { name: "Thùng rác", icon: "faTrash" },
  ];
  return (
    <div className={cx("wrapper")}>
      <CreateFrom />
      <div className={cx("sidebar-item-wrapper")}>
        {publicRoutes.map((route, index) => {
          return (
            <Link
              to={route.path}
              key={index}
              className={cx("link-sidebar-items")}
            >
              <SidebarItem
                key={index}
                index={index}
                name={sidebarItems[index].name}
                icon={sidebarItems[index].icon}
                onClick={() => setSidebarIndexClicked(index)}
                active={sidebarIndexClicked === index}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
