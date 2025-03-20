import createAxios from "../utils/axios";

const axios = createAxios("")

const authService = {
    registerNguoiDung: (data) => axios.post("/register/nguoidung", data),
    registerQuanTriVien: (data) => axios.post("/register/quantrivien", data),
    login: (data) => axios.post("/login", data)
}

export default authService