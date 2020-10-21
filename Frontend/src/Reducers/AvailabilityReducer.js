import { FETECHED_ALL_ROOM_AVAILABILITY, USER_UPDATED, HANDLE_ON_CHANGE } from "../Actions/Types";

const initialState = { anchor: 'left',
    availability: [],
    open: false,
 };

export default function availability(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_ROOM_AVAILABILITY:
            return {
               ...state, 
               availability: action.availability
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

