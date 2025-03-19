import createAxios from "../utils/axios";

const axiosInstanceController = createAxios("/duan")
const axiosInstancerRestRepository = createAxios("/duans")

const duAnService = {
    getDuAns: () => axiosInstanceController.get(""),
    createDuAn: (data) => axiosInstanceController.post("", data),
    getDuAn: (id) => axiosInstanceController.get(`/${id}`),
    deleteDuAn: (id) => axiosInstanceController.delete(`/${id}`),
    editInformationDuAn: (id, data) => axiosInstancerRestRepository.patch(`/${id}`, data),
    getListTrangThai: () => axiosInstanceController.get("/listTrangThai"),
    addNguoiDungs: (data) => axiosInstanceController.post("/addNguoiDungs", data),
    isOwner: (id) => axiosInstanceController.get(`/isDuAnOwner/${id}`)
}

export default duAnService