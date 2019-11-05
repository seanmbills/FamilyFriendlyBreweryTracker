import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {Context as BreweryContext} from '../context/BreweryContext'
import BreweryForm from '../components/BreweryForm';
import WelcomeButton from '../components/WelcomeButton';
import { withNavigationFocus } from 'react-navigation';

import Dialog, {DialogContent} from 'react-native-popup-dialog';

const MoreScreen = ({navigation}) => {
    this.focusListener = navigation.addListener('didFocus', async () => {
        setShowDialog(true);
        await getOwnedBreweries();
        setShowDialog(false);
    })

    const {state, getBrewery, getOwnedBreweries, clearIndividualBreweryResult} = useContext(BreweryContext);
    console.log(state.ownedBreweries);
    const [showDialog, setShowDialog] = useState(false);
    return (
        <View style={styles.backgroundContainer}>
            { state.ownedBreweries.length > 0 &&
             <View>
                <View style={styles.contentContainer}>
                <Text style={styles.subHeader}>My Breweries</Text>
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