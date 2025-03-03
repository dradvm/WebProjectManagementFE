import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./form.module.scss";
import FormItem from "../../Components/layouts/ContentComponent/FormItem/formItem";
const cx = classNames.bind(styles);

function Form() {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setForms(data));
  }, []);
  return (
    <div className={cx("wrapper")}>
      {forms.map((form, index) => {
        return (
          <FormItem
            key={index}
            url={form.url}
            name={form.name}
            date={form.date}
          />
        );
      })}
    </div>
  );
}

export default Form;
