import React, { useState, useEffect } from "react";
import styles from "./ProjectDetail.module.scss";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../LoginComponents/InputField.js";
import CreateForm from "../../CreateForm/createForm.js";
import FormList from "../FormList/formList.js";
import AddParticipants from "./AddParticipants.js";

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({});
  // participants ban đầu có thể chỉ là array ID
  const [participants, setParticipants] = useState([]);
  // state này sẽ lưu thông tin chi tiết của từng người dùng
  const [participantDetails, setParticipantDetails] = useState([]);
  const [showAddParticipants, setShowAddParticipants] = useState(false);
  
  // State cho việc mở/đóng các section
  const [isParticipantsExpanded, setIsParticipantsExpanded] = useState(false);
  const [isFilesExpanded, setIsFilesExpanded] = useState(false);
  const [isSurveyExpanded, setIsSurveyExpanded] = useState(false);

  const statusOptions = ["Chưa bắt đầu", "Đang thực hiện", "Hoàn thành", "Không hoàn thành"];

  useEffect(() => {
    // Lấy thông tin dự án
    axios.get(`http://localhost:5000/projects/${id}`)
      .then((res) => {
        setProject(res.data);
        setEditedProject(res.data);
        // Giả sử project.participants lưu danh sách ID
        setParticipants(res.data.participants || []);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu dự án:", error));

    // Lấy danh sách file
    axios.get(`http://localhost:5000/projects/${id}/files`)
      .then((res) => setFileList(res.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu tập tin:", error));
  }, [id]);

  // Sau khi project được load, fetch thông tin chi tiết của các participants
  useEffect(() => {
    if (participants.length > 0) {
      // Giả sử API cho người dùng là: GET /users/{id}
      Promise.all(
        participants.map((userId) =>
          axios.get(`http://localhost:5000/users/${userId}`)
        )
      )
        .then((results) => {
          const details = results.map((res) => res.data);
          setParticipantDetails(details);
        })
        .catch((error) =>
          console.error("Lỗi khi lấy thông tin người tham gia:", error)
        );
    } else {
      setParticipantDetails([]);
    }
  }, [participants]);

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để xóa dự án.");
          return;
        }
        const response = await axios.delete(`http://localhost:5000/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setProject(null);
          alert("Dự án đã được xóa!");
          navigate(-1);
        } else {
          alert("Lỗi khi xóa dự án, vui lòng thử lại.");
        }
      } catch (error) {
        alert(`Lỗi server: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      url: `/uploads/${file.name}`,
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
      files: fileList.map((file) => ({
        name: file.name,
        url: file.url || `/uploads/${file.name}`,
      })),
    };
    try {
      await axios.put(`http://localhost:5000/projects/${id}`, updatedProject);
      setProject(updatedProject);
      setIsEditing(false);
      alert("Dự án đã được cập nhật thành công!");
    } catch (error) {
      alert("Lỗi khi cập nhật dự án.");
    }
  };

  // Hàm callback khi thêm người tham gia thành công
  const handleAddParticipants = (selectedUsers) => {
    // Cập nhật participants trong project và state participants
    setProject((prev) => ({ ...prev, participants: selectedUsers }));
    setParticipants(selectedUsers);
    setShowAddParticipants(false);
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
                      style={{
                        textDecoration: "none",
                        color: "#188e9e",
                        fontWeight: "bold",
                      }}
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
              <input type="file" multiple onChange={handleFileUpload} />
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>Tên dự án:</strong> {project.name} (Chủ dự án: {project.owner})
            </p>
            <p>
              <strong>Mô tả:</strong> {project.description}
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
            <p>
              <strong>Tiến độ:</strong> {project.progress || "0"}%
            </p>
          </>
        )}
      </div>

      <div className={styles.actionButtons}>
        {isEditing ? (
          <button className={styles.save} onClick={handleSave}>
            Lưu
          </button>
        ) : (
          <>
            <CreateForm projectId={id} />
            <button
              className={styles.addMember}
              onClick={() => setShowAddParticipants(true)}
            >
              Thêm người tham gia
            </button>
            <button className={styles.edit} onClick={handleEdit}>
              Sửa
            </button>
          </>
        )}
        <button className={styles.delete} onClick={() => handleDelete(project.id)}>
          Xóa
        </button>
      </div>

      {/* --- Section Người tham gia --- */}
      <div
        className={
          isParticipantsExpanded
            ? `${styles.sectionContainer} ${styles.expanded}`
            : styles.sectionContainer
        }
      >
        <div
          className={styles.sectionHeader}
          onClick={() => setIsParticipantsExpanded((prev) => !prev)}
        >
          Người tham gia
        </div>
        <div className={styles.sectionContent}>
          {participantDetails && participantDetails.length > 0 ? (
            <ul className={styles.participantsList}>
              {participantDetails.map((participant) => (
                <li key={participant.id}>{participant.id} - {participant.fullName}</li>
              ))}
            </ul>
          ) : (
            <p>Chưa có người tham gia.</p>
          )}
        </div>
      </div>

      {/* --- Section Tập tin đính kèm --- */}
      <div
        className={
          isFilesExpanded
            ? `${styles.sectionContainer} ${styles.expanded}`
            : styles.sectionContainer
        }
      >
        <div
          className={styles.sectionHeader}
          onClick={() => setIsFilesExpanded((prev) => !prev)}
        >
          Tập tin đính kèm
        </div>
        <div className={styles.sectionContent}>
          <ul>
            {fileList.map((file, index) => (
              <li key={index}>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#188e9e",
                    fontWeight: "bold",
                  }}
                >
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- Section Phiếu khảo sát --- */}
      <div
        className={
          isSurveyExpanded
            ? `${styles.sectionContainer} ${styles.expanded}`
            : styles.sectionContainer
        }
      >
        <div
          className={styles.sectionHeader}
          onClick={() => setIsSurveyExpanded((prev) => !prev)}
        >
          Phiếu khảo sát
        </div>
        <div className={styles.sectionContent}>
          <FormList projectId={id} />
        </div>
      </div>

      {showAddParticipants && (
        <AddParticipants
          projectId={id}
          onClose={() => setShowAddParticipants(false)}
          onParticipantsAdded={handleAddParticipants}
          currentParticipants={project.participants || []}
        />
      )}

      
    </div>
  );
}

export default ProjectDetail;
