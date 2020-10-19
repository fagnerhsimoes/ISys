import {
    FETECHED_ALL_VENDOR, HANDLE_ON_CHANGE, VENDOR_DETAIL,
    USER_UPDATED, USER_CREATED_SUCCESSFULLY, DELETED_VENDOR_DETAILS
} from "./Types";

import { reset } from 'redux-form';
import { userService } from '../Services/Index';
import { baseUrlNode } from '../Config/index';


export const vendorAction = {
    getVendor,
    getVendorById,
    onChangeProps,
    editVendorInfo,
    createVendor,
    deleteVendorById
}; 

function getVendor(){
    return async dispatch => {
        let apiEndpoint = baseUrlNode + '/v1/vendors/';
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeVendorsList(response.data.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function createVendor(payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlNode + '/v1/vendors/';
        await userService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createUserInfo());
            history.push('/vendor');
            dispatch(reset('AddVendorForm' ));
        }) 
    }
}

function getVendorById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlNode + '/v1/vendors/'+ id;
        await userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(editVendorsDetails(response.data.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editVendorInfo(id, payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlNode + '/v1/vendors/'+ id;
        await userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedUserInfo());
            history.push('/vendor');
            dispatch(reset('AddVendorForm' ));
        }) 
    }
}

function deleteVendorById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlNode + '/v1/vendors/'+ id;
        await userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteVendorsDetails());
            dispatch(vendorAction.getVendor());
        })
    };
}


export function changeVendorsList(vendor){
    return{
        type: FETECHED_ALL_VENDOR,
        vendor: vendor
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: HANDLE_ON_CHANGE,
        props: props,
        value: value
    }
}

export function editVendorsDetails(vendor){
    return{
        type: VENDOR_DETAIL,
        id            : vendor.id,
        name          : vendor.name,
        mobile        : vendor.mobile,
        phone_number  : vendor.phone_number,
        address       : vendor.address
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

export function deleteVendorsDetails(){
    return{
        type: DELETED_VENDOR_DETAILS
    }
}
