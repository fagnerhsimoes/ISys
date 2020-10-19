import { FETECHED_ALL_TOURNAMENT, HANDLE_ON_CHANGE, TOURNAMENT_DETAIL, DELETED_TOURNAMENT_DETAILS } from "./Types";

import { reset } from 'redux-form';
import { baseUrlCore } from '../Config/index';
import { userService } from '../Services/Index';



export const tournamentAction = {
    getTournament,
    onChangeProps,
    editTournamentInfo,
    createTournament,
    deleteTournamentById
}; 

function getTournament(){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/tournament';
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeTournamentList(response.data.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}


function createTournament(payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/tournament';
        await userService.post(apiEndpoint, payload)
        .then((response)=>{
            console.log(response);
            history.push('resultadotorneio/' + response.data.data.id);
        }) 
    }
}


function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}


function editTournamentInfo(id, payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/tournament/' + id;
        await userService.put(apiEndpoint, payload)
        .then((response)=>{
            history.push('/torneio');
            dispatch(reset('TournamentForm' ));
        }) 
    }
}

function deleteTournamentById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/tournament/' + id;
        await userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteTournamentDetails());
            dispatch(tournamentAction.getTournament());
        })
    };
}


export function changeTournamentList(tournament){
    return{
        type: FETECHED_ALL_TOURNAMENT,
        tournament: tournament
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: HANDLE_ON_CHANGE,
        props: props,
        value: value
    }
}

export function editTournamentDetails(tournament){
    return{
        type:TOURNAMENT_DETAIL,
        id  : tournament.id,
        idWinner      : tournament.idWinner,
        idRunnerUp    : tournament.idRunnerUp,  
        nameWinner    : tournament.nameWinner,
        nameRunnerUp  : tournament.nameRunnerUp,  
        player1       : tournament.player1,
        player2       : tournament.player2,
        player3       : tournament.player3,
        player4       : tournament.player4,
        player5       : tournament.player5,
        player6       : tournament.player6,
        player7       : tournament.player7,
        player8       : tournament.player8,
        createdAt     : tournament.createdAt,
        createat      : tournament.createat,
    }
}


export function deleteTournamentDetails(){
    return{
        type: DELETED_TOURNAMENT_DETAILS
    }
}
