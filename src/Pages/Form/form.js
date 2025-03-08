import { createContext, useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./form.module.scss";
import FormItem from "../../Components/layouts/ContentComponent/FormItem/formItem";
import { itemsContext } from "../../App";
const cx = classNames.bind(styles);

export const formsContext = createContext();
function Form() {
  const { FORMS_API, forms, setForms } = useContext(itemsContext);
  useEffect(() => {
    fetch(FORMS_API)
      .then((response) => response.json())
      .then((data) => {
        setForms(data);
      });
  }, []);

  return (
    <formsContext.Provider value={{ forms, setForms }}>
      <div className={cx("wrapper")}>
        {forms.map((form, index) => {
          return (
            <FormItem
              key={index}
              url={form.url}
              name={form.name}
              date={form.date}
              id={form.id}
            />
          );
        })}
      </div>
    </formsContext.Provider>
  );
}

export default Form;
