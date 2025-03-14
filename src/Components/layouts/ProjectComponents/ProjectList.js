import React from "react";
import styles from "./ProjectList.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import AddProject from "./AddProject";
import { useNavigate } from "react-router-dom";

function ProjectList() {
  const [projects, setProjects] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const today = new Date();
  const navigate = useNavigate();

  const onViewDetail = (project) => {
    navigate(`/project/${project.id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa dự án này?"
    );
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để xóa dự án.");
          return;
        }
        // Gửi request DELETE kèm token trong headers
        const response = await axios.delete(
          `http://localhost:5000/projects/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Xóa thành công
        if (response.status === 200) {
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project.id !== id)
          );
          alert("Dự án đã được xóa!");
        } else {
          alert("Lỗi khi xóa dự án, vui lòng thử lại.");
        }
      } catch (error) {
        alert(`Lỗi server: ${error.response?.data?.message || error.message}`);
      }
    }
  };
  //Them du lieu moi
  const handleAddProject = async (newProject) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm dự án.");
        return;
      }

      // Tính toán trạng thái dự án ngay tại đây
      const today = new Date();
      const startDate = new Date(newProject.startDate);
      const endDate = new Date(newProject.endDate);

      let status = "Chưa bắt đầu";
      if (today >= startDate && today <= endDate) {
        status = "Đang thực hiện";
      } else if (today > endDate) {
        status =
          newProject.progress === 100 ? "Hoàn thành" : "Không hoàn thành";
      }

      const response = await axios.post(
        "http://localhost:5000/projects",
        { ...newProject, status }, // Thêm trạng thái vào dữ liệu gửi đi
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setProjects((prevProjects) => [...prevProjects, response.data]);
        alert("Dự án đã được thêm thành công!");
      } else {
        alert("Lỗi khi thêm dự án, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi server:", error);
      alert(`Lỗi server: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects")
      .then((res) => {
        const updatedProjects = res.data.map(async (project) => {
          const today = new Date();
          const startDate = new Date(project.startDate);
          const endDate = new Date(project.endDate);

          let status = "Chưa bắt đầu";
          if (today >= startDate && today <= endDate) {
            status = "Đang thực hiện";
          } else if (today > endDate) {
            status =
              project.progress === 100 ? "Hoàn thành" : "Không hoàn thành";
          }

          // Kiểm tra nếu trạng thái mới khác trạng thái hiện tại
          if (status !== project.status && project.id) {
            try {
              await axios.patch(
                `http://localhost:5000/projects/${project.id}`,
                { status }
              );
            } catch (error) {
              console.error(
                `Lỗi khi cập nhật trạng thái cho dự án ${project.id}:`,
                error
              );
            }
          }

          return { ...project, status };
        });

        // Chờ tất cả các cập nhật trạng thái hoàn thành trước khi setProjects
        Promise.all(updatedProjects).then((data) => {
          const uniqueProjects = data.reduce((acc, project) => {
            if (!acc.some((p) => p.id === project.id)) {
              acc.push(project);
            }
            return acc;
          }, []);
          setProjects(uniqueProjects);
        });
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu từ server:", error));
  }, []);

  return (
    <div className={styles.projectListContainer}>
      <h2>Danh sách Dự án</h2>
      <button
        className={styles.addProjectButton}
        onClick={() => setShowAddModal(true)}
      >
        Thêm dự án
      </button>
      <div className={styles.projectList}>
        {projects &&
          projects.map((project, index) => {
            const startDate = new Date(project.startDate);
            const endDate = new Date(project.endDate);
            const today = new Date();

            return (
              <div key={project.id} className={styles.projectCard}>
                <div className={styles.projectInfo}>
                  <span className={styles.projectIndex}>
                    {index + 1}. {project.name}
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

                <div className={styles.actionContainer}>
                  <div className={styles.actionButtons}>
                    <button
                      className={styles.viewDetail}
                      onClick={() => onViewDetail(project)}
                    >
                      Xem chi tiết
                    </button>
                    <button
                      className={styles.delete}
                      onClick={() => handleDelete(project.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {showAddModal && (
        <AddProject
          onClose={() => setShowAddModal(false)}
          onAddProject={handleAddProject}
        />
      )}
    </div>
  );
}

export default ProjectList;
