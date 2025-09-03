import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/posts/";

export const postsIndex = () => {
    return axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const getPost = (id) => {
    return axios.get(BASE_URL + `${id}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

export const createPost = (formData) => {
    return axios.post(BASE_URL, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

export const editPost = (id, formData) => {
    return axios.put(BASE_URL + `${id}/`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

export const deletePost = (id) => {
    return axios.delete(BASE_URL + `${id}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

export const restorePost = (id) => {
    return axios.post(BASE_URL + `${id}/restore/`)
};