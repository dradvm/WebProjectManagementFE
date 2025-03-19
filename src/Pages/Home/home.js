import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Statistic, Button, Space, Divider, Avatar } from 'antd';
import {
  ProjectOutlined,
  FormOutlined,
  TeamOutlined,
  RiseOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  InfoCircleOutlined,
  GithubOutlined,
  MailOutlined,
  PhoneOutlined,
  DashboardOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import duAnService from '../../services/duAnService';
import phieuKhaoSatService from '../../services/phieuKhaoSatService';
import nguoiDungService from '../../services/userService';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    duAn: 0,
    khaoSat: 0,
    thanhVien: 0,
    tiLeHoanThanh: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [duAns, khaoSats, thanhViens] = await Promise.all([
          duAnService.getDuAns(),
          phieuKhaoSatService.getAll(),
          nguoiDungService.getAllNguoiDung()
        ]);

        const duAnHoanThanh = duAns.data.filter(da => {
          return da.duan.trangThai.toString().trim() === "Hoàn thành"
        }).length;
        const tiLe = duAns.data.length > 0 ? Math.round((duAnHoanThanh / duAns.data.length) * 100) : 0;

        setStats({
          duAn: duAns.data.length,
          khaoSat: khaoSats.length,
          thanhVien: thanhViens.data.length,
          tiLeHoanThanh: tiLe
        });
      } catch (error) {
        console.error('Lỗi khi lấy thống kê:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Tổng số dự án',
      value: stats.duAn,
      icon: <ProjectOutlined style={{ fontSize: '28px' }} />,
      color: '#1890ff',
      description: 'Đang triển khai'
    },
    {
      title: 'Phiếu khảo sát',
      value: stats.khaoSat,
      icon: <FormOutlined style={{ fontSize: '28px' }} />,
      color: '#52c41a',
      description: 'Đã tạo'
    },
    {
      title: 'Thành viên',
      value: stats.thanhVien,
      icon: <TeamOutlined style={{ fontSize: '28px' }} />,
      color: '#722ed1',
      description: 'Đang hoạt động'
    },
    {
      title: 'Tỉ lệ hoàn thành',
      value: stats.tiLeHoanThanh,
      suffix: '%',
      icon: <RiseOutlined style={{ fontSize: '28px' }} />,
      color: '#fa8c16',
      description: 'Dự án đã hoàn thành'
    }
  ];

  const features = [
    {
      title: 'Quản lý Dự án',
      description: 'Theo dõi và quản lý các dự án một cách hiệu quả với các công cụ trực quan. Dễ dàng phân công công việc, theo dõi tiến độ và đánh giá hiệu suất.',
      icon: <DashboardOutlined style={{ fontSize: '48px' }} />,
      action: () => navigate('/project'),
      color: '#1890ff',
      benefits: ['Phân công công việc', 'Theo dõi tiến độ', 'Báo cáo chi tiết']
    },
    {
      title: 'Khảo sát & Đánh giá',
      description: 'Tạo và quản lý các phiếu khảo sát, thu thập phản hồi từ người dùng. Phân tích dữ liệu và tạo báo cáo chi tiết.',
      icon: <BarChartOutlined style={{ fontSize: '48px' }} />,
      action: () => navigate('/form'),
      color: '#52c41a',
      benefits: ['Thu thập phản hồi', 'Phân tích dữ liệu', 'Tạo báo cáo']
    }
  ];

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
        padding: '80px 32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg) center/cover',
          opacity: 0.1
        }} />
        <Row justify="center" align="middle" style={{ position: 'relative' }}>
          <Col xs={24} md={16} style={{ textAlign: 'center' }}>
            <Title level={1} style={{ color: 'white', fontSize: '48px', marginBottom: '24px' }}>
              Hệ thống Quản lý Dự án
            </Title>
            <Paragraph style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '800px',
              margin: '0 auto 40px'
            }}>
              Nền tảng quản lý dự án toàn diện giúp tối ưu hóa quy trình làm việc và nâng cao hiệu suất của đội ngũ
            </Paragraph>
          </Col>
        </Row>
      </div>

      {/* Stats Section */}
      <div style={{ margin: '-40px 32px 64px' }}>
        <Row gutter={[24, 24]}>
          {statCards.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                hoverable
                style={{
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  background: '#fff'
                }}
                bodyStyle={{ padding: '24px' }}
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Avatar size={56} style={{
                      background: `${stat.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: stat.color }}>{stat.icon}</span>
                    </Avatar>
                    <Statistic
                      value={stat.value}
                      suffix={stat.suffix}
                      valueStyle={{
                        color: stat.color,
                        fontSize: '36px',
                        fontWeight: 'bold',
                        lineHeight: '1'
                      }}
                    />
                  </div>
                  <div>
                    <Text strong style={{ fontSize: '16px', color: '#262626' }}>
                      {stat.title}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      {stat.description}
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Features Section */}
      <div style={{ padding: '0 32px 64px' }}>
        <Title level={2} style={{
          textAlign: 'center',
          marginBottom: '48px',
          fontSize: '36px'
        }}>
          Tính năng nổi bật
        </Title>
        <Row gutter={[32, 32]} justify="center">
          {features.map((feature, index) => (
            <Col xs={24} md={12} lg={10} key={index}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  border: 'none'
                }}
                bodyStyle={{
                  padding: '40px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Avatar size={80} style={{
                    background: `${feature.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: feature.color }}>{feature.icon}</span>
                  </Avatar>
                  <div>
                    <Title level={3} style={{
                      marginBottom: '16px',
                      color: '#262626'
                    }}>
                      {feature.title}
                    </Title>
                    <Paragraph style={{
                      color: '#595959',
                      fontSize: '16px',
                      lineHeight: '1.8',
                      marginBottom: '24px'
                    }}>
                      {feature.description}
                    </Paragraph>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                      {feature.benefits.map((benefit, idx) => (
                        <Space key={idx}>
                          <CheckCircleOutlined style={{ color: feature.color }} />
                          <Text>{benefit}</Text>
                        </Space>
                      ))}
                    </Space>
                  </div>
                </Space>
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  onClick={feature.action}
                  style={{
                    width: '100%',
                    height: '48px',
                    marginTop: '32px',
                    background: feature.color,
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                >
                  Khám phá ngay
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Footer */}
      <div style={{
        background: '#001529',
        padding: '64px 32px 24px',
        color: 'rgba(255, 255, 255, 0.85)'
      }}>
        <Row gutter={[48, 32]} justify="center" style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
              Về chúng tôi
            </Title>
            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
              Hệ thống Quản lý Dự án là nền tảng toàn diện giúp tối ưu hóa quy trình làm việc và nâng cao hiệu suất của đội ngũ.
            </Paragraph>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
              Thông tin liên hệ
            </Title>
            <Space direction="vertical" size="middle">
              <Space>
                <MailOutlined />
                <span>support@example.com</span>
              </Space>
              <Space>
                <PhoneOutlined />
                <span>1900-xxxx</span>
              </Space>
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                onClick={() => window.open('https://example.com/help', '_blank')}
                style={{ marginTop: '8px' }}
              >
                Trung tâm Trợ giúp
              </Button>
            </Space>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
              Thông tin hệ thống
            </Title>
            <Space direction="vertical" size="middle">
              <Space>
                <InfoCircleOutlined />
                <span>Phiên bản: 1.0.0</span>
              </Space>
              <Space>
                <CalendarOutlined />
                <span>Cập nhật: {new Date().toLocaleDateString('vi-VN')}</span>
              </Space>
              <Space>
                <GithubOutlined />
                <a
                  href="https://github.com/your-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255, 255, 255, 0.85)' }}
                >
                  Mã nguồn dự án
                </a>
              </Space>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.15)', margin: '48px 0 24px' }} />

        <Row justify="center">
          <Col>
            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.45)', textAlign: 'center', marginBottom: 0 }}>
              © {new Date().getFullYear()} Hệ thống Quản lý Dự án. All rights reserved.
            </Paragraph>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
