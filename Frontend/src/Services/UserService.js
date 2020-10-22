import axios from 'axios';

export const userService = {
    get,
    getPay,
    post,
    put,
    deleteDetail
};

function get(apiEndpoint){
    return axios.get(apiEndpoint)
    .then((response)=>{
        return response;
    }).catch((err)=>{
        console.log("Error in response");
        console.log(err);
    })
}

function getPay(apiEndpoint, payload){
    return axios.get(apiEndpoint, payload )
    .then((response)=>{
        return response;
    }).catch((err)=>{
        console.log("Error in response");
        console.log(err);
    })
}

function post(apiEndpoint, payload){
    return axios.post(apiEndpoint, payload)
    .then((response)=> { return response;})
    .catch((err)    => { return err;})
    .catch((err)    => { console.log(err.response.data);});
}

function put(apiEndpoint, payload){
    return axios.put(apiEndpoint, payload)
    .then((response)=>{
        return response;
    })
    .catch((err)=>{
        console.log(err);
    })
}

function deleteDetail(apiEndpoint){
    return axios.delete(apiEndpoint)
    .then((response)=>{
        return response;
    })
    .catch((err)=>{
        console.log(err);
    })
}

