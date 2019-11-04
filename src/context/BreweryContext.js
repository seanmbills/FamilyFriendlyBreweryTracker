import createDataContext from './createDataContext'
import ServerApi from '../api/Server'
import {navigate} from '../navigationRef'
import {AsyncStorage} from 'react-native'


const breweryReducer = (state, action) => {
    switch(action.type) {
        case 'add_error_message':
            return {...state, errorMessage: action.payload, results: null}
        case 'create':
            return {...state, created: action.payload.response}
        case 'brewery':
            return {...state, errorMessage: '', individualResult: action.payload.response}
        case 'search':
            return {...state, count: action.payload.count, results: action.payload.response}
        case 'owned_breweries':
            return {...state, ownedBreweries: action.payload.names}
        case 'clear_individual_brewery_result':
            return {...state, individualResult: null};
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
            req = {
                name, zipCode, distance,
                maximumPrice, accommodationsSearch, openNow, 
                kidFriendlyNow, minimumRating
            }
        }
        
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

/*
 * Gets a list of the brewery names and ids that a users "Owns" or has created
*/
const getOwnedBreweries = (dispatch) => {
    return async () => {
        try {
            const response = await ServerApi.get('/getOwnedBreweries', { headers: {
              'Accept' : 'application/json', 'Content-type' : 'application/json',
              'authorization' : 'Bearer ' + (await AsyncStorage.getItem('token'))
            }});
            
            // attach list of owned breweries to context object
            dispatch({type: 'owned_breweries', payload: response.data})
        } catch (err) {
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
        }
    }
}

/*
 * Sends request to backend to create a brewery
 *
 * @param name - the brewery name
 * @param address - the brewery address
 *              - contains: street, city, state, and zipcode
 * @param price - integer - 0-4 which indicates relatively how expensive a brewery is $-$$$
 * @param phoneNumber - string - the brewery phone number (of form XXXXXXXXXX)
 * @param email - string - the email address for the brewery
 * @param website - string - the website address for the brewery
 * @param businessHours - object - contains open and close hours for each day of the week
 * @param kidsHoursSameAsNormal - boolean - true if kidFriendlyHours match business operational hours
 * @param alternativeKidFriendlyHours - object - contains hours, open and close, for when brewery is kidFriendly
 * @param accommodations - object - contains true & false for accommodations the brewery has chosen to add
 * 
 * @return - a response object from the backend. Most important information is the response.status (code)
 */
const createBrewery = (dispatch) => {
    
    return async ({
            name, address, price, phoneNumber, 
            email, website, businessHours, kidHoursSameAsNormal, 
            alternativeKidFriendlyHours, accommodations
            }) => {
        accommodations = stripAccommodationsSearch(accommodations); //remove fields from accommodations object which are false

        var req = {name, address, price, phoneNumber, email, website,
                    businessHours, kidHoursSameAsNormal, alternativeKidFriendlyHours,
                    accommodations
                };
        try {
            console.log("create Brewery parameters: " , req);
            const response = await ServerApi.post('/createBrewery',
                req, 
                {headers: {
                    'Accept' : 'application/json', 'Content-type' : 'application/json',
                    'authorization' : 'Bearer ' + (await AsyncStorage.getItem('token'))}}
            );

            dispatch({type: 'create', payload: response.data})
            return response;
        }
        catch (err) {
            console.log(err)
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
        }
    }
}

/*
 * Gets detailed information about a brewery by querying the database using its id
 *
 * @param - breweryId - unique breweryId to be used to query the backend
 */
const getBrewery = (dispatch) => {
    return async ({
        breweryId
    }) => {
        // make api request to get a single brewery with this id
        const req = {
            breweryId
        }
        try {
            const response = await ServerApi.get('/brewery',
                {params: req},
                {headers: { 'Accept' : 'application/json', 'Content-type': 'application/json'}}
            );
            dispatch({type: 'brewery', payload: response.data})

        } catch (err) {
            console.log(err.response.data.error)
            dispatch({ type: 'add_error_message', payload: err.response.data})
        }
    }
}

/*
 * Sends request to backend to update a brewery
 *
 * @param name - the brewery name
 * @param address - the brewery address
 *              - contains: street, city, state, and zipcode
 * @param price - integer - 0-4 which indicates relatively how expensive a brewery is $-$$$
 * @param phoneNumber - string - the brewery phone number (of form XXXXXXXXXX)
 * @param email - string - the email address for the brewery
 * @param website - string - the website address for the brewery
 * @param businessHours - object - contains open and close hours for each day of the week
 * @param kidsHoursSameAsNormal - boolean - true if kidFriendlyHours match business operational hours
 * @param alternativeKidFriendlyHours - object - contains hours, open and close, for when brewery is kidFriendly
 * @param accommodations - object - contains true & false for accommodations the brewery has chosen to add
 * 
 * @return - a response object from the backend. Most important information is the response.status (code)
 */
const updateBrewery = (dispatch) => {
    return async ({
            breweryId,
            name, address, price, phoneNumber, 
            email, website, businessHours, kidHoursSameAsNormal, 
            alternativeKidFriendlyHours, accommodations
            }) => {
        accommodations = stripAccommodationsSearch(accommodations);

        var req = { breweryId, newName: name, newAddress: address,
                    newPrice: price, newPhoneNumber: phoneNumber, newEmail: email,
                    newWebsite: website, newBusinessHours: businessHours,
                    newKidFriendlyHours: alternativeKidFriendlyHours,
                    newAccommodations: accommodations
                };
        console.log(JSON.stringify(req))

        try {
           
            const response = await ServerApi.post('/updateBrewery',
                req, 
                {headers: {
                    'Accept' : 'application/json', 'Content-type' : 'application/json',
                    'authorization' : 'Bearer ' + (await AsyncStorage.getItem('token'))}}
            );
            dispatch({type: 'create', payload: response.data})
            return response;
        }
        catch (err) {
            console.log(err)
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
        }
    }
}

/*
 * Removes individualBreweryResult data from context object
*/
const clearIndividualBreweryResult = (dispatch) => {
    return async () => {
        dispatch({type: 'clear_individual_brewery_result', payload: null});
    }
}

// const clearErrorMessage = dispatch => () => {
//     dispatch({type: 'clear_error_message'})
// }


export const {Provider, Context} = createDataContext(
    breweryReducer,
    {
        getOwnedBreweries,
        getSearchResults,
        createBrewery,
        updateBrewery,
        getBrewery,
        clearIndividualBreweryResult
    },
    {results: [], count: 0, individualResult: null, ownedBreweries: [], errorMessage: '', created: ''}
)

