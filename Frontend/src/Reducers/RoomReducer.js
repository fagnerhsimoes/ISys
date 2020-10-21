import { FETECHED_ALL_ROOM, ROOM_DETAIL, USER_UPDATED, HANDLE_ON_CHANGE , FETECHED_ALL_ROOM_AVAILABILITY} from "../Actions/Types";

const initialState = { anchor: 'left',
    room: [],
    open: false,
 };

export default function room(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_ROOM:
            return {
               ...state, 
               room: action.room
            };
        case FETECHED_ALL_ROOM_AVAILABILITY:
                return {
                ...state, 
                room: action.room
                };
        case ROOM_DETAIL:
            return {
                ...state,
                id          : action.id,  
                description : action.description,
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

