import createDateContext from './createDataContext'

const authReducer = (state, action) => {
    switch(action.type) {
        default: 
            return state;
    }
}

export const {Provider, Context} = createDateContext(
    authReducer,
    {},
    {isSignedIn: false}
)