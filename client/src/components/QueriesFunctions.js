import axios from "axios";

const {REACT_APP_API_URL} = process.env;

const getGamesApi = async () => {
    let res = await axios(REACT_APP_API_URL);
    return res;
};

const putGameApi = async (newData) => {
    let res = await axios.put(REACT_APP_API_URL, newData);
    return res;
};

const updateGameApi = async (oldData, newData) => {
    let res = await axios.post(`${REACT_APP_API_URL}/${oldData.id}`, newData);
    return res;
};

const deleteGameApi = async (oldData) => {
    let res = await axios.delete(`${REACT_APP_API_URL}/${oldData.id}`);
    return res;
};

export {getGamesApi, putGameApi, updateGameApi, deleteGameApi}