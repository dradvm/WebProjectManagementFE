import { useContext } from "react";
import { itemsContext } from "../../App";
import FormItem from "../../Components/layouts/ContentComponent/FormItem/formItem";
import classNames from "classnames/bind";
import styles from "./trash.module.scss";
import axios from "axios";
const cx = classNames.bind(styles);

function Trash() {
  const { trash, setTrash, TRASH_API } = useContext(itemsContext);
  axios.get(TRASH_API).then((data) => setTrash(data.data));
  return (
    <div className={cx("wrapper")}>
      {trash.length > 0 ? (
        trash.map((form, index) => {
          return (
            <FormItem
              key={index}
              url={form.url}
              name={form.name}
              date={form.date}
              id={form.id}
            />
          );
        })
      ) : (
        <p>No trash available.</p>
      )}
    </div>
  );
}

export default Trash;
