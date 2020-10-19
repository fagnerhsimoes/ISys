import { FETECHED_ALL_PRODUCT, PRODUCT_DETAIL, USER_UPDATED, HANDLE_ON_CHANGE } from "../Actions/Types";

const initialState = { anchor: 'left',
    product: [],
    open: false,
 };

export default function product(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_PRODUCT:
            return {
            ...state, 
            product: action.product
            };
        case PRODUCT_DETAIL:
            return {
                ...state,
                id            : action.id,  
                name          : action.name,
                description   : action.description,
                price         : action.price,
                category      : action.category,
                categoryId    : action.categoryId
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

