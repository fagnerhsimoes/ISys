import { DIALOG_SUCCESS, DIALOG_ERROR, DIALOG_CLEAR } from "./Types";

export const dialogActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: DIALOG_SUCCESS, message };
}

function error(message) {
    return { type: DIALOG_ERROR, message };
}

function clear() {
    return { type: DIALOG_CLEAR };
}

