import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/comments/";

export const commentsIndex = (postId) => {
    return axios.get(BASE_URL, { 
        params: { post: postId } , 
        headers: { Authorization: `Bearer ${getToken()}` ,}
})
}

export const topLevelComments = (postId) => {
    return axios.get(BASE_URL, { 
        params: { post: postId, parent: 'null' },
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const commentReplies = (postId, parentCommentId) => {
    return axios.get(BASE_URL, { 
        params: { post: postId, parent: parentCommentId },
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const getComment = (id) => {
    return axios.get(BASE_URL + `${id}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const createComment = (payload) => {
    return axios.post(BASE_URL, payload, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const updateComment = (id, payload) => {
    return axios.put(BASE_URL + `${id}/`, payload, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const deleteComment = (id) => {
    return axios.delete(BASE_URL + `${id}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const restoreComment = (id) => {
    return axios.post(BASE_URL + `${id}/restore/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}