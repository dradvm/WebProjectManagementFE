import React, { useState, useEffect } from 'react';
import { List, Input, Button, message, Card, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormItem from '../ContentComponent/FormItem/formItem';
import CreateForm from '../../CreateForm/createForm';
import phieuKhaoSatService from '../../../services/phieuKhaoSatService';
import dayjs from 'dayjs';

const FormList = ({ maDuAn, isOwner }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getFormStatus = (form) => {
    const now = dayjs();
    const startDate = dayjs(form.ngayGioMo);
    const endDate = dayjs(form.ngayGioDong);

    if (now.isBefore(startDate)) {
      return 'upcoming';
    } else if (now.isAfter(endDate)) {
      return 'closed';
    } else {
      return 'active';
    }
  };

  const processFormsData = (data) => {
    return data.map(form => ({
      ...form,
      status: getFormStatus(form)
    }));
  };

  useEffect(() => {
    if (maDuAn) {
      loadForms();
    }
  }, [maDuAn]);

  const loadForms = async () => {
    try {
      setLoading(true);
      const data = await phieuKhaoSatService.getByMaDuAn(maDuAn);
      const processedData = processFormsData(data);
      setForms(processedData);
    } catch (error) {
      message.error('Không thể tải danh sách phiếu khảo sát');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updatedForm) => {
    setForms(prevForms =>
      prevForms.map(form =>
        form.maPhieuKhaoSat === updatedForm.maPhieuKhaoSat ? updatedForm : form
      )
    );
  };

  const handleDelete = async (maPhieuKhaoSat) => {
    try {
      await phieuKhaoSatService.delete(maPhieuKhaoSat);
      message.success('Xóa phiếu khảo sát thành công');
      loadForms();
    } catch (error) {
      message.error('Lỗi khi xóa phiếu khảo sát');
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    loadForms();
  };

  return (
    <Card>
      <Row gutter={[16, 16]}>
        {isOwner && (
          <Col span={24}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showModal}
              >
                Tạo phiếu khảo sát
              </Button>
            </div>
          </Col>
        )}
        <Col span={24}>
          <List
            loading={loading}
            itemLayout="vertical"
            dataSource={forms}
            locale={{
              emptyText: 'Không có phiếu khảo sát nào'
            }}
            renderItem={(form) => (
              <FormItem
                form={form}
                onDelete={handleDelete}
                onRefresh={loadForms}
                onUpdate={handleUpdate}
                isOwner={isOwner}
                hideAnswerButton={form.status === 'closed'}
              />
            )}
          />
        </Col>
      </Row>

      <CreateForm
        open={isModalOpen}
        onCancel={handleModalCancel}
        onSuccess={handleCreateSuccess}
        maDuAn={maDuAn}
        phieuKhaoSatService={phieuKhaoSatService}
      />
    </Card>
  );
};

export default FormList;