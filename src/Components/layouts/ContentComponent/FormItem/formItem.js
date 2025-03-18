import React from 'react';
import { Card, Button, Space, Popconfirm, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FormLinks from './FormLinks';
import dayjs from 'dayjs';

const FormItem = ({ form, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-form/${form.maPhieuKhaoSat}`);
  };

  const formatDate = (date) => {
    return date ? dayjs(date).format('DD/MM/YYYY HH:mm') : 'Chưa xác định';
  };

  return (
    <Card
      title={form.tenPhieuKhaoSat}
      extra={
        <Space>
          <Popconfirm
            title="Bạn có chắc muốn xóa phiếu khảo sát này?"
            onConfirm={() => onDelete(form.maPhieuKhaoSat)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      }
    >
      <p><strong>Ngày tạo:</strong> {formatDate(form.ngayGioTao)}</p>
      <p><strong>Thời gian mở:</strong> {formatDate(form.ngayGioMo)}</p>
      <p><strong>Thời gian đóng:</strong> {formatDate(form.ngayGioDong)}</p>
      <FormLinks
        lienKet={form.lienKet}
        lienKetTraLoi={form.lienKetTraLoi}
      />
    </Card>
  );
};

export default FormItem;