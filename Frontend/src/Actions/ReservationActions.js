import { FETECHED_ALL_RESERVATION,FETECHED_ALL_ROOM_AVAILABILITY,FETECHED_ALL_ROOM_NOT_AVAILABILITY, HANDLE_ON_CHANGE, RESERVATION_DETAIL,
    USER_UPDATED, USER_CREATED_SUCCESSFULLY, DELETED_RESERVATION_DETAILS
} from "./Types";

import { reset } from 'redux-form'
import { userService } from '../Services/Index';
import { baseUrlCore } from '../Config/index';



export const reservationAction = {
    getReservation,
    getReservationById,
    getAvailability,
    getNotAvailability,
    onChangeProps,
    editReservationInfo,
    createReservation,
    deleteReservationById
}; 

function getReservation(){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/reservation';
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeReservationsList(response.data.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}


function getAvailability(payload){
    console.log(payload);
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/room/availability/true';
        await userService.post(apiEndpoint, payload)
        .then((response)=>{
            console.log(response);
            dispatch(changeAvailabilityList(response.data.data));
        }) 
    }
}

function getNotAvailability(payload, history){
    console.log(payload);
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/room/availability/false';
        await userService.post(apiEndpoint, payload)
        .then((response)=>{
            console.log(response);
            dispatch(changeNotAvailabilityList(response.data.data));
            history.push('/reservationsavailability');
        }) 
    }
}



function createReservation(payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/reservation';
        await userService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createUserInfo());
            history.push('/reservation');
            console.log(payload);
        }) 
    }
}

function getReservationById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlCore +'/v1/reservation/'+ id;
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(editReservationsDetails(response.data.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editReservationInfo(id, payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/reservation/'+ id;
        await userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedUserInfo());
            history.push('/reservation');
            dispatch(reset('AddReservationForm' ));
        }) 
    }
}

function deleteReservationById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/reservation/'+ id;
        await userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteReservationsDetails());
            dispatch(reservationAction.getReservation());
        })
    };
}


export function changeReservationsList(reservation){
    return{
        type: FETECHED_ALL_RESERVATION,
        reservation: reservation
    }
}

export function changeAvailabilityList(availability){
    return{
        type: FETECHED_ALL_ROOM_AVAILABILITY,
        availability: availability
    }
}

export function changeNotAvailabilityList(notavailability){
    return{
        type: FETECHED_ALL_ROOM_NOT_AVAILABILITY,
        notavailability: notavailability
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: HANDLE_ON_CHANGE,
        props: props,
        value: value
    }
}

export function editReservationsDetails(reservation){
    return{
        type: RESERVATION_DETAIL,
        id           : reservation.id,
        title        : reservation.title,
        dateInitial  : reservation.dateInitial,
        dateFinal    : reservation.dateFinal,
        room         : reservation.room,
        roomId       : reservation.roomId
    }
}

export function updatedUserInfo(){
    return{
        type: USER_UPDATED
    }
}

export function createUserInfo(){
    return{
        type: USER_CREATED_SUCCESSFULLY
    }
}

export function deleteReservationsDetails(){
    return{
        type: DELETED_RESERVATION_DETAILS
    }
}
