import { useContext } from "react";
import { itemsContext } from "../../App";
import FormItem from "../../Components/layouts/ContentComponent/FormItem/formItem";
import classNames from "classnames/bind";
import styles from "./trash.module.scss";
import axios from "axios";
const cx = classNames.bind(styles);

function Trash() {
  const { trash, setTrash, deletedForms, setDeletedForms, forms, setForms } =
    useContext(itemsContext);
  const handleDeleteForm = async (formId) => {
    try {
      const deletedForm = deletedForms.find((form) => form.id === formId);
      if (!deletedForm) return;

      setDeletedForms((prevForms) => {
        return prevForms.filter((form) => form.id !== formId);
      });
    } catch (err) {
      alert("Lỗi khi xóa form: " + err.message);
    }
  };
  return (
    <div className={cx("wrapper")}>
      {deletedForms.map((form, index) => {
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
      })}
    </div>
  );
}

export default Trash;
