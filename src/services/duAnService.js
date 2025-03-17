import createAxios from "../utils/axios";

const axiosInstanceController = createAxios("/duan")
const axiosInstancerRestRepository = createAxios("/duans")

const duAnService = {
    getDuAns: () => axiosInstanceController.get(""),
    createDuAn: (data) => axiosInstanceController.post("", data),
    getDuAn: (id) => axiosInstancerRestRepository.get(`/${id}`),
    deleteDuAn: (id) => axiosInstancerRestRepository.delete(`/${id}`)
}

export default duAnService