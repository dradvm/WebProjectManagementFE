import classNames from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import styles from "./sidebarItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import { itemsContext } from "../../../../App";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function SidebarItem({ item, onClick, isChildren, styles, index }) {
  const [loadedIcon, setLoadedIcon] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Kiểm soát mở menu con
  const { sidebarIndexClicked, setSidebarIndexClicked } =
    useContext(itemsContext);
  const [active, setActive] = useState(false);
  const isActive = sidebarIndexClicked === item.path;
  useEffect(() => {
    if (item.icon) {
      const importedIcon = solidIcons[item.icon];
      setLoadedIcon(importedIcon || null);
    }
  }, [item.icon, index, item.id]);

  return (
    <div>
      <div
        onClick={() => {
          setSidebarIndexClicked(item.path);
          setIsOpen(!isOpen);
        }}
        className={cx("wrapper", {
          active: isActive,
          hover: isHovered,
          "is-children": isChildren,
        })}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div>
          <Link
            to={item.path}
            className={cx("link-sidebar-items")}
            style={styles}
          >
            {loadedIcon && (
              <FontAwesomeIcon
                icon={loadedIcon}
                style={{ paddingRight: "8px" }}
              />
            )}
            {item.name}
          </Link>
        </div>
      </div>

      {item.children && isOpen && (
        <div className={cx("submenu")}>
          {item.children.map((child, index) => (
            <SidebarItem
              styles={{ paddingLeft: "20px" }}
              key={index}
              item={child}
              active={sidebarIndexClicked === child.path}
              isChildren={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarItem;
