import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext'
import ServerApi from '../api/Server'
import {navigate} from '../navigationRef'
//import { decode } from 'punycode';
import jwt from 'react-native-pure-jwt';

const authReducer = (state, action) => {
    switch(action.type) {
        case 'add_error_message':
            return {...state, errorMessage: action.payload}
        case 'updatePassword':
        case 'updateUser':
        case 'updateEmail':
        case 'updatePhone':
        case 'register':
        case 'signin':
            return {...state, token: action.payload, errorMessage: ''}
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        default: 
            return state;
    }
}

/*
 * Method used to send a request to the backend to register a user
 * 
 * @param email - string - a user's email address
 * @param userId - string - a username the user may use to login with
 * @param password - string - a user's password that a user will use to login with
 * @param birthDate - string - a user's birthDate, used to verify the user is over 21 years old
 * @param firstName - string - a users first name
 * @param lastName - string - a user's last name
 * @param phoneNumber - string - a user's phoneNumber
 * @param zipCode - string - a user's zipCode
 */
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
            console.log(err.response.data.error)
            // if we get an error back from signing up, need to display the appropriate error
            // message to the user
            dispatch({ type: 'add_error_message', payload: err.response.data.error})
        }
    }
}

/*
 * Method used to attempt to sign a user in to the backend
 *
 * @param emailOrId - string - user's email or userId they're attempting to login with
 * @param password - string - entered password to attempt to authenticate with
*/
const signin = (dispatch) => {
    return async ({emailOrId, password}) => {
        // try to sign in
        try {
            const response = await ServerApi.post('/signin', {emailOrId, password}, 
                { 'Accept' : 'application/json', 'Content-type': 'application/json'});
            console.log(response.data); 
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type: 'signin', payload: response.data.token})
            
            navigate('loggedInFlow')
        } catch (err) {
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error})
        }
        // handle success by updating state

        // handle failure with error message
    }
}

//Sends post request to /forgotPassword route on server to send email & get token
//@param - emailOrId - an entered email or userId which will be used to send a password reset email
const forgotPassword = (dispatch) => {
    return async({emailOrId}) => {
        try {
            const response = await ServerApi.post('/forgotPassword', {emailOrId},
                { 'Accept' : 'application/json', 'Content-type' : 'application/json'});

            //navigate('ForgotPassword')
        } catch (err) {
            console.log(err.response.data);
            dispatch({type: 'add_error_message', payload: err.response.data.error.errmsg})

        }
    }
}

/*
 * Method used to reset a user's password
 * 
 * @param emailOrid - string - the user's email or userId they had entered to receive a reset code
 * @param resetCode - string - a unique code emailed to the user to ensure authenticity
 * @param newPassword - string - the user's new passcode
*/
const resetPassword = (dispatch) => {
    return async({emailOrId, resetCode, newPassword}) => {
        try {
            const response = await ServerApi.post('/resetPassword', {emailOrId, resetCode, newPassword},
                { 'Accept' : 'application/json', 'Content-type' : 'application/json'});

            navigate('PasswordResetSuccess')
        } catch (err) {
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error})
        }
    }
}


/*
 * Used to update user account fields which  do not require a password to update
 *
 * @param firstName - string - a user's altered firstName
 * @param lastName - string - a user's altered lastName
 * @param zipCode - string - a user's updated zipCode
*/
const userUpdate = (dispatch) => {
    return async({firstName, lastName, zipCode}) => {
        try {
            const response = await ServerApi.post('/userUpdate', {firstName, lastName, zipCode},{ headers: 
                {'Accept' : 'application/json', 'Content-type' : 'application/json',
                'authorization' : "Bearer " + (await AsyncStorage.getItem('token'))}});
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type: 'userUpdate', payload: response.data.token})
        } catch (err) {
            console.log(err.response.data);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
        }
    }
}

/*
 * Used to update a user's password (while they are logged into the app)
 * 
 * @param oldPassword - string - password to confirm user authenticity
 * @param newPassword - string - the new user password
 */
const updatePassword = (dispatch) => {
    return async({oldPassword, newPassword}) => {
        try {
            console.log('token: ')
            console.log(await AsyncStorage.getItem('token'))
            const response = await ServerApi.post('/updatePassword', {oldPassword, newPassword}, { headers: 
            {'Accept' : 'application/json', 'Content-type' : 'application/json',
            'authorization' : "Bearer " + (await AsyncStorage.getItem('token'))}});
            
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type: 'updatePassword', payload: response.data.token})
            console.log(response)
        } catch (err) {
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
        }
    }
}

/*
 * Method used to update a user's email address. A password is needed to do this because a user's password is
 * reset by emailing them a resetcode
 * 
 * @param newEmail - string - the user's new email address
 * @param password - string - user's password (again used to confirm user authenticity)
 */
const updateEmail = (dispatch) => {
    return async({newEmail, password}) => {
        try {
            const response = await ServerApi.post('/updateEmail', {newEmail, password},{ headers: 
                {'Accept' : 'application/json', 'Content-type' : 'application/json',
                'authorization' : "Bearer " + (await AsyncStorage.getItem('token'))}});
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type: 'updateEmail', payload: response.data.token})
        } catch (err) {
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
        }
    }
}

/*
 * Method used to update a user's phoneNumber. A password is needed to do this because a hopeful additional feature
 * is to reset a user's password using his/her phone
 * 
 * @param newPhone - string - the user's new phone number
 * @param password - string - user's password (again used to confirm user authenticity)
 */
const updatePhone = (dispatch) => {
    return async({password, newPhone}) => {
        try {
            const response = await ServerApi.post('/updatePhone', {password, newPhone},{ headers: 
                {'Accept' : 'application/json', 'Content-type' : 'application/json',
                'authorization' : "Bearer " + (await AsyncStorage.getItem('token'))}});
            await AsyncStorage.setItem('token', response.data.token)
            dispatch({type: 'updatePhone', payload: response.data.token})
        } catch (err) {
            console.log(err.response.data.error);
            dispatch({type: 'add_error_message', payload: err.response.data.error});
        }
    }
}

/*
 * Clears all error messages from the context object
 */
const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'})
}

const tryAutoSignin = dispatch => async() => {
    const token = await AsyncStorage.getItem('token')
    if (token)
        try {
            const {exp} = decode(token)
            if (Date.now() < exp * 1000)
                dispatch({type: 'signin', payload: token})
        } catch(err) {

        }
}


const signout = (dispatch) => {
    return () => {
        // somehow sign out the uer
    }
}



export const {Provider, Context} = createDataContext(
    authReducer,
    {register, signin, signout, forgotPassword, resetPassword, clearErrorMessage, 
        userUpdate, updatePassword, updateEmail, updatePhone},// tryAutoSignin},
    {token: null, errorMessage: ''}
)