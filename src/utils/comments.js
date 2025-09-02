import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/comments/";

export const commentsIndex = (postId) => {
    return axios.get(BASE_URL, { params: { post: postId } })
}

export const topLevelComments = (postId) => {
    return axios.get(BASE_URL, { params: { post: postId, parent: 'null' } })
}

export const commentReplies = (postId, parentCommentId) => {
    return axios.get(BASE_URL, { params: { post: postId, parent: parentCommentId } })
}

export const getComment = (id) => {
    return axios.get(BASE_URL + `${id}/`)
}

export const createComment = (payload) => {
    return axios.post(BASE_URL, payload)
}

export const updateComment = (id, payload) => {
    return axios.put(BASE_URL + `${id}/`, payload)
}

export const deleteComment = (id) => {
    return axios.delete(BASE_URL + `${id}/`)
}

export const restoreComment = (id) => {
    return axios.post(BASE_URL + `${id}/restore/`)
}