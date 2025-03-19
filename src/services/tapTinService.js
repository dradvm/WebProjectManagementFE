import createAxios from "../utils/axios";

const axios = createAxios("/taptin", "multipart/form-data")

const tapTinService = {
    uploadFiles: (files) => axios.post("/uploadFiles", files),
    loadFilesDuAn: (id) => axios.get(`/duAnTapTinCollection/${id}`)
}

export default tapTinService