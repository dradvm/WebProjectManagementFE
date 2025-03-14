import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import axios from "axios";
import styles from "./ManageUsers.module.scss";

const API_URL = "http://localhost:5000/users";

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
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    }
    setLoading(false);
  };
  console.log("users", users);
  const handleAddOrUpdateUser = async (values) => {
    try {
      if (editingUser) {
        await axios.put(`${API_URL}/${editingUser.id}`, values);
      } else {
        const newUser = { ...values, status: "Hoạt động" };
        await axios.post(API_URL, newUser);
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      console.error("Lỗi xử lý người dùng:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
    form.setFieldsValue(user);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Hoạt động" ? "Vô hiệu hóa" : "Hoạt động";
    try {
      await axios.patch(`${API_URL}/${id}`, { status: newStatus });
      loadUsers();
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
    }
  };

  const columns = [
    { title: "Mã", dataIndex: "id", key: "id" },
    { title: "Họ và Tên", dataIndex: "fullName", key: "fullName" },
    { title: "Giới tính", dataIndex: "gender", key: "gender" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Quyền", dataIndex: "role", key: "role" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={status === "Vô hiệu hóa" ? styles["status-disabled"] : styles["status-active"]}>
          {status}
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
            className={record.status === "Hoạt động" ? styles["disable-button"] : styles["activate-button"]}
            onClick={() => handleToggleStatus(record.id, record.status)}
          >
            {record.status === "Hoạt động" ? "Vô hiệu hóa" : "Kích hoạt"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className={styles["table-container"]}>
      <h2 className={styles["title"]}>QUẢN LÝ NGƯỜI DÙNG</h2>
      <div className={styles["button-container"]}>
        <Button className={styles["add-user-button"]} onClick={() => setIsModalOpen(true)}>
          Thêm người dùng
        </Button>
      </div>
      <Table dataSource={users} columns={columns} loading={loading} rowKey="id" className={styles["custom-table"]} />

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
          <Form.Item name="id" label="Mã người dùng" rules={[{ required: true, message: "Vui lòng nhập mã người dùng!" }]}>
            <Input disabled={!!editingUser} />
          </Form.Item>
          <Form.Item name="fullName" label="Họ và Tên" rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nữ">Nữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Vui lòng nhập email hợp lệ!" }]}>
            <Input />
          </Form.Item>
          {!editingUser && (
            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item name="role" label="Quyền" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="User">User</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUsers;
