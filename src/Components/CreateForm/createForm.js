import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../layouts/LoginComponents/InputField";
import styles from "./createForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const CreateForm = ({ projectId }) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [survey, setSurvey] = useState({
    name: "",
    link: "",
    createdAt: new Date().toISOString().slice(0, 10),
    openAt: "",
    closeAt: "",
    projectId: "",
  });

  const handleOpenGoogleForm = () => {
    setShowForm(true);

    window.open("https://docs.google.com/forms/u/0/", "_blank"); // Sau đó mở Google Form
  };

  const handleSurveyChange = (e) => {
    const { name, value } = e.target;
    setSurvey({ ...survey, [name]: value, projectId: projectId });
  };

  const handleSaveSurvey = async () => {
    if (!survey.name || !survey.link) {
      alert("Vui lòng nhập tên và liên kết khảo sát!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/items", survey);
      alert("Lưu khảo sát thành công!");
      window.location.reload(); // Load lại trang sau khi nhấn OK
    } catch (error) {
      alert("Lỗi khi lưu khảo sát: " + error.message);
    }
  };

  return (
    <div className={styles.createFormContainer}>
      <button className={styles.createButton} onClick={handleOpenGoogleForm}>
        Tạo Khảo Sát
      </button>

      {showForm && (
        <div className={styles.formContainer}>
          <div className={cx("form-close")} onClick={() => setShowForm(false)}>
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className={cx("form-header")}>
            <h2>Nhập thông tin khảo sát</h2>
          </div>
          <InputField
            type="text"
            name="name"
            placeholder="Tên khảo sát"
            value={survey.name}
            onChange={handleSurveyChange}
          />
          <InputField
            type="text"
            name="link"
            placeholder="Link Google Form"
            value={survey.link}
            onChange={handleSurveyChange}
          />
          <InputField
            type="date"
            name="openAt"
            value={survey.openAt}
            onChange={handleSurveyChange}
          />
          <InputField
            type="date"
            name="closeAt"
            value={survey.closeAt}
            onChange={handleSurveyChange}
          />
          <button className={styles.saveButton} onClick={handleSaveSurvey}>
            Lưu khảo sát
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateForm;
