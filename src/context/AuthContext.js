import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext'
import ServerApi from '../api/Server'
import {navigate} from '../navigationRef'
import axios from 'axios'
Buffer = require('buffer/').Buffer


const authReducer = (state, action) => {
    switch(action.type) {
        case 'add_error_message':
            return {...state, errorMessage: action.payload}
        case 'updatePassword':
        case 'updateUser':
        case 'updateEmail':
        case 'updatePhone':
        case 'signin':
            return {...state, token: action.payload, errorMessage: ''}
        case 'register':
            return {...state, token: action.payload.token, /*signedURL: action.payload.signedURL,*/ errorMessage: ''}
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        default: 
            return state;
    }
}

const register = (dispatch) => {
    return async ({email, userId, 
        password, birthDate, firstName, lastName,
        phoneNumber, zipCode, profilePic }) => {
        // make api request to sign up with this information
        try { 
            // const response = await ServerApi.post('/signup', {email, userId, 
            //     password, birthDate, firstName, lastName, phoneNumber, zipCode }, 
            //     { 'Accept' : 'application/json', 'Content-type': 'application/json'});
            // console.log(response.data);
            // if we sign up, modify our state to reflect that we're authenticated
            // (aka got a token back)
            // we also store the token on the device for later access
            // await AsyncStorage.setItem('token', response.data.token)
            // await AsyncStorage.setItem('signedURL', response.data.signedURL)

            // upload the profile picture, if there is one, to the AWS S3 instance
            if (profilePic) {
                // profilePic.name = `${userId}.jpg`
                // console.log(profilePic.name)
                // console.log(profilePic)

                // let formData = new FormData()
                // formData.append(
                //     'sbills4', {
                //         uri: profilePic.uri,
                //         name: 'sbills4.jpg',
                //         type: 'image/jpeg'
                //     }
                // )

                // let options = {
                //     method: 'PUT',
                //     body: formData,
                //     headers: {
                //       Accept: 'application/json',
                //       'Content-Type': 'multipart/form-data',
                //     },
                //   };
                
                //   const response = await fetch("https://fambrews-images.s3.amazonaws.com/accountImages/sbills4.jpg?AWSAccessKeyId=AKIAQJJ2SEXMULJ2CXN4&Content-Type=image%2Fjpeg&Expires=1572555309&Signature=UmcARxdzaU%2FzWhYyatjupEsBkV0%3D", options);
                //   console.log(response)
                var options = {
                    headers: {
                        'Content-Type': 'image/jpeg'
                    }
                }
                // const awsResponse = await axios.put("https://fambrews-images.s3.amazonaws.com/accountImages/sbills4.jpg?AWSAccessKeyId=AKIAQJJ2SEXMULJ2CXN4&Content-Type=image%2Fjpeg&Expires=1572555309&Signature=UmcARxdzaU%2FzWhYyatjupEsBkV0%3D",
                //     profilePic, options
                // )
                var buff = Buffer.from(profilePic.base64, 'base64')
                const awsResponse = await axios.put(
                    "https://fambrews-images.s3.amazonaws.com/accountImages/sbills4.jpg?AWSAccessKeyId=AKIAQJJ2SEXMULJ2CXN4&Content-Type=image%2Fjpeg&Expires=1572563802&Signature=AGDkBs6XQixbThlfSKCjMatokyQ%3D",
                    // {
                    //     uri: profilePic.uri,
                    //     type: 'image/jpeg',
                    //     name: 'sbills4.jpg'
                    // },
                    buff,
                    options
                )
                console.log(awsResponse)
                // axios.put(response.data.signedURL, profilePic, options)
            }

            // dispatch({type: 'register', payload: response.data})

            // then need to navigate the user immediately to the logged in state
            navigate('loggedInFlow')
        } catch (err) {
            console.log("Error: " + err)
            // if we get an error back from signing up, need to display the appropriate error
            // message to the user
            dispatch({ type: 'add_error_message', payload: err.response.data.error})
        }
    }
}

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
    {token: null, signedURL: '', errorMessage: ''}
)