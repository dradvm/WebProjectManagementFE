import React, { useState, useEffect } from 'react';
import { List, Input, Button, message, Card, Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import FormItem from '../ContentComponent/FormItem/formItem';
import CreateForm from '../../CreateForm/createForm';
import phieuKhaoSatService from '../../../services/phieuKhaoSatService';

const FormList = ({ maDuAn }) => {
  const [forms, setForms] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (maDuAn) {
      loadForms();
    }
  }, [maDuAn]);

  const loadForms = async () => {
    try {
      setLoading(true);
      const data = await phieuKhaoSatService.getByMaDuAn(maDuAn);
      setForms(data);
    } catch (error) {
      message.error('Không thể tải danh sách phiếu khảo sát');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      loadForms();
      return;
    }

    try {
      setLoading(true);
      const data = await phieuKhaoSatService.search(searchText);
      setForms(data);
    } catch (error) {
      message.error('Lỗi khi tìm kiếm phiếu khảo sát');
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = (updatedForm) => {
    // Cập nhật state với form đã được cập nhật
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
        <Col span={24}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Input.Search
              placeholder="Tìm kiếm phiếu khảo sát..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleSearch}
              style={{ width: 300 }}
              allowClear
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
            >
              Tạo phiếu khảo sát
            </Button>
          </div>
        </Col>
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