import { FETECHED_ALL_ROOM_NOT_AVAILABILITY, USER_UPDATED, HANDLE_ON_CHANGE } from "../Actions/Types";

const initialState = { anchor: 'left',
    notavailability: [],
    open: false,
 };

export default function notavailability(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_ROOM_NOT_AVAILABILITY:
            return {
               ...state, 
               notavailability: action.notavailability
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

