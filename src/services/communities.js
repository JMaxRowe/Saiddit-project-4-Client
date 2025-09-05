import axios from "../utils/axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/communities/";

export const communitiesIndex = () => {
    return axios.get(BASE_URL,)
}

export const getCommunity = (id) => {
    return axios.get(BASE_URL + `${id}/`);
};

export const joinCommunity = (id) => {
    return axios.post(BASE_URL + `${id}/join/`, {});
};

export const leaveCommunity = (id) => {
    return axios.post(BASE_URL + `${id}/leave/`, {});
};

export const restoreCommunity = (id) => {
    return axios.post(BASE_URL + `${id}/restore/`, {});
};