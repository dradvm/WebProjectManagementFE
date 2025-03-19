import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import createAxios from "../../utils/axios";
import styles from "./ManageUsers.module.scss";
import { notification } from "antd";

const axios = await createAxios();
const API_URL = "/users";

const openNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
    placement: "topRight",
  });
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);

      setUsers(response.data);
      openNotification("success", "Tải dữ liệu thành công", "Danh sách người dùng đã được tải.");
    } catch (error) {
      console.log("axios", axios);
      console.error("Lỗi tải dữ liệu:", error);
      openNotification("error", "Không thể tải dữ liệu", "Kiểm tra lại kết nối hoặc API.");
    }

    setLoading(false);
  };

  const handleAddOrUpdateUser = async (values) => {

    try {
      if (editingUser) {
        await axios.put(`${API_URL}/${editingUser.maNguoiDung}`, values);
        openNotification("success", "Thành công", "Người dùng đã được cập nhật.");

      } else {
        const newUser = { ...values, active: true }; // Báo cáo mặc định active nếu tạo người mới
        await axios.post(API_URL, newUser);
        openNotification("success", "Thành công", "Người dùng mới đã được thêm.");
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      console.error("Lỗi xử lý người dùng:", error);
      openNotification("error", "Lỗi", "Không thể xử lý yêu cầu của bạn.");
    }

  };

  const handleEdit = (user) => {
    const formattedUser = {
      ...user,
      gender: user.laNam ? "Nam" : "Nữ", // Đổi thành giá trị "Nam"/"Nữ"
    };
    setEditingUser(user);
    setIsModalOpen(true);
    form.setFieldsValue(formattedUser);
  };

  const handleToggleStatus = async (maNguoiDung, currentStatus) => {
    const newStatus = !currentStatus;  // Đảo ngược trạng thái true -> false và ngược lại
    try {
      await axios.patch(`${API_URL}/${maNguoiDung}/active/${newStatus}`);
      loadUsers();
      openNotification("success", "Thành công", "Cập nhật trạng thái thành công.");
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
    }
  };


  const columns = [
    { title: "Mã", dataIndex: "maNguoiDung", key: "maNguoiDung" },
    { title: "Họ và Tên", dataIndex: "hoTen", key: "hoTen" },
    {
      title: "Giới tính",
      dataIndex: "laNam",
      key: "laNam",
      render: (laNam) => (laNam ? "Nam" : "Nữ"),
    },
    { title: "Số điện thoại", dataIndex: "soDienThoai", key: "soDienThoai" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Quyền",
      dataIndex: "maQuyen",
      key: "maQuyen",
      render: (maQuyen) => maQuyen?.tenQuyen || "Chưa xác định"
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (active) => (
        <span className={active ? styles["status-active"] : styles["status-disabled"]}>
          {active ? "Hoạt động" : "Vô hiệu hóa"}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button className={styles["edit-button"]} onClick={() => handleEdit(record)}>
            Chỉnh sửa
          </Button>
          <Button
            className={record.active ? styles["disable-button"] : styles["activate-button"]}
            onClick={() => handleToggleStatus(record.maNguoiDung, record.active)}
          >
            {record.active ? "Vô hiệu hóa" : "Kích hoạt"}
          </Button>

        </>
      ),
    },
  ];

  return (
    <div className={styles["table-container"]}>
      <div className={styles["button-container"]}>
        <Button className={styles["add-user-button"]} onClick={() => setIsModalOpen(true)}>
          Thêm người dùng
        </Button>
      </div>
      <Table dataSource={users} columns={columns} loading={loading} rowKey="maNguoiDung" className={styles["custom-table"]} pagination={{ pageSize: 10 }}
      />

      {/* Modal Thêm/Sửa Người Dùng */}
      <Modal
        title={editingUser ? "Chỉnh sửa Người Dùng" : "Thêm Người Dùng"}
        open={isModalOpen}
        className={styles["modal-form"]}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingUser(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" className={styles["modal-form"]} onFinish={handleAddOrUpdateUser}>
          <Form.Item name="maNguoiDung" label="Mã người dùng" rules={[{ required: true, message: "Vui lòng nhập mã người dùng!" }]}>
            <Input disabled={!!editingUser} />
          </Form.Item>
          <Form.Item name="hoTen" label="Họ và Tên" rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="laNam" label="Giới tính" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="true">Nam</Select.Option>
              <Select.Option value="false">Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="soDienThoai" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ!" }]}
          >
            <Input disabled={!!editingUser} />
          </Form.Item>
          {!editingUser && (
            <Form.Item name="matKhau" label="Mật khẩu" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item name="maQuyen" label="Quyền" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Q2">Quản trị viên</Select.Option>
              <Select.Option value="Q1">Người dùng</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUsers;
