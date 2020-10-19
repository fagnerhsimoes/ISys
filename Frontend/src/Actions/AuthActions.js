import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../Helpers/SetAuthToken";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, AUTH_FAILURE } from "./Types";
import { baseUrlCore } from '../Config/Config';
import { alertActions } from "../Actions/AlertActions";

// Register User
export const registerUser = (userData, history) => dispatch => {
  const apiEndpoint = baseUrlCore + '/v1/auth/register';
  axios
    .post(apiEndpoint, userData)
    .then((res) => {
        history.push("/");
        //dispatch(alertActions.success("Registro efetuado com sucesso"));
    })
    .catch(err => handleError(err))
    .catch(err => dispatch(alertActions.error(err)))
    .catch(err => dispatch(failure(err.message)));
};


// Login - get user token
export const loginUser = userData => dispatch => {
  const apiEndpoint = baseUrlCore + '/v1/auth/login';
  axios
    .post(apiEndpoint, userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      //dispatch(alertActions.success("Login efetuado com sucesso"));
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => handleError(err))
    .catch(err => dispatch(alertActions.error(err)))
    .catch(err => dispatch(failure(err)));
};


export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};


export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

function failure(error) {
    return { type: AUTH_FAILURE, error }
}

function handleError(error) {
    return Promise.reject(error && error.message);
}