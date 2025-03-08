import styles from "./createForm.module.scss";
import classNames from "classnames/bind";
import React, { useContext, useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../LoginComponents/Button";
import { itemsContext } from "../../../../App";

const cx = classNames.bind(styles);

function CreateForm() {
  const [isPublished, setIsPublished] = useState(false);
  const linkRef = useRef();
  const nameRef = useRef();
  const { FORMS_API } = useContext(itemsContext);
  const { forms, setForms } = useContext(itemsContext);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    fetch(FORMS_API)
      .then((res) => res.json())
      .then((data) => {
        setForms(data);
        if (data.length > 0) {
          const lastId = data[data.length - 1].id;
          setNextId(parseInt(lastId) + 1); // Tăng ID của form cuối cùng
        }
      });
  }, [FORMS_API, setForms]);

  const handleCreateForm = () => {
    setIsPublished(true);
    window.open("https://docs.google.com/forms/u/0/", "_blank");
  };

  const handleSubmit = () => {
    const newForm = {
      id: nextId.toString(), // Chuyển ID thành chuỗi khi gửi
      name: nameRef.current.value,
      url: linkRef.current.value,
    };

    fetch(FORMS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newForm),
    })
      .then((response) => response.json())
      .then((data) => {
        setForms((prevForms) => [...prevForms, data]);

        setNextId(nextId + 1);
        setIsPublished(false);
      });
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("create-form-btn")} onClick={handleCreateForm}>
        <FontAwesomeIcon icon={faPlus} /> Mới
      </div>

      {isPublished && (
        <div className={cx("published-message")}>
          <p className={cx("success-message")}>
            Form đã được xuất bản thành công!
          </p>
          <div className={cx("form-details")}>
            <div>
              <label>Link của form:</label>
              <input type="text" ref={linkRef} />
            </div>
            <div>
              <label>Tiêu đề của form:</label>
              <input type="text" ref={nameRef} />
            </div>
          </div>
          <Button text="Thêm Form" width="140px" onClick={handleSubmit} />
        </div>
      )}
    </div>
  );
}

export default CreateForm;
