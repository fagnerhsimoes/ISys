import { FETECHED_ALL_CUSTOMER, CUSTOMER_DETAIL, USER_UPDATED, HANDLE_ON_CHANGE } from "../Actions/Types";

const initialState = { anchor: 'left',
    customer: [],
    open: false,
 };

export default function product(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_CUSTOMER:
            return {
            ...state, 
            customer: action.customer
            };
        case CUSTOMER_DETAIL:
            return {
                ...state,
                id        : action.id,  
                name      : action.name,
                email     : action.email,
                birthDate : action.birthDate,
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

