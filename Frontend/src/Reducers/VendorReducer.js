import { FETECHED_ALL_VENDOR, VENDOR_DETAIL, USER_UPDATED, HANDLE_ON_CHANGE } from "../Actions/Types";

const initialState = { anchor: 'left',
    vendor: [],
    open: false,
    id: '',  
    name: '',
    mobile: '',
    phone_number: '',
    address: ''
 };


export default function vendor(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_VENDOR:
            return {
            ...state,
            vendor: action.vendor
            };
        case VENDOR_DETAIL:
            return {
                ...state,
                id: action.id,  
                name: action.name,
                mobile: action.mobile,
                phone_number: action.phone_number,
                address: action.address
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
  } 