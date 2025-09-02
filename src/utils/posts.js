import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/posts/";

export const postsIndex = () => {
    return axios.get(BASE_URL)
}