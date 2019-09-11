import {NavigationActions} from 'react-navigation'

let navigator

export const setNavigator = (nav) => {
    navigator = nav
}

// allows us to navigate from screen to screen without having to have
// direct access to a navigation object to do so
// primarily allows us to make calls from outside a component (i.e. inside 
//      of our context object))
export const navigate = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    )
}