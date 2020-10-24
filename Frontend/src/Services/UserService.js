import axios from 'axios';
import { alertActions } from "../Actions/AlertActions";
import { dialogActions } from "../Actions/DialogActions";

export const userService = {
    get,
    post,
    put,
    deleteDetail
};

function get(apiEndpoint, dispatch){
    return axios.get(apiEndpoint)
    .then((response) => { return response;})
    .catch((err) => (handleError(err)))
    .catch(err => dispatch(alertActions.error(err)))
}

function post(apiEndpoint, payload, dispatch){
    return axios.post(apiEndpoint, payload)
    .then((response) => { return response;})
    .catch((err) => (handleError(err)))
    .catch(err => dispatch(dialogActions.error(err)))
}

function put(apiEndpoint, payload, dispatch){
    return axios.put(apiEndpoint, payload)
    .then((response) => { return response;})
    .catch((err) => (handleError(err)))
    .catch(err => dispatch(alertActions.error(err)))
}

function deleteDetail(apiEndpoint, dispatch){
    return axios.delete(apiEndpoint)
    .then((response) => { return response;})
    .catch((err) => (handleError(err)))
    .catch(err => dispatch(alertActions.error(err)))
}

function handleError(error) {
    return Promise.reject(error && error.response && error.response.data.errors || error.message);
}