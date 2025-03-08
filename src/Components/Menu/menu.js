import classNames from "classnames/bind";
import styles from "./menu.module.scss";
import { useState, useContext, useEffect } from "react";
import { itemsContext } from "../../App";
import axios from "axios";

const cx = classNames.bind(styles);

function Menu({ items = [], id }) {
  const { FORMS_API, forms, setForms, trash, setTrash, TRASH_API } =
    useContext(itemsContext);
  const [isHover, setIsHover] = useState();

  const handleClick = (item) => {
    if (item.type === "delete") {
      fetch(`${FORMS_API}/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          axios.post(TRASH_API, data);
        });
      fetch(`${FORMS_API}/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          setForms((prevForms) => prevForms.filter((form) => form.id !== id));
        });
    }

    if (item.type === "edit") {
      fetch(`${FORMS_API}/${id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setForms((prevForms) =>
            prevForms.map((form) =>
              form.id === id ? { ...form, ...data } : form
            )
          );
        });

      const selectItem = forms.find((form) => form.id == id);
      if (selectItem) {
        window.open(selectItem.url, "_blank");
      }
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
