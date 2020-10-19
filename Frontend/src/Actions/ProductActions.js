import { FETECHED_ALL_PRODUCT, HANDLE_ON_CHANGE, PRODUCT_DETAIL,
    USER_UPDATED, USER_CREATED_SUCCESSFULLY, DELETED_PRODUCT_DETAILS
} from "./Types";

import { reset } from 'redux-form'
import { userService } from '../Services/Index';
import { baseUrlCore } from '../Config/index';



export const productAction = {
    getProduct,
    getProductById,
    onChangeProps,
    editProductInfo,
    createProduct,
    deleteProductById
}; 

function getProduct(){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/product';
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeProductsList(response.data.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function createProduct(payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/product';
        await userService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createUserInfo());
            history.push('/product');
            console.log(payload);
        }) 
    }
}

function getProductById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlCore +'/v1/product/'+ id;
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(editProductsDetails(response.data.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editProductInfo(id, payload, history){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/product/'+ id;
        await userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedUserInfo());
            history.push('/product');
            dispatch(reset('AddProductForm' ));
        }) 
    }
}

function deleteProductById(id){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/product/'+ id;
        await userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteProductsDetails());
            dispatch(productAction.getProduct());
        })
    };
}


export function changeProductsList(product){
    return{
        type: FETECHED_ALL_PRODUCT,
        product: product
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: HANDLE_ON_CHANGE,
        props: props,
        value: value
    }
}

export function editProductsDetails(product){
    return{
        type: PRODUCT_DETAIL,
        id            : product.id,
        name          : product.name,
        description   : product.description,
        price         : product.price,
        category      : product.category,
        categoryId    : product.categoryId
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

export function deleteProductsDetails(){
    return{
        type: DELETED_PRODUCT_DETAILS
    }
}

