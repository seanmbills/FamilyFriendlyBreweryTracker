// React native imports
import React, {useState, useContext, useEffect, Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


// Local Imports
import WelcomeButton from '../components/WelcomeButton';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as BreweryContext} from '../context/BreweryContext'
import {Context as ReviewContext} from '../context/ReviewContext'
import { withNavigationFocus } from 'react-navigation';
import BufferPopup from '../components/BufferPopup';
import SignInPrompt from '../components/SignInPrompt';

const MapAuthContext = ({navigation}) => {
    return (
        <AuthContext.Consumer>
            {
                context => (<MoreScreenComponent navigation={navigation} context={context} />)
            }
        </AuthContext.Consumer>
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
        let {state, getOwnedBreweries} = this.context

        this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            var response = await getOwnedBreweries({token: this.props.context.state.token});
            if (!response || response.status >= 400) {
                this.setState({showUserErr: true})
            }
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
    const {getReview} = useContext(ReviewContext);
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
            { state.ownedBreweries.length > 0 &&
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
            </View>
              <TouchableOpacity
              onPress={ async ()=>
              {
                  await getReview({reviewId: "5dc88df68c35b50004bf5995"});
                  navigation.navigate('WriteReview', {breweryId: "5dc6139c43f7ef00046c02b8", breweryName:"Scofflaw", breweryFontSize: breweryFont, isEditingAReview: true, reviewId: '5dc88df68c35b50004bf5995'});
              }}
              >
              <Text style={styles.subHeader}>Click here to edit Carl's review</Text>
              </TouchableOpacity>
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
                        // this.focusListener.remove()
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
