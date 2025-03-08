import classNames from "classnames/bind";
import styles from "./menu.module.scss";
import { useState, useContext, useEffect } from "react";
import { itemsContext } from "../../App";

const cx = classNames.bind(styles);
function Menu({ items = [], id }) {
  const { FORMS_API } = useContext(itemsContext);
  const { forms, setForms } = useContext(itemsContext);
  const [isHover, setIsHover] = useState();
  const handleClick = (item) => {
    console.log(`${FORMS_API}/${id}`);

    if (item.type === "delete") {
      fetch(`${FORMS_API}/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          fetch(FORMS_API)
            .then((res) => res.json())
            .then((data) => setForms(data));
        })
        .catch((error) => {
          console.error("Lỗi khi xóa", error);
        });
    }
  };

  return (
    <div className={cx("wrapper")}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cx("menu-item")}
          onMouseEnter={() => setIsHover(index)}
          style={{
            backgroundColor:
              index == isHover ? "var(--form-color-hover)" : "white",
          }}
          onClick={(event) => {
            event.stopPropagation();
            handleClick(item);
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default Menu;
