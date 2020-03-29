import { create } from "axios";

const api = create({ baseURL: "http://192.168.0.12:3333" });

export default api;
