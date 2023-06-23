import axios from "axios";

const urlBack = "http://localhost:8080"

const api = axios.create({
    baseURL: urlBack,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;