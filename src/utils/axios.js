import axios from "axios";

const createAxios = (route = "", contentType = "application/json") => {
    const instance = axios.create({
        baseURL: `http://localhost:8080/api${route}`,
        timeout: 10000,
        headers: {
            "Content-Type": contentType,
        },
    });

    instance.interceptors.request.use(
        (config) => {

            const token = localStorage.getItem("token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (err) => Promise.reject(err)
    );

    instance.interceptors.response.use(
        (response) => {
            console.log(response)
            if (response.data.token && response.data.token !== "null") {
                localStorage.setItem("token", response.data.token);
            }
            return response;
        },
        (err) => {
            if (err.status === 403) {
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
            return Promise.reject(err);
        }
    );

    return instance;
};

export default createAxios;
