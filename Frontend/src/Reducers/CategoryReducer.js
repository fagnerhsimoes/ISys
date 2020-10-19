import { FETECHED_ALL_CATEGORY, CATEGORY_DETAIL, USER_UPDATED, HANDLE_ON_CHANGE } from "../Actions/Types";

const initialState = { anchor: 'left',
    category: [],
    open: false,
 };

export default function category(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_CATEGORY:
            return {
            ...state, 
            category: action.category
            };
        case CATEGORY_DETAIL:
            return {
                ...state,
                id        : action.id,  
                title     : action.title,
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

