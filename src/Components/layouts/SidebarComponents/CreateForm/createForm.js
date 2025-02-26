import styles from "./createForm.module.scss";
import classNames from "classnames/bind";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function CreateForm() {
  return (
    <div className={cx("wrapper")}>
      <FontAwesomeIcon icon={faPlus} /> Mới
    </div>
  );
}

export default CreateForm;
