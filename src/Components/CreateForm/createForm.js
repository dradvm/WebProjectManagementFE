import React from 'react';
import { Form, Input, DatePicker, Button, message, Modal, Row, Col } from 'antd';
import dayjs from 'dayjs';

const CreateForm = ({ open, onCancel, onSuccess, maDuAn, phieuKhaoSatService }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Validate thời gian
      if (values.ngayGioMo && values.ngayGioDong) {
        if (dayjs(values.ngayGioMo).isAfter(values.ngayGioDong)) {
          message.error('Thời gian mở phải trước thời gian đóng');
          return;
        }
      }

      const phieuKhaoSat = {
        ...values,
        maDuAn: { maDuAn },
        ngayGioTao: dayjs().format(),
        ngayGioMo: values.ngayGioMo?.format(),
        ngayGioDong: values.ngayGioDong?.format()
      };

      await phieuKhaoSatService.create(phieuKhaoSat);
      message.success('Tạo phiếu khảo sát thành công');
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error('Lỗi khi tạo phiếu khảo sát');
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Tạo phiếu khảo sát mới"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={700}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ngayGioMo: dayjs(),
          ngayGioDong: dayjs().add(7, 'day')
        }}
      >
        <Form.Item
          name="tenPhieuKhaoSat"
          label="Tên phiếu khảo sát"
          rules={[
            { required: true, message: 'Vui lòng nhập tên phiếu khảo sát' },
            { max: 255, message: 'Tên phiếu khảo sát không được vượt quá 255 ký tự' }
          ]}
        >
          <Input
            placeholder="Nhập tên phiếu khảo sát"
            maxLength={255}
            showCount
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="ngayGioMo"
              label="Thời gian mở"
              rules={[{ required: true, message: 'Vui lòng chọn thời gian mở' }]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                style={{ width: '100%' }}
                placeholder="Chọn thời gian mở"
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ngayGioDong"
              label="Thời gian đóng"
              rules={[{ required: true, message: 'Vui lòng chọn thời gian đóng' }]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                style={{ width: '100%' }}
                placeholder="Chọn thời gian đóng"
                disabledDate={(current) => {
                  const startDate = form.getFieldValue('ngayGioMo');
                  return current && (
                    current < dayjs().startOf('day') ||
                    (startDate && current < dayjs(startDate))
                  );
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button type="primary" htmlType="submit">
            Tạo phiếu khảo sát
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;