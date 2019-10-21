import createDataContext from './createDataContext'
import ServerApi from '../api/Server'
import {navigate} from '../navigationRef'

const breweryReducer = (state, action) => {
    switch(action.type) {
        case 'add_error_message':
            return {...state, errorMessage: action.payload}
        case 'search':
            return {...state, count: action.payload.count, results: action.payload.response}
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        default: 
            return state;
    }
}

function stripAccommodationsSearch(accommodationsSearch) {
    for (var outerKey in accommodationsSearch) {
        var numInKeys = 0;
        for (var innerKey in accommodationsSearch[outerKey]) {
            numInKeys += 1;
            if (!accommodationsSearch[outerKey][innerKey]) {
                numInKeys -= 1;
                delete accommodationsSearch[outerKey][innerKey];
            }
            var numInInkeys = 0;
            for (var innerInnerKey in accommodationsSearch[outerKey][innerKey]) {
                numInInkeys += 1;
                if (!accommodationsSearch[outerKey][innerKey][innerInnerKey] ) {
                    delete accommodationsSearch[outerKey][innerKey][innerInnerKey];
                    numInInkeys -= 1;
                }
            }
            if (numInInkeys == 0 && accommodationsSearch[outerKey][innerKey] instanceof Object) {
                numInKeys -= 1;
                delete accommodationsSearch[outerKey][innerKey];
            }

        }
        if (numInKeys == 0 && accommodationsSearch[outerKey] instanceof Object) {
            delete accommodationsSearch[outerKey];
        }
        if (!accommodationsSearch[outerKey]) {
            delete accommodationsSearch[outerKey];
        }
    }
    for (var key in accommodationsSearch) {
        return accommodationsSearch
    }
    return null;
}
const getSearchResults = (dispatch) => {
    return async ({
        name, latitude, longitude, zipCode, distance,
        maximumPrice, accommodationsSearch, openNow, 
        kidFriendlyNow, minimumRating
    }) => {

        accommodationsSearch = stripAccommodationsSearch(accommodationsSearch);
        // make api request to sign up with this information
       
        var req = {
            name, latitude, longitude, zipCode, distance,
            maximumPrice, accommodationsSearch, openNow, 
            kidFriendlyNow, minimumRating
        }
        if (latitude == '' || longitude == '') {
            const req = {
                name, zipCode, distance,
                maximumPrice, accommodationsSearch, openNow, 
                kidFriendlyNow, minimumRating
            }
        }
        console.log(req);
        try { 
            const response = await ServerApi.get('/search',
                {params: req}, 
                {headers: { 'Accept' : 'application/json', 'Content-type': 'application/json'}}
            );
            console.log(response.data);
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

const getOwnedBreweries = (dispatch) => {
    return async () => {
        try {
            const response = await ServerApi.post('/getOwnedBreweries', { headers: {
              'Accept' : 'application/json', 'Content-type' : 'application/json',
              'authorization' : 'Bearer ' + (await AsyncStorage.getItem('token'))
            }});
            console.log("response: ");
            console.log(response);
        } catch (err) {
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
        }
    }
}

const createBrewery = (dispatch) => {
    console.log("createBrewery context called");
    return async ({
            name, address, price, phoneNumber, 
            email, website, businessHours, kidHoursSameAsNormal, 
            alternativeKidFriendlyHours, accommodationsSearch
            }) => {
        accommodationsSearch = stripAccommodationsSearch(accommodations);

        var req = {name, address, price, phoneNumber, email, website,
                    businessHours, kidHoursSameAsNormal, alternativeKidFriendlyHours,
                    accommodationsSearch
                };
        try {
            console.log('Create brewery request sent');
            const response = await ServerApi.post('/createBrewery',
                req, 
                {headers: {
                    'Accept' : 'application/json', 'Content-type' : 'application/json',
                    'authorization' : 'Bearer ' + (await AsyncStorage.getItem('token'))}}
            );
            console.log("response: ");
            console.log(response);
        }
        catch (err) {
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
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
        getOwnedBreweries,
        createBrewery
    },
    {results: [], count: 0, errorMessage: ''}
)