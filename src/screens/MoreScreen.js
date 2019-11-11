// React native imports
import React, {useState, useContext, useEffect, Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


// Local Imports
import WelcomeButton from '../components/WelcomeButton';
import {Context as BreweryContext} from '../context/BreweryContext'
import { withNavigationFocus } from 'react-navigation';
import BufferPopup from '../components/BufferPopup';
import SignInPrompt from '../components/SignInPrompt';

class MoreScreenComponent extends Component {
    state = {
        isLoading: true,
        foundUser: false,
        showUserErr: false
    }

    

    componentDidMount() {
        console.log("mounting more screen")
        let {state, getOwnedBreweries} = this.context
        
        this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            console.log("getting breweries")
            var response = await getOwnedBreweries().then(() => {
                this.setState({
                    isLoading: false
                })
            })
            if (!response || response.status >= 400) {
                this.setState({showUserErr: true})
            }
        })
    }

    componentWillUnmount() {
        //this.setState({showUserErr: false})
        this.focusListener.remove()
    }

    render() {
        console.log("rendering more screen")
        return (
            <View style={{flex:1}}>
                <BufferPopup isVisible={this.state.isLoading} text={"Fetching Brewery Info"} />
                {
                    !this.state.isLoading && !this.state.showUserErr &&
                    <MoreScreen navigation={this.props.navigation} />
                }
                {
                    this.state.showUserErr &&
                    <SignInPrompt
                        navigation={this.props.navigation}
                        isVisible={this.state.showUserErr}
                    />
                }
                {
                    !this.state.isLoading && !this.state.foundUser && 
                    <View>
                        <Text>You must login to visit this part of the app</Text>
                        <WelcomeButton
                            title="Login or Register"
                            onPress={()=>this.props.navigation.navigate("loginFlow")}
                        />  
                    </View>
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
const MoreScreen = ({navigation}) => {
    /*
     * Need to import three context methods, getBrewery, clearIndividualBreweryResult, getOwnedBreweries
     * getBrewery is used when a brewery from the Owned Breweries list is selected.
     * clearIndividualBreweryResult is used when navigating to the createBrewery screen.
     * getOwnedBreweries is called when the screen is opened. This pulls down all screens a user owns
     */

    const {state, getBrewery, getOwnedBreweries, clearIndividualBreweryResult} = useContext(BreweryContext);
    const [showDialog, setShowDialog] = useState(false);

    /* 
     * Added this navigation listener so when a user navigates to the MoreScreen the app will
     * fetch all breweries the user's owns 
     */
    return (
        <View style={styles.backgroundContainer}>
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
            </View>
            }
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