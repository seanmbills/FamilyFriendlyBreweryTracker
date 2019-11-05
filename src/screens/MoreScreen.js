// React native imports
import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { withNavigationFocus } from 'react-navigation';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

// Local Imports
import WelcomeButton from '../components/WelcomeButton';
import {Context as BreweryContext} from '../context/BreweryContext'


/* 
 * Screen should contain two main components. 1.) a list of breweries a user "own's" or has created
 * 2.) an button which will navigate users to a screen where they can create a brewery
 */
const MoreScreen = ({navigation}) => {
    this.focusListener = navigation.addListener('didFocus', async () => {
        setShowDialog(true);
        await getOwnedBreweries();
        setShowDialog(false);
    })

    /*
     * Need to import two context methods, getBrewery and clearIndividualBreweryResult
     * getBrewery is used when a brewery from the Owned Breweries list is selected.
     * clearIndividualBreweryResult is used when navigating to the createBrewery screen.
     */

    const {state, getBrewery, getOwnedBreweries, clearIndividualBreweryResult} = useContext(BreweryContext);
    const [showDialog, setShowDialog] = useState(false);
    return (
        <View style={styles.backgroundContainer}>
            { state.ownedBreweries.length > 0 &&
             <View>
                <View style={styles.contentContainer}>
                <Text style={styles.subHeader}>My Breweries</Text>
                 {/* flat list will get populated with breweries a user "Owns" */}
                <FlatList
                    data={state.ownedBreweries}
                    keyExtractor={(result) => result.breweryId}
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
            <Dialog
                visible={showDialog}
            >
                <DialogContent>
                    <View>
                        <Text>Fetching Owned Breweries...</Text>
                    </View>
                </DialogContent>
            </Dialog>
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
export default MoreScreen;