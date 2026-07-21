import axios from "axios";

export const api = axios.create({
    baseURL: "https://archivio-tp9v.vercel.app/api",
    withCredentials: true
})
