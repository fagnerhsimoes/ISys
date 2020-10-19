import { FETECHED_ALL_MOVIE } from "./Types";

import { userService } from '../Services/Index';
import { baseUrlCore } from '../Config/index';

export const movieAction = {
    getMovie
}; 

function getMovie(){
    return async dispatch => {
        let apiEndpoint = baseUrlCore + '/v1/movieapi';
        await userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeMoviesList(response.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}



export function changeMoviesList(movie){
    return{
        type: FETECHED_ALL_MOVIE,
        movie: movie
    }
}
