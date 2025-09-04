import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/communities/";

export const communitiesIndex = () => {
    return axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${getToken()}` },
    })
}

export const getCommunity = (id) => {
    return axios.get(BASE_URL + `${id}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

export const joinCommunity = (id) => {
    return axios.post(BASE_URL + `${id}/join/`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

export const leaveCommunity = (id) => {
    return axios.post(BASE_URL + `${id}/leave/`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};

export const restoreCommunity = (id) => {
    return axios.post(BASE_URL + `${id}/restore/`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
};