import { FETECHED_ALL_MOVIE } from "../Actions/Types";

const initialState = { anchor: 'left',
    movie: [],
    open: false,
 };

export default function film(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_MOVIE:
            return {
            ...state, 
            movie: action.movie
            };  
        default:
            return state
    }
  };

