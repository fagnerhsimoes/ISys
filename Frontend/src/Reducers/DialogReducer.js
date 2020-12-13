import { DIALOG_SUCCESS, DIALOG_ERROR, DIALOG_CLEAR } from "../Actions/Types";
/*const initialState = {
  alert    : []
  };*/

//export function dialog (state = initialState, action) {
export default function dialog(state = {}, action) {
  switch (action.type) {
      case DIALOG_SUCCESS:
      return {
        type: 'dialog-success',
        message: action.message
      };
      case DIALOG_ERROR:
      return {
        type: 'dialog-danger',
        message: action.message
      };
      case DIALOG_CLEAR:
      return {};
    default:
      return state
  }
}