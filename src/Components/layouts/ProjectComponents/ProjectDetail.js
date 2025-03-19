import React, { useState, useEffect } from "react";
import styles from "./ProjectDetail.module.scss";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../LoginComponents/InputField.js";
import FormList from "../FormList/formList.js";
import duAnService from "../../../services/duAnService.js";
import AddParticipants from "./AddParticipants.js";
import tapTinService from "../../../services/tapTinService.js";
import userService from "../../../services/userService.js";

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [files, setFiles] = useState([])
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

  const [statusOptions, setStatusOptions] = useState([]);

  const [isDuAnOwner, setIsDuAnOwner] = useState(null)

  useEffect(() => {
    duAnService.getDuAn(id)
      .then((res) => {
        setProject(res.data);
        setEditedProject(res.data);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu dự án:", error));
    duAnService.getListTrangThai()
      .then((res) => {
        setStatusOptions(res.data)
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu dự án:", error));
    tapTinService.loadFilesDuAn(id)
      .then((res) => {
        setFileList(res.data)
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu dự án:", error));
    userService.getListNguoiDungInDuAn(id)
      .then((res) => {
        console.log(res.data)
        setParticipantDetails(res.data)
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu dự án:", error));
    duAnService.isOwner(id)
      .then((res) => {
        setIsDuAnOwner(res.data)
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu dự án:", error));
    // Lấy danh sách file
    // axios.get(`http://localhost:5000/projects/${id}/files`)
    //   .then((res) => setFileList(res.data))
    //   .catch((error) => console.error("Lỗi khi lấy dữ liệu tập tin:", error));
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa dự án này?"
    );
    if (confirmDelete) {
      try {
        // const token = localStorage.getItem("token");
        // if (!token) {
        //   alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để xóa dự án.");
        //   return;
        // }
        // Gửi request DELETE kèm token trong headers

        duAnService.deleteDuAn(id)
          .then((res) => {
            alert("Dự án đã được xóa!");
            navigate("/project")
          })
          .catch((err) => {
            alert("Lỗi khi xóa dự án, vui lòng thử lại.");
          })

        // const response = await axios.delete(
        //   `http://localhost:5000/projects/${id}`,
        //   {
        //     headers: { Authorization: `Bearer ${token}` },
        //   }
        // );

        // Xóa thành công
        // if (response.status === 200) {
        //   setProjects((prevProjects) =>
        //     prevProjects.filter((project) => project.id !== id)
        //   );
        //   alert("Dự án đã được xóa!");
        // } else {
        //   alert("Lỗi khi xóa dự án, vui lòng thử lại.");
        // }
      } catch (error) {
        alert(`Lỗi server: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const handleFileUpload = (e) => {


    const files = e.target.files
    const newFiles = Array.from(files).map((file) => {
      return {
        name: file.name,
        url: `/uploads/${file.name}`,
      }
    });
    setFiles(files)
    setFileList2(() => [...newFiles]);



  };

  const handleEdit = () => setIsEditing(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tienDoHoanThanh") {
      const progressValue = Math.min(Math.max(Number(value), 0), 100);
      setEditedProject({ ...editedProject, [name]: progressValue });
    } else {
      setEditedProject({ ...editedProject, [name]: value });
    }
  };

  const handleSave = async () => {
    duAnService.editInformationDuAn(id, {
      tenDuAn: editedProject.tenDuAn,
      moTa: editedProject.moTa,
      ngayBatDau: editedProject.ngayBatDau,
      ngayKetThuc: editedProject.ngayKetThuc,
      trangThai: editedProject.trangThai,
      tienDoHoanThanh: editedProject.tienDoHoanThanh
    })
      .then((res) => {
        setIsEditing(false)
        duAnService.getDuAn(id)
          .then((res) => {
            setProject(res.data);
          })
          .catch((error) => console.error("Lỗi khi lấy dữ liệu dự án:", error));
      })
      .catch((err) => {
        console.log(err)
      })
    if (files.length !== 0) {
      const formData = new FormData()
      formData.append("maDuAn", id)
      Array.from(files).forEach((file) => {
        formData.append("files", file)
      })
      tapTinService.uploadFiles(formData)
        .then(() => tapTinService.loadFilesDuAn(id))
        .then((res) => {
          setFileList(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // const updatedProject = {
    //   ...editedProject,
    //   files: fileList.map((file) => ({
    //     name: file.name,
    //     url: file.lienKet || `/uploads/${file.name}`,
    //   })),
    // };
    // try {
    //   await axios.put(`http://localhost:5000/projects/${id}`, updatedProject);
    //   setProject(updatedProject);
    //   setIsEditing(false);
    //   alert("Dự án đã được cập nhật thành công!");
    // } catch (error) {
    //   alert("Lỗi khi cập nhật dự án.");
    // }

  };

  // Hàm callback khi thêm người tham gia thành công
  const handleAddParticipants = () => {
    // Cập nhật participants trong project và state participants
    // setProject((prev) => ({ ...prev, participants: selectedUsers }));
    // setParticipants(selectedUsers);
    userService.getListNguoiDungInDuAn(id)
      .then((res) => {
        setParticipantDetails(res.data)
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu dự án:", error));
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
              name="tenDuAn"
              value={editedProject.tenDuAn}
              onChange={handleChange}
            />
            <textarea
              name="moTa"
              value={editedProject.moTa}
              onChange={handleChange}
            />
            <InputField
              type="date"
              name="ngayBatDau"
              value={editedProject.ngayBatDau}
              onChange={handleChange}
            />
            <InputField
              type="date"
              name="ngayKetThuc"
              value={editedProject.ngayKetThuc}
              onChange={handleChange}
            />
            <select
              name="trangThai"
              value={editedProject.trangThai}
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
              name="tienDoHoanThanh"
              value={editedProject.tienDoHoanThanh}
              onChange={handleChange}
              placeholder="Phần trăm hoàn thành"
              min="0"
              max="100"
            />
            <div className={styles.fileSection}>
              <h3>Thêm tập tin đính kèm</h3>
              <ul>
                {fileList2.map((file, index) => (
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
            <>
              <p>
                <strong>Tên dự án:</strong> {project.tenDuAn}
              </p>
              <p>
                <strong>Mô tả:</strong> {project.moTa}
              </p>
              <p>
                <strong>Ngày bắt đầu:</strong> {project.ngayBatDau}
              </p>
              <p>
                <strong>Ngày kết thúc:</strong> {project.ngayKetThuc}
              </p>
              <p>
                <strong>Trạng thái:</strong> {project.trangThai}
              </p>
              <p>
                <strong>Tiến độ:</strong> {project.tienDoHoanThanh || "0"}%
              </p>
            </>
            {/* <div className={styles.fileSection}>
              <h3>Tập tin đính kèm</h3>
              <ul>
                {fileList.map((file, index) => (
                  <li key={index}>
                    <a
                      href={file.lienKet}
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
            </div> */}
          </>
        )}
      </div>

      {isDuAnOwner ?
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
        : <></>}

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
                <li key={participant.maNguoiDung}>{participant.maNguoiDung} - {participant.hoTen}</li>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px", padding: "10px" }}>
            {fileList.length > 0 ? (
              fileList.map((file, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    textAlign: "center",
                    background: "#f9f9f9",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                  onClick={() => window.open(file.lienKet, "_blank", "noopener noreferrer")}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#e0f7fa")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                >
                  <div style={{ fontSize: "40px", color: "#188e9e" }}>📄</div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#188e9e",
                      marginTop: "8px",
                      wordBreak: "break-word",
                    }}
                  >
                    {file.tenTapTin}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ gridColumn: "span 3", textAlign: "center" }}>Chưa có tệp tin nào.</p>
            )}
          </div>
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
          <FormList maDuAn={id} />
        </div>
      </div>

      {showAddParticipants && (
        <AddParticipants
          projectId={id}
          onClose={() => setShowAddParticipants(false)}
          onParticipantsAdded={handleAddParticipants}
        />
      )}


    </div>
  );
}

export default ProjectDetail;
