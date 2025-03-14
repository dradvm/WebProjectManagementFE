import classNames from "classnames/bind";
import styles from "./menu.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function Menu({ items = [], id }) {
  const [isHover, setIsHover] = useState(null);

  return (
    <div className={cx("wrapper")}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cx("menu-item")}
          onMouseEnter={() => setIsHover(index)}
          onMouseLeave={() => setIsHover(null)}
          style={{
            backgroundColor:
              index === isHover ? "var(--form-color-hover)" : "white",
          }}
          onClick={(event) => {
            event.stopPropagation();
            if (item.action) item.action(); // Gọi action khi click
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default Menu;
