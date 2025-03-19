import React, { useState } from 'react';
import { Card, Button, Space, Popconfirm, message, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import FormLinks from './FormLinks';
import EditForm from './EditForm';
import dayjs from 'dayjs';
import styles from './formItem.module.scss';

const FormItem = ({ form, onDelete, onUpdate, isOwner }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleEditSuccess = (updatedForm) => {
    if (onUpdate) {
      onUpdate(updatedForm);
    }
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
  };

  const formatDate = (date) => {
    return date ? dayjs(date).format('DD/MM/YYYY HH:mm') : 'Chưa xác định';
  };

  return (
    <>
      <Card
        className={styles.formCard}
        title={form.tenPhieuKhaoSat}
        extra={
          isOwner && (
            <Space>
              <Popconfirm
                title="Bạn có chắc muốn xóa phiếu khảo sát này?"
                onConfirm={() => onDelete(form.maPhieuKhaoSat)}
                okText="Có"
                cancelText="Không"
              >
                <Button danger icon={<DeleteOutlined />}>Xóa</Button>
              </Popconfirm>
              <Tooltip title="Chỉnh sửa thông tin phiếu khảo sát" placement="top">
                <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                  Chỉnh sửa
                </Button>
              </Tooltip>
            </Space>
          )
        }
      >
        <div className={styles.formContent}>
          <div className={styles.formInfo}>
            <p><strong>Ngày tạo:</strong> {formatDate(form.ngayGioTao)}</p>
            <p><strong>Thời gian mở:</strong> {formatDate(form.ngayGioMo)}</p>
            <p><strong>Thời gian đóng:</strong> {formatDate(form.ngayGioDong)}</p>
          </div>
          <div className={styles.formActions}>
            <FormLinks
              lienKet={form.lienKet}
              lienKetTraLoi={form.lienKetTraLoi}
              isOwner={isOwner}
              form={form}
            />
          </div>
        </div>
      </Card>

      <EditForm
        visible={isEditModalVisible}
        onCancel={handleCancel}
        form={form}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};

export default FormItem;