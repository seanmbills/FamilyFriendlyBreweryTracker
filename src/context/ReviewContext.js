import createDataContext from './createDataContext'
import ServerApi from '../api/Server'
import {navigate} from '../navigationRef'
import {AsyncStorage} from 'react-native'


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
        default:
            return state;
    }
}

const createReview = (dispatch) => {
    return async ({message, breweryId, rating}) => {
        console.log(typeof(rating))
        try {
            var req = {message: message, breweryId: breweryId, rating: rating}
            console.log(req);
            const response = await ServerApi.post('/createReview', 
            req,
            { headers: {
              'Accept' : 'application/json', 'Content-type' : 'application/json',
              'authorization' : 'Bearer ' + (await AsyncStorage.getItem('token'))
            }});
            console.log(response.data)
            
            dispatch({type: 'create', payload: response.data})
            return response;
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
            }});
            //console.log(response);
            dispatch({type: 'search_results', payload: response.data})
            return response;
        } catch (err) {
            console.log("Error: ", err.response)
            
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
        }
    }
}

const testForToken = () => {
    return async () => {
        var userToken = await AsyncStorage.getItem('token')
        
        return !(!userToken || userToken === '')
    }
}
export const {Provider, Context} = createDataContext(
    reviewReducer,
    {
        createReview,
        getBreweryReviews,
        testForToken
    },
    {results: [], count: 0, errorMessage: '', created: '', results: []}
)