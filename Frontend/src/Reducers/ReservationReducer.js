import { FETECHED_ALL_RESERVATION, RESERVATION_DETAIL, USER_UPDATED, HANDLE_ON_CHANGE } from "../Actions/Types";

const initialState = { anchor: 'left',
    reservation: [],
    open: false,
 };

export default function reservation(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_RESERVATION:
            return {
            ...state, 
            reservation: action.reservation
            };
        case RESERVATION_DETAIL:
            return {
                ...state,
                id          : action.id,  
                title       : action.title,
                dateInitial : action.dateInitial,
                dateFinal   : action.dateFinal,
                room        : action.room,
                roomId      : action.roomId
            };
        case USER_UPDATED:
            return state;
        case HANDLE_ON_CHANGE:
            return {
                ...state,
                [action.props]: action.value
            };
        default:
            return state
    }
  };

