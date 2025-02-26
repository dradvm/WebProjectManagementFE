import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import styles from "./sidebarItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import { sidebarContext } from "../../../../App";

const cx = classNames.bind(styles);

function SidebarItem({ name, icon, onClick, active, index }) {
  const [loadedIcon, setLoadedIcon] = useState(null);
  const [isHovered, setIsHovered] = useState(false); // State kiểm tra hover
  const { sidebarIndexClicked, setSidebarIndexClicked } =
    useContext(sidebarContext);
  useEffect(() => {
    if (!icon) return;
    const importedIcon = solidIcons[icon];
    setLoadedIcon(importedIcon || null);
  }, [icon]);
  const classBackground = active ? "active" : isHovered ? "hover" : "";
  return (
    <div
      onClick={onClick}
      className={cx("wrapper", classBackground)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loadedIcon && (
        <FontAwesomeIcon icon={loadedIcon} style={{ paddingRight: "8px" }} />
      )}{" "}
      {name}
    </div>
  );
}

export default SidebarItem;
