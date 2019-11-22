// React native imports
import React, {useState, useContext, useEffect, Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


// Local Imports
import WelcomeButton from '../components/WelcomeButton';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as BreweryContext} from '../context/BreweryContext'
import { withNavigationFocus } from 'react-navigation';
import BufferPopup from '../components/BufferPopup';
import SignInPrompt from '../components/SignInPrompt';
import {Context as ReviewContext} from '../context/ReviewContext';

const MapAuthContext = ({navigation}) => {
    return (
        <ReviewContext.Consumer>
            {
            reviewContext => (
                <AuthContext.Consumer>
                    {
                    context => (<MoreScreenComponent navigation={navigation} context={context} reviewContext={reviewContext}/>)
                    }
                </AuthContext.Consumer>
                )
            }
        </ReviewContext.Consumer>
        
    )
}

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = 50;
var breweryFont = Math.sqrt((screenWidth - 32)*screenHeight/(19))
breweryFont = Math.min(breweryFont, 35)

class MoreScreenComponent extends Component {
    state = {
        isLoading: true,
        foundUser: false,
        showUserErr: false
    }



    componentDidMount() {
        
        // let {getUserReviews} = this.props.reviewContext;
        // console.log(getUserReviews)
        let {getOwnedBreweries, clearBreweryContext} = this.context
        
        this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            console.log(this.props)
            var response = await getOwnedBreweries({token: this.props.context.state.token});
            if (!response || response.status >= 400) {
                this.setState({showUserErr: true})
            }
           

            //Get user's reviews
            // var reviewResponse = await getUserReviews();
            this.setState({isLoading: false})
        })
    }

    componentWillUnmount() {
        this.focusListener.remove()
    }

    render() {
        return (
            <View style={{flex:1}}>
                <BufferPopup isVisible={this.state.isLoading} text={"Fetching Brewery Info"} />
                {
                    !this.state.isLoading &&
                    <MoreScreen navigation={this.props.navigation} noUser={this.state.showUserErr} />
                }

            </View>
        )
    }
}
MoreScreenComponent.contextType = BreweryContext




/*
 * Screen should contain two main components. 1.) a list of breweries a user "own's" or has created
 * 2.) an button which will navigate users to a screen where they can create a brewery
 */
const MoreScreen = ({navigation, noUser}) => {

    /*
     *  Need to import signout method to allow user's to signout of application. 
     */
    const {signout} = useContext(AuthContext);

    /*
     * Need to import three context methods, getBrewery, clearIndividualBreweryResult, getOwnedBreweries
     * getBrewery is used when a brewery from the Owned Breweries list is selected.
     * clearIndividualBreweryResult is used when navigating to the createBrewery screen.
     * getOwnedBreweries is called when the screen is opened. This pulls down all screens a user owns
     */

    const {state, getBrewery, getOwnedBreweries, clearIndividualBreweryResult} = useContext(BreweryContext);
    const revContext = useContext(ReviewContex);
    const [showDialog, setShowDialog] = useState(false);

    /*
     * Added this navigation listener so when a user navigates to the MoreScreen the app will
     * fetch all breweries the user's owns
     */
    console.log("no User: " , noUser)
    console.log("Current state: " , state)
    return (
        <View style={styles.backgroundContainer}>
             <View style={styles.contentContainer}>
                    <Text style={styles.subHeader}>More</Text>
                </View>
            { state.ownedBreweries !== null && state.ownedBreweries.length > 0 &&
             <View>
                <View style={styles.contentContainer}>
                <Text style={styles.subHeader}>My Breweries</Text>
                 {/* flat list will  get populated with breweries a user "Owns" */}
                <FlatList
                    data={state.ownedBreweries}
                    keyExtractor={(result) => {return result.id}}
                    renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            onPress={ async ()=>
                            {
                                await getBrewery({breweryId: item.id});
                                navigation.navigate('EditBrewery')
                            }}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
                showsHorizontalScrollIndicator={false}
                />
                <Text>Review:</Text>
                <FlatList
                    data={revContext.state.results}
                    keyExtractor={(review) => {return review.id}}
                    renderItem={({review}) => {
                        return (
                            <TouchableOpacity
                                onPress={ async() => {
                                    console.log(review.id);
                                }}
                            >
                                <Text>This is a review</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            </View>
            }
            { !noUser && //Determines if will show autentication required features
             <View>
            <View style={styles.contentContainer}>
                <WelcomeButton
                    title="Create Brewery"
                    onPress={() => {
                        // call here ensures no data will be used to populate breweryform on create screen
                        clearIndividualBreweryResult(); 
                        navigation.navigate('CreateBrewery')
                    }}
                />
            </View>
            <View style={styles.contentContainer}>
                <WelcomeButton
                    title="Logout"
                    onPress={()=> {
                        clearBreweryContext();
                        signout()
                        navigation.navigate('Welcome');
                    }}
                />
            </View>
        </View>
        }
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: "#fcc203",
        flex: 1
    },
    subHeader: {
        color: 'black',
        fontSize: 25
    },
    contentContainer: {
        margin:5,
        padding:5,
        flexDirection:'column'
    }
})
export default MoreScreenComponent;
