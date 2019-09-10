import createDataContext from './createDataContext'
import ServerApi from '../api/Server'

const authReducer = (state, action) => {
    switch(action.type) {
        case 'add_error_message':
            return {...state, errorMessage: action.payload}
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
        } catch (err) {
            console.log(err.response);
            dispatch({ type: 'add_error_message', payload: err.response.data})
        }
        // if we sign up, modify our state to reflect that we're authenticated
        // (aka got a token back)

        // if signing up fails, need to display an error somewhere
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
    {token: false, errorMessage: ''}
)