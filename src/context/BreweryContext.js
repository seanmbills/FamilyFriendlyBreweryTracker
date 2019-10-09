import createDataContext from './createDataContext'
import ServerApi from '../api/Server'
import {navigate} from '../navigationRef'

const breweryReducer = (state, action) => {
    switch(action.type) {
        case 'add_error_message':
            return {...state, errorMessage: action.payload, results: null}
        case 'brewery':
        case 'search':
            return {...state, count: action.payload.count, results: action.payload.response}
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        default:
            return state;
    }
}

const getSearchResults = (dispatch) => {
    return async ({
        name, latitude, longitude, zipCode, distance,
        maximumPrice, accommodationsSearch, openNow,
        kidFriendlyNow, minimumRating
    }) => {
        // make api request to sign up with this information
        const req = {
            name, latitude, longitude, zipCode, distance,
            maximumPrice, accommodationsSearch, openNow,
            kidFriendlyNow, minimumRating
        }
        try {
            const response = await ServerApi.get('/search',
                {params: req},
                {headers: { 'Accept' : 'application/json', 'Content-type': 'application/json'}}
            );

            dispatch({type: 'search', payload: response.data})

            // then need to navigate the user immediately to the logged in state
        } catch (err) {
            console.log(err.response.data.error)
            // if we get an error back from signing up, need to display the appropriate error
            // message to the user
            dispatch({ type: 'add_error_message', payload: err.response.data.error})
        }
    }
}

const getBrewery = (dispatch) => {
    return async ({
        breweryId
    }) => {
        // make api request to sign up with this information
        const req = {
            breweryId
        }
        console.log("Brewery ID: " + breweryId)
        console.log("Req: " + JSON.stringify(req))
        try {
            const response = await ServerApi.get('/brewery',
                {params: req},
                {headers: { 'Accept' : 'application/json', 'Content-type': 'application/json'}}
            );

            console.log("response: " + response)

            dispatch({type: 'brewery', payload: response.data})

            // then need to navigate the user immediately to the logged in state
        } catch (err) {
            console.log(err.response.data.error)
            // if we get an error back from signing up, need to display the appropriate error
            // message to the user
            dispatch({ type: 'add_error_message', payload: err.response.data})
        }
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
}


export const {Provider, Context} = createDataContext(
    breweryReducer,
    {
        getSearchResults,
        getBrewery
    },
    {results: [], count: 0, errorMessage: ''}
)
