import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/votes/";

const auth = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

export const setVote = (contentTypeId, objectId, value) => {
    axios.post(BASE_URL, { content_type: contentTypeId, object_id: objectId, value },  auth())
}

export const clearVote = (contentTypeId, objectId) => {
    axios.delete(BASE_URL, {...auth(), data: { content_type: contentTypeId, object_id: objectId } })
}