import React, { createContext, useContext, useEffect, useState } from "react";
import { List, Input, message, Card, Row, Col, Typography, Tag, Space } from 'antd';
import { SearchOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from "./form.module.scss";
import dayjs from 'dayjs';

import FormItem from "../../Components/layouts/ContentComponent/FormItem/formItem";
import { itemsContext } from "../../App";
import phieuKhaoSatService from '../../services/phieuKhaoSatService';

const { Title, Text } = Typography;
export const formsContext = createContext();

function Form() {
  const { FORMS_API } = useContext(itemsContext);
  const [forms, setForms] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

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

  const getCardClassName = (status) => {
    switch (status) {
      case 'upcoming':
        return styles.upcomingForm;
      case 'active':
        return styles.activeForm;
      case 'closed':
        return styles.closedForm;
      default:
        return '';
    }
  };

  const processFormsData = (data) => {
    return data.map(form => ({
      ...form,
      status: getFormStatus(form)
    }));
  };

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await phieuKhaoSatService.getAll();
        if (Array.isArray(data)) {
          const processedData = processFormsData(data);
          setForms(processedData);
        } else {
          console.warn("Server trả về dữ liệu không hợp lệ:", data);
          setForms([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phiếu khảo sát:", error);
        setForms([]);
      }
    };

    fetchForms();
  }, [FORMS_API]);

  const loadForms = async () => {
    try {
      setLoading(true);
      const data = await phieuKhaoSatService.getAll();
      const processedData = processFormsData(data);
      setForms(processedData);
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
      const processedData = processFormsData(data);
      setForms(processedData);
    } catch (error) {
      message.error('Lỗi khi tìm kiếm phiếu khảo sát');
    } finally {
      setLoading(false);
    }
  };

  const renderLegend = () => (
    <div className={styles.legend}>
      <Space size="middle">
        <Text>Chú thích:</Text>
        <Tag color="gold" icon={<ClockCircleOutlined />}>
          Chưa mở (Không thể trả lời)
        </Tag>
        <Tag color="success" icon={<CheckCircleOutlined />}>
          Đang mở (Có thể trả lời)
        </Tag>
        <Tag color="error" icon={<CloseCircleOutlined />}>
          Đã đóng (Không thể trả lời)
        </Tag>
      </Space>
    </div>
  );

  return (
    <div className={styles.formPageContainer}>
      <Card
        className={styles.mainCard}
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Title
              level={2}
              className={styles.pageTitle}
            >
              Danh sách Khảo sát
            </Title>
          </Col>

          <Col span={24}>
            <div className={styles.searchAndLegendContainer}>
              <div className={styles.searchContainer}>
                <Input.Search
                  placeholder="Tìm kiếm phiếu khảo sát..."
                  prefix={<SearchOutlined className={styles.searchIcon} />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onSearch={handleSearch}
                  className={styles.searchInput}
                  size="large"
                  allowClear
                />
              </div>
              {renderLegend()}
            </div>
          </Col>

          <Col span={24}>
            <List
              className={styles.formList}
              loading={loading}
              grid={{
                gutter: 24,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 3,
              }}
              dataSource={forms}
              locale={{
                emptyText: 'Không có phiếu khảo sát nào'
              }}
              renderItem={(form) => (
                <List.Item className={styles.formListItem}>
                  <div className={getCardClassName(form.status)}>
                    <FormItem
                      form={form}
                      onRefresh={loadForms}
                      isOwner={false}
                      hideAnswerButton={form.status !== 'active'}
                    />
                  </div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Form;