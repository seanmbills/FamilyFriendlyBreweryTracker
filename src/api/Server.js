import axios from 'axios'
import {AsyncStorage} from 'react-native'

const server = axios.create({
    baseURL: 'https://ffbtdevelopment.herokuapp.com'
})

async function getNewToken() {
    const refreshToken = await AsyncStorage.getItem('refreshToken')
    if (refreshToken)
        try {
            const response = await server.post('/refreshAuth', {},
            {headers: {
                'Accept': 'application/json', 'Context-type': 'application/json',
                'authorization' : 'Bearer ' + refreshToken
            }})
            return response.data.token
        } catch(err) {
            return Promise.reject(err)
        }
}

server.interceptors.response.use(response => {
    console.log("response: " + response)
    return response
}, (error) => {
    if (error.config && error.response && error.response.status === 401) {
        return getNewToken().then((token) => {
            error.config.headers.authorization = `Bearer ${token}`
            return axios.request(error.config);
        });
    }
    
    return Promise.reject(error);
});

export default server