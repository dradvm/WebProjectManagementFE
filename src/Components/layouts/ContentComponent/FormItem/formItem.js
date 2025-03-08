import { useState, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./formItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Menu from "../../../Menu/menu";

const cx = classNames.bind(styles);

function FormItem({ url, name, date, id }) {
  const [isHover, setIsHover] = useState(false);
  const menuRef = useRef(null);
  const items = [
    { name: "Xóa forms", type: "delete" },
    { name: "Chỉnh sửa", type: "edit" },
  ];
  // Xử lý khi click vào FormItem
  const handleClick = (event) => {
    if (menuRef.current && menuRef.current.contains(event.target)) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    window.location.href = url;
  };

  return (
    <div className={cx("wrapper")} onClick={handleClick}>
      <div className={cx("content")}>
        <p className={cx("name")}>{name}</p>
        <p className={cx("date")}>{date}</p>
      </div>
      <div
        className={cx("options")}
        ref={menuRef}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={(e) => e.stopPropagation()} // Ngăn chặn click lan ra FormItem
      >
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          style={{ paddingRight: "8px" }}
        />
        {isHover && <Menu items={items} id={id} />}
      </div>
    </div>
  );
}

export default FormItem;
