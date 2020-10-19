import { FETECHED_ALL_TOURNAMENT, TOURNAMENT_DETAIL, HANDLE_ON_CHANGE } from "../Actions/Types";

const initialState = { anchor: 'left',
    tournament: [],
    open: false,
 };


export default function customer(state = initialState, action) {
    switch (action.type) {
        case FETECHED_ALL_TOURNAMENT:
            return {
            ...state, 
            tournament: action.tournament
            };
        case TOURNAMENT_DETAIL:
            return {
                ...state,
                id           : action.id,  
                idWinner     : action.idWinner,
                idRunnerUp   : action.idRunnerUp,  
                nameWinner   : action.nameWinner,
                nameRunnerUp : action.nameRunnerUp,  
                player1      : action.player1,  
                player2      : action.player2, 
                player3      : action.player3, 
                player4      : action.player4, 
                player5      : action.player5, 
                player6      : action.player6, 
                player7      : action.player7, 
                player8      : action.player8, 
                createdAt    : action.createdAt,
                lastupdateat : action.lastupdateat
            };
        case HANDLE_ON_CHANGE:
            return {
                ...state,
                [action.props]: action.value
            };
        default:
            return state
    }
  };

