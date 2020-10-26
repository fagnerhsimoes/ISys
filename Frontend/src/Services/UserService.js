import axios from 'axios';
import { dialogActions } from "../Actions/DialogActions";
import { alertActions } from "../Actions/AlertActions";

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
    .catch(err => dispatch(dialogActions.error(err)))
}

function post(apiEndpoint, payload, dispatch){
    return axios.post(apiEndpoint, payload)
    .then((response) => { return response;})
    .then(response => dispatch(alertActions.success("Registro criado com sucesso")))
    .catch((err) => (handleError(err)))
    .catch(err => dispatch(dialogActions.error(err)))
}

function put(apiEndpoint, payload, dispatch){
    return axios.put(apiEndpoint, payload)
    .then((response) => { return response;})
    .then(response => dispatch(alertActions.success("Registro atualizado com sucesso")))
    .catch((err) => (handleError(err)))
    .catch(err => dispatch(dialogActions.error(err)))
}

function deleteDetail(apiEndpoint, dispatch){
    return axios.delete(apiEndpoint)
    .then((response) => { return response;})
    .catch((err) => (handleError(err)))
    .catch(err => dispatch(dialogActions.error(err)))
}

function handleError(error) {
    return Promise.reject(error && error.response && error.response.data.errors || error.message);
}