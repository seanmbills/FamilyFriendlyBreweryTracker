import createDataContext from './createDataContext'
import ServerApi from '../api/Server'
import {navigate} from '../navigationRef'
import {AsyncStorage} from 'react-native'
import Server from '../api/Server'


const reviewReducer = (state, action) => {
    switch(action.type) {
        case 'add_error_message':
            return {...state, errorMessage: action.payload, results: null}
        case 'create':
            return {...state, created: action.payload.response}
        case 'search_results':
            return {...state, count: action.payload.count, results: action.payload.response}
        case 'clear_individual_brewery_result':
            return {...state, individualResult: null};
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        case 'review_search':
            return {...state, count: action.payload.count, single_review: action.payload.response}
        case 'edit':
            return {...state, count: action.payload.count, edited: action.payload.response}
        default:
            return state;
    }
}

const createReview = (dispatch) => {
    return async ({message, breweryId, rating}) => {
        try {
            var req = {message: message, breweryId: breweryId, rating: rating}
            console.log(req);
            const response = await ServerApi.post('/createReview', 
            req,
            { headers: {
              'Accept' : 'application/json', 'Content-type' : 'application/json',
              'authorization' : 'Bearer ' + (await AsyncStorage.getItem('token'))
            }});
            
            dispatch({type: 'create', payload: response.data})
        } catch (err) {
            // console.log("Error: ", err.response)
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
        }
    }
}

const getBreweryReviews = (dispatch) => {
    return async ({breweryId}) => {
        var req = {breweryId};
        try {
            const response = await ServerApi.get('/getBreweryReviews', 
            {params: req},
            { headers: {
              'Accept' : 'application/json', 'Content-type' : 'application/json',
              'authorization' : 'Bearer ' + (await AsyncStorage.getItem('token'))
            }});
            //console.log(response);
            dispatch({type: 'search_results', count: response.data.count, payload: response.data})
            return response;
        } catch (err) {
            console.log("Error: ", err.response)
            
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
        }
    }
}

// const getUserReviews = (dispatch) => {
//     return async ({userId}) => {
//         var req = {userId};

//         try {
//             const response = await ServerApi.get('/')
//         }
//     }
// }
const getReview = (dispatch) => {
    return async ({reviewId}) => {
        var req = {reviewId};
        try {
            const response = await ServerApi.get('/review', 
            {params: req},
            { headers: {
              'Accept' : 'application/json', 'Content-type' : 'application/json',
              'authorization' : 'Bearer ' + (await AsyncStorage.getItem('token'))
            }});
            dispatch({type: 'single_review', count: response.data.count, payload: response.data})
            return response
        } catch (err) {
            console.log("Error: ", err.response)

            console.log(err.response.daeta.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error})
        }
    }
}

const editReview = (dispatch) => {
    return async({breweryId, message, rating, reviewId}) => {
        var req = {breweryId, message, rating, reviewId}
        try {
            const response = await ServerApi.post('/createReview', 
            req,
            { headers: {
              'Accept' : 'application/json', 'Content-type' : 'application/json',
              'authorization' : 'Bearer ' + (await AsyncStorage.getItem('token'))
            }});
            dispatch({type: 'edit', count: response.data.count, payload: response.data})
            return response;
        } catch (err) {
            console.log("Error: ", err.response)

            console.log(err.response.daeta.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error})
        }
    }
}
export const {Provider, Context} = createDataContext(
    reviewReducer,
    {
        createReview,
        getBreweryReviews,
        getReview,
        editReview
    },
    {results: [], count: 0, errorMessage: '', created: '', results: [], single_review: null, edited: ''}
)