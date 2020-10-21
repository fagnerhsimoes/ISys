import { FETECHED_ALL_ROOM, HANDLE_ON_CHANGE, ROOM_DETAIL,
    USER_UPDATED, USER_CREATED_SUCCESSFULLY, DELETED_ROOM_DETAILS
} from "./Types";
import 'moment/locale/pt-br';

import { reset } from 'redux-form'
import { userService } from '../Services/Index';
import { baseUrlCore } from '../Config/index';



export const roomAction = {
    getRoom,
    getRoomById,
    onChangeProps,
    editRoomInfo,
    createRoom,
    deleteRoomById
}; 

function getRoom(){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/room';
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeRoomsList(response.data.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function createRoom(payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/room';
        await userService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createUserInfo());
            history.push('/room');
            dispatch(reset('AddRoomForm' ));
        }) 
    }
}

function getRoomById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlCore +'/v1/room/'+ id;
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(editRoomsDetails(response.data.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editRoomInfo(id, payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/room/'+ id;
        await userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedUserInfo());
            history.push('/room');
            dispatch(reset('AddRoomForm' ));
        }) 
    }
}

function deleteRoomById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/room/'+ id;
        await userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteRoomsDetails());
            dispatch(roomAction.getRoom());
        })
    };
}


export function changeRoomsList(room){
    return{
        type: FETECHED_ALL_ROOM,
        room: room
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: HANDLE_ON_CHANGE,
        props: props,
        value: value
    }
}

export function editRoomsDetails(room){
    return{
        type: ROOM_DETAIL,
        id             : room.id,
        description    : room.description,
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

export function deleteRoomsDetails(){
    return{
        type: DELETED_ROOM_DETAILS
    }
}

