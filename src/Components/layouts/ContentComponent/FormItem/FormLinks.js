import React from 'react';
import { Button, Space, Tooltip } from 'antd';
import {
    LinkOutlined,
    BarChartOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './formItem.module.scss';

const FormLinks = ({ lienKet, lienKetTraLoi, isOwner, form }) => {
    const handleOpenLink = (url) => {
        window.open(url, '_blank');
    };

    const getFormStatus = () => {
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

    const getButtonTooltip = () => {
        const status = getFormStatus();
        switch (status) {
            case 'upcoming':
                return 'Chưa đến thời gian mở khảo sát';
            case 'closed':
                return 'Khảo sát đã kết thúc';
            default:
                return 'Mở liên kết để trả lời khảo sát';
        }
    };

    return (
        <Space className={styles.formLinks}>
            <Tooltip title={getButtonTooltip()} placement="top">
                <Button
                    icon={<LinkOutlined />}
                    onClick={() => handleOpenLink(`${lienKet}`)}
                    disabled={getFormStatus() !== 'active'}
                >
                    Trả lời khảo sát
                </Button>
            </Tooltip>

            {isOwner && lienKetTraLoi && (
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