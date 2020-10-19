import { FETECHED_ALL_CATEGORY, HANDLE_ON_CHANGE, CATEGORY_DETAIL,
    USER_UPDATED, USER_CREATED_SUCCESSFULLY, DELETED_CATEGORY_DETAILS
} from "./Types";

import { reset } from 'redux-form'
import { userService } from '../Services/Index';
import { baseUrlCore } from '../Config/index';



export const categoryAction = {
    getCategory,
    getCategoryById,
    onChangeProps,
    editCategoryInfo,
    createCategory,
    deleteCategoryById
}; 

function getCategory(){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/category';
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeCategorysList(response.data.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function getCategory2(startDataIndex){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/category';
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeCategorysList(response.data.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function createCategory(payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/category';
        await userService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createUserInfo());
            history.push('/category');
            dispatch(reset('AddCategoryForm' ));
        }) 
    }
}

function getCategoryById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlCore +'/v1/category/'+ id;
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(editCategorysDetails(response.data.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editCategoryInfo(id, payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/category/'+ id;
        await userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedUserInfo());
            history.push('/category');
            dispatch(reset('AddCategoryForm' ));
        }) 
    }
}

function deleteCategoryById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/category/'+ id;
        await userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteCategorysDetails());
            dispatch(categoryAction.getCategory());
        })
    };
}


export function changeCategorysList(category){
    return{
        type: FETECHED_ALL_CATEGORY,
        category: category
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: HANDLE_ON_CHANGE,
        props: props,
        value: value
    }
}

export function editCategorysDetails(category){
    return{
        type: CATEGORY_DETAIL,
        id             : category.id,
        title          : category.title,
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

export function deleteCategorysDetails(){
    return{
        type: DELETED_CATEGORY_DETAILS
    }
}
