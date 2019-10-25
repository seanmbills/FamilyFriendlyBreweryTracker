import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {Context as BreweryContext} from '../context/BreweryContext'
import BreweryForm from '../components/BreweryForm';
import WelcomeButton from '../components/WelcomeButton';

const MoreScreen = ({navigation}) => {
    const {state, getOwnedBreweries, createBrewery} = useContext(BreweryContext);
    var breweryListResults = getOwnedBreweries()
    // if (breweryListResults == null || !breweryListResults.length ) {
    //     return null;
    // }
    return (
        <View style={styles.backgroundContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.subHeader}>My Breweries</Text>
                <FlatList
                data={breweryListResults}
                keyExtractor={(result) => result.breweryId}
                renderItem={({item}) => {
                    return (
                        <Text>brewery here</Text>
                    )
                }}
                showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.contentContainer}>
                <WelcomeButton
                    title="Create Brewery"
                    onPress={() => navigation.navigate('CreateBrewery')}
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