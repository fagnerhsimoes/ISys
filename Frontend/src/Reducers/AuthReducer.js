import { SET_CURRENT_USER, USER_LOADING } from "../Actions/Types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
   /* case userConstants.LOGIN_REQUEST:
      return {
        isAuthenticated: true,
        user: action.payload
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.payload
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};*/
    default:
      return state;
  }
}
