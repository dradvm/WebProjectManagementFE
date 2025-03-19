// import axios from '../utils/axios';

// const PHIEU_KHAO_SAT_API_URL = '/phieu-khao-sat';

import axios from 'axios';
const PHIEU_KHAO_SAT_API_URL = 'http://localhost:8080/api/phieu-khao-sat';

const phieuKhaoSatService = {
    // Lấy danh sách phiếu khảo sát theo dự án
    getByMaDuAn: async (maDuAn) => {
        try {
            const response = await axios.get(`${PHIEU_KHAO_SAT_API_URL}/du-an/${maDuAn}`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách phiếu khảo sát:', error);
            throw error;
        }
    },

    // Lấy tất cả phiếu khảo sát
    getAll: async () => {
        try {
            const response = await axios.get(PHIEU_KHAO_SAT_API_URL);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy tất cả phiếu khảo sát:', error);
            throw error;
        }
    },

    // Tìm kiếm phiếu khảo sát
    search: async (keyword) => {
        try {
            const response = await axios.get(`${PHIEU_KHAO_SAT_API_URL}/search`, {
                params: { keyword }
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi tìm kiếm phiếu khảo sát:', error);
            throw error;
        }
    },

    // Lấy chi tiết phiếu khảo sát
    getById: async (maPhieuKhaoSat) => {
        try {
            const response = await axios.get(`${PHIEU_KHAO_SAT_API_URL}/${maPhieuKhaoSat}`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết phiếu khảo sát:', error);
            throw error;
        }
    },

    // Tạo phiếu khảo sát mới
    create: async (phieuKhaoSat) => {
        try {
            const response = await axios.post(PHIEU_KHAO_SAT_API_URL, phieuKhaoSat);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi tạo phiếu khảo sát:', error);
            throw error;
        }
    },

    // Cập nhật phiếu khảo sát
    update: async (maPhieuKhaoSat, phieuKhaoSat) => {
        try {
            const response = await axios.put(`${PHIEU_KHAO_SAT_API_URL}/${maPhieuKhaoSat}`, phieuKhaoSat);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật phiếu khảo sát:', error);
            throw error;
        }
    },

    // Xóa phiếu khảo sát
    delete: async (maPhieuKhaoSat) => {
        try {
            await axios.delete(`${PHIEU_KHAO_SAT_API_URL}/${maPhieuKhaoSat}`);
        } catch (error) {
            console.error('Lỗi khi xóa phiếu khảo sát:', error);
            throw error;
        }
    },

    // Lấy kết quả khảo sát
    getKetQua: async (maPhieuKhaoSat) => {
        try {
            const response = await axios.get(`${PHIEU_KHAO_SAT_API_URL}/${maPhieuKhaoSat}/ket-qua`);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy kết quả khảo sát:', error);
            throw error;
        }
    }
};

export default phieuKhaoSatService; 