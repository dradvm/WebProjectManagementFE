import styles from "./ProjectList.module.scss";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { itemsContext } from "../../../App";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function ProjectCard() {
  const { PROJECTS_API, FORMS_API } = useContext(itemsContext);
  const [projects, setProjects] = useState([]);
  console.log(styles.projectCard);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(PROJECTS_API);
        setProjects(response.data);
        console.log(response.data); // In ra dữ liệu thật sự
      } catch (error) {
        console.error("Lỗi khi lấy danh sách dự án:", error);
      }
    };

    fetchProjects();
  }, [PROJECTS_API]); // Chỉ chạy lại nếu PROJECTS_API thay đổi
  return (
    <div className={styles.projectListContainer}>
      <div className={styles.projectList}>
        {projects &&
          projects.map((project, index) => {
            return (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectInfo}>
                  <span className={styles.projectIndex}>
                    {index + 1}. {project.name} - Chủ dự án:{" "}
                    {project.ownerName || "Chưa xác định"}
                  </span>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                  <p>
                    <strong>Ngày bắt đầu:</strong> {project.startDate}
                  </p>
                  <p>
                    <strong>Ngày kết thúc:</strong> {project.endDate}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong> {project.status}
                  </p>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progress}
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor:
                          project.status === "Chưa bắt đầu"
                            ? "gray"
                            : project.status === "Đang thực hiện" ||
                              project.status === "Hoàn thành"
                            ? "green"
                            : "red",
                      }}
                    >
                      {project.progress}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProjectCard;
