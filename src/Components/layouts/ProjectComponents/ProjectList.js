import React from "react";
import styles from "./ProjectList.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import AddProject from "./AddProject";

function ProjectList() {
  const [projects, setProjects] = useState();
  const [showAddModal, setShowAddModal] = useState(false);
  const today = new Date();

  const onViewDetail = (project) => {
    alert(`Xem chi tiết dự án: ${project.name}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa dự án này?");
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
          setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
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
  
      const response = await axios.post(
        "http://localhost:5000/projects",
        newProject,
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
      alert(`Lỗi server: ${error.response?.data?.message || error.message}`);
    }
  };
  
  useEffect(() => {
    axios.get("http://localhost:5000/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, []);

  return (
    <div className={styles.projectListContainer}>
      
      <h2>Danh sách Dự án</h2>
      <button className={styles.addProjectButton} onClick={() => setShowAddModal(true)}>Thêm dự án</button>
      <div className={styles.projectList}>
        {projects && projects.map((project, index) => {
          const endDate = new Date(project.endDate);
          const isOverdue = today > endDate && project.progress < 100;

          return (
           
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectInfo}>
                <span className={styles.projectIndex}>{index + 1}. {project.name} </span>
                
                <p className={styles.projectDescription}>{project.description}</p>
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
                      backgroundColor: isOverdue ? "red" : "green",
                    }}
                  >
                    {project.progress}%
                  </div>
                </div>
              </div>

              <div className={styles.actionContainer}>
                <div className={styles.actionButtons}>
                  <button className={styles.viewDetail} onClick={() => onViewDetail(project)}>
                    Xem chi tiết
                  </button>
                  <button className={styles.delete} onClick={() => handleDelete(project.id)}>
                    Xóa
                  </button>
                </div>
              </div>
              
            </div>
            
          );
        })}
      </div>
      {showAddModal && (
        <AddProject onClose={() => setShowAddModal(false)} onAddProject={handleAddProject} />
      )}
    </div>
  );
}

export default ProjectList;
