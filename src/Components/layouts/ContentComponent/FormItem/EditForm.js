import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, message, Space, Typography, Card } from 'antd';
import { EditOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import phieuKhaoSatService from '../../../../services/phieuKhaoSatService';

const { Title } = Typography;

const EditForm = ({ visible, onCancel, form, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formInstance] = Form.useForm();

    useEffect(() => {
        if (visible && form) {
            formInstance.setFieldsValue({
                tenPhieuKhaoSat: form.tenPhieuKhaoSat,
                ngayGioMo: form.ngayGioMo ? dayjs(form.ngayGioMo) : null,
                ngayGioDong: form.ngayGioDong ? dayjs(form.ngayGioDong) : null,
            });
        }
    }, [visible, form]);

    const handleSubmit = async () => {
        try {
            const values = await formInstance.validateFields();
            setLoading(true);

            const updatedForm = {
                ...form,
                tenPhieuKhaoSat: values.tenPhieuKhaoSat,
                ngayGioMo: values.ngayGioMo?.toISOString(),
                ngayGioDong: values.ngayGioDong?.toISOString(),
            };

            const response = await phieuKhaoSatService.update(form.maPhieuKhaoSat, updatedForm);
            if (response) {
                message.success('Cập nhật phiếu khảo sát thành công!');
                onSuccess(response);
                onCancel();
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật phiếu khảo sát:', error);
            message.error('Có lỗi xảy ra khi cập nhật phiếu khảo sát');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={
                <Space>
                    <EditOutlined />
                    <Title level={4} style={{ margin: 0 }}>Chỉnh sửa phiếu khảo sát</Title>
                </Space>
            }
            open={visible}
            onCancel={onCancel}
            onOk={handleSubmit}
            confirmLoading={loading}
            okText="Cập nhật"
            cancelText="Hủy"
            width={600}
            centered
        >
            <Card>
                <Form
                    form={formInstance}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="tenPhieuKhaoSat"
                        label={
                            <Space>
                                <EditOutlined />
                                <span>Tên phiếu khảo sát</span>
                            </Space>
                        }
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên phiếu khảo sát!' },
                            { max: 200, message: 'Tên phiếu khảo sát không được vượt quá 200 ký tự!' }
                        ]}
                    >
                        <Input
                            placeholder="Nhập tên phiếu khảo sát"
                            maxLength={200}
                            showCount
                        />
                    </Form.Item>

                    <Form.Item
                        name="ngayGioMo"
                        label={
                            <Space>
                                <CalendarOutlined />
                                <span>Thời gian mở</span>
                            </Space>
                        }
                        rules={[
                            { required: true, message: 'Vui lòng chọn thời gian mở!' }
                        ]}
                    >
                        <DatePicker
                            showTime={{ format: 'HH:mm' }}
                            format="DD/MM/YYYY HH:mm"
                            placeholder="Chọn thời gian mở"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="ngayGioDong"
                        label={
                            <Space>
                                <CalendarOutlined />
                                <span>Thời gian đóng</span>
                            </Space>
                        }
                        rules={[
                            { required: true, message: 'Vui lòng chọn thời gian đóng!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || !getFieldValue('ngayGioMo') || value.isAfter(getFieldValue('ngayGioMo'))) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Thời gian đóng phải sau thời gian mở!'));
                                },
                            }),
                        ]}
                        dependencies={['ngayGioMo']}
                    >
                        <DatePicker
                            showTime={{ format: 'HH:mm' }}
                            format="DD/MM/YYYY HH:mm"
                            placeholder="Chọn thời gian đóng"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Form>
            </Card>
        </Modal>
    );
};

export default EditForm; 