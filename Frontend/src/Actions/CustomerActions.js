import { FETECHED_ALL_CUSTOMER, HANDLE_ON_CHANGE, CUSTOMER_DETAIL,
    USER_UPDATED, USER_CREATED_SUCCESSFULLY, DELETED_CUSTOMER_DETAILS
} from "./Types";
import moment from 'moment';
import 'moment/locale/pt-br';

import { reset } from 'redux-form'
import { userService } from '../Services/Index';
import { baseUrlCore } from '../Config/index';



export const customerAction = {
    getCustomer,
    getCustomerById,
    onChangeProps,
    editCustomerInfo,
    createCustomer,
    deleteCustomerById
}; 

function getCustomer(){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/customer';
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeCustomersList(response.data.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function createCustomer(payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/customer';
        await userService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createUserInfo());
            history.push('/customer');
            dispatch(reset('AddCustomerForm' ));
        }) 
    }
}

function getCustomerById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlCore +'/v1/customer/'+ id;
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(editCustomersDetails(response.data.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editCustomerInfo(id, payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/customer/'+ id;
        await userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedUserInfo());
            history.push('/customer');
            dispatch(reset('AddCustomerForm' ));
        }) 
    }
}

function deleteCustomerById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/customer/'+ id;
        await userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteCustomersDetails());
            dispatch(customerAction.getCustomer());
        })
    };
}


export function changeCustomersList(customer){
    return{
        type: FETECHED_ALL_CUSTOMER,
        customer: customer
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: HANDLE_ON_CHANGE,
        props: props,
        value: value
    }
}

export function editCustomersDetails(customer){
    return{
        type: CUSTOMER_DETAIL,
        id             : customer.id,
        name           : customer.name,
        email          : customer.email,
        birthDate      :  moment(customer.birthDate).format('L'), 
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

export function deleteCustomersDetails(){
    return{
        type: DELETED_CUSTOMER_DETAILS
    }
}

