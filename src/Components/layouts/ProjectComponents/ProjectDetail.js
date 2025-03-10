import React, { useState, useEffect } from "react"; 
import styles from "./ProjectDetail.module.scss";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../LoginComponents/InputField.js";

function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProjects] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProject, setEditedProject] = useState({});

    const statusOptions = ["Chưa bắt đầu", "Đang thực hiện", "Hoàn thành", "Không hoàn thành"];

    useEffect(() => {
        axios.get(`http://localhost:5000/projects/${id}`)
            .then((res) => {
                setProjects(res.data);
                setEditedProject(res.data);
            })
            .catch((error) => console.error("Lỗi khi lấy dữ liệu dự án:", error));

        axios.get(`http://localhost:5000/projects/${id}/files`)
            .then((res) => setFileList(res.data))
            .catch((error) => console.error("Lỗi khi lấy dữ liệu tập tin:", error));
    }, [id]);

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

    const handleFileUpload = (e) => {
        const newFiles = Array.from(e.target.files).map(file => ({
            name: file.name,
            url: `/uploads/${file.name}` // Thêm đường dẫn URL tự động
        }));
        setFileList((prevFiles) => [...prevFiles, ...newFiles]);
    };
    
    const handleEdit = () => setIsEditing(true);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProject({ ...editedProject, [name]: value });
    };
    
    const handleSave = async () => {
        const updatedProject = {
            ...editedProject,
            files: fileList.map(file => ({
                name: file.name,
                url: file.url || `/uploads/${file.name}` // Đảm bảo thêm URL nếu thiếu
            }))
        };
    
        try {
            await axios.put(`http://localhost:5000/projects/${id}`, updatedProject);
            setProjects(updatedProject);
            setIsEditing(false);
            alert("Dự án đã được cập nhật thành công!");
        } catch (error) {
            alert("Lỗi khi cập nhật dự án.");
        }
    };
    

    if (!project) return <p>Đang tải dữ liệu...</p>;

    return (
        <div className={styles.projectDetailContainer}>
            <h2>Chi tiết Dự án</h2>
            <div className={styles.projectInfo}>
                {isEditing ? (
                    <>
                        <InputField
                            type="text"
                            name="name"
                            value={editedProject.name}
                            onChange={handleChange}
                        />
                        <textarea
                            name="description"
                            value={editedProject.description}
                            onChange={handleChange}
                        />
                        <InputField
                            type="date"
                            name="startDate"
                            value={editedProject.startDate}
                            onChange={handleChange}
                        />
                        <InputField
                            type="date"
                            name="endDate"
                            value={editedProject.endDate}
                            onChange={handleChange}
                        />
                        {/* Thêm danh sách trạng thái */}
                        <select
                            name="status"
                            value={editedProject.status}
                            onChange={handleChange}
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>

                        {/* Thêm trường nhập tiến độ */}
                        <InputField
                            type="number"
                            name="progress"
                            value={editedProject.progress || ""}
                            onChange={handleChange}
                            placeholder="Phần trăm hoàn thành"
                            min="0"
                            max="100"
                        />
                        <div className={styles.fileSection}>
                            <h3>Tập tin đính kèm</h3>
                            <ul>
                                {fileList.map((file, index) => (
                                    <li key={index}>
                                    <a 
                                        href={file.url} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: '#188e9e', fontWeight: 'bold' }}
                                    >
                                        {file.name}
                                    </a>
                                    </li>
                                ))}
                            </ul>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload} 
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <>
                            <p><strong>Tên dự án:</strong> {project.name}</p>
                            <p><strong>Mô tả:</strong> {project.description}</p>
                            <p><strong>Ngày bắt đầu:</strong> {project.startDate}</p>
                            <p><strong>Ngày kết thúc:</strong> {project.endDate}</p>
                            <p><strong>Trạng thái:</strong> {project.status}</p>
                            <p><strong>Tiến độ:</strong> {project.progress || "0"}%</p>  
                        </>
                        <div className={styles.fileSection}>
                            <h3>Tập tin đính kèm</h3>
                            <ul>
                                {fileList.map((file, index) => (
                                    <li key={index}>
                                    <a 
                                        href={file.url} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: '#188e9e', fontWeight: 'bold' }}
                                    >
                                        {file.name}
                                    </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                    
                    

                    
                )}
            </div>
            

            <div className={styles.actionButtons}>
                {isEditing ? (
                    <button className={styles.save} onClick={handleSave}>Lưu</button>
                ) : (
                    <button className={styles.edit} onClick={handleEdit}>Sửa</button>
                )}
                <button className={styles.delete} onClick={handleDelete}>Xóa</button>
            </div>
        </div>
    );
}

export default ProjectDetail;
