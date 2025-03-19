import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
    LinkOutlined,
    BarChartOutlined,
    EditOutlined
} from '@ant-design/icons';

const FormLinks = ({ lienKet, lienKetTraLoi }) => {
    const handleOpenLink = (url) => {
        window.open(url, '_blank');
    };

    return (
        <Space>
            <Tooltip title="Mở liên kết để trả lời khảo sát" placement="top">
                <Button
                    type="primary"
                    icon={<LinkOutlined />}
                    onClick={() => handleOpenLink(`${lienKet}/viewform`)}
                >
                    Trả lời khảo sát
                </Button>
            </Tooltip>

            <Tooltip title="Chỉnh sửa nội dung form" placement="top">
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleOpenLink(`${lienKet}/edit`)}
                >
                    Chỉnh sửa
                </Button>
            </Tooltip>

            {lienKetTraLoi && (
                <Tooltip title="Xem thống kê kết quả khảo sát" placement="top">
                    <Button
                        icon={<BarChartOutlined />}
                        onClick={() => handleOpenLink(lienKetTraLoi)}
                    >
                        Kết quả
                    </Button>
                </Tooltip>
            )}
        </Space>
    );
};

export default FormLinks; 