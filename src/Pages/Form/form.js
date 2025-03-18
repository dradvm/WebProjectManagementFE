import { createContext, useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./form.module.scss";
import FormItem from "../../Components/layouts/ContentComponent/FormItem/formItem";
import { itemsContext } from "../../App";
import axios from "axios";
const cx = classNames.bind(styles);

export const formsContext = createContext();

function Form() {
  const { FORMS_API, forms, setForms, deletedForms, setDeletedForms } =
    useContext(itemsContext);

  useEffect(() => {
    fetch(FORMS_API)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setForms(data);
        } else {
          setForms([]);
        }
      });
  }, [FORMS_API, setForms]);
  const handleDeleteForm = async (formId) => {
    try {
      // Tìm form trước khi xóa
      const deletedForm = forms.find((form) => form.id === formId);

      if (!deletedForm) return; // Nếu không tìm thấy form, dừng lại

      // Gửi yêu cầu xóa đến server
      await axios.delete(`http://localhost:5000/items/${formId}`);

      // Lưu form bị xóa vào state
      setDeletedForms((prevDeletedForms) => [...prevDeletedForms, deletedForm]);

      // Cập nhật danh sách form (loại bỏ form bị xóa)
      setForms((prevForms) => prevForms.filter((form) => form.id !== formId));
    } catch (err) {
      alert("Lỗi khi xóa form: " + err.message);
    }
  };
  return (
    <div className={cx("wrapper")}>
      {forms.length > 0 ? (
        forms.map((form, index) => {
          return (
            <FormItem
              key={index}
              url={form.url}
              name={form.name}
              date={form.date}
              id={form.id}
              onDelete={handleDeleteForm}
            />
          );
        })
      ) : (
        <p>No forms available.</p>
      )}
    </div>
  );
}

export default Form;
