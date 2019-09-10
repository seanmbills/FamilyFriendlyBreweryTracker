import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext'
import ServerApi from '../api/Server'
import {navigate} from '../navigationRef'

const authReducer = (state, action) => {
    switch(action.type) {
        case 'add_error_message':
            return {...state, errorMessage: action.payload}
        case 'register':
            return {...state, token: action.payload, errorMessage: ''}
        default: 
            return state;
    }
}

const register = (dispatch) => {
    return async ({email, userId, 
        password, birthDate, firstName, lastName,
        phoneNumber, zipCode }) => {
        // make api request to sign up with this information
        try { 
            const response = await ServerApi.post('/signup', {email, userId, 
                password, birthDate, firstName, lastName, phoneNumber, zipCode }, 
                { 'Accept' : 'application/json', 'Content-type': 'application/json'});
            console.log(response.data);
            // if we sign up, modify our state to reflect that we're authenticated
            // (aka got a token back)
            // we also store the token on the device for later access
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type: 'register', payload: response.data.token})

            // then need to navigate the user immediately to the logged in state
            navigate('loggedInFlow')
        } catch (err) {
            console.log(err.response)
            // if we get an error back from signing up, need to display the appropriate error
            // message to the user
            dispatch({ type: 'add_error_message', payload: err.response.data})
        }
    }
}

const signin = (dispatch) => {
    return ({emailOrId, password}) => {
        // try to sign in

        // handle success by updating state

        // handle failure with error message
    }
}

const signout = (dispatch) => {
    return () => {
        // somehow sign out the uer
    }
}

export const {Provider, Context} = createDataContext(
    authReducer,
    {register, signin, signout},
    {token: null, errorMessage: ''}
)