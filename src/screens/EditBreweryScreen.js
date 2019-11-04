// React native imports
import React, {useState, useContext} from 'react';
import {Context as BreweryContext} from '../context/BreweryContext';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

// Local components import
import WelcomeButton from '../components/WelcomeButton';
import BreweryForm from '../components/BreweryForm';

/* 
 * Essentially a dummy screen meant to hold a breweryForm component. 
 * State object should contain brewery information from the backend
 */
const EditBreweryScreen = ({navigation}) => {
    const {state} = useContext(BreweryContext);

    return (
        <ScrollView style={styles.backgroundContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Edit Brewery</Text>
            </View>
            <View style={styles.contentContainer}>
                {/* Create breweryform component, give prop isNew value of false since we're editing a brewery not creating a new one */}
                <BreweryForm
                    isNew={false}
                    navigation={navigation}
                    breweryData={state}
                />
            </View>
        </ScrollView>
    );  
}

const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: "#fcc203",
        flex: 1
    },
    contentContainer: {
        margin:5,
        padding:5,
    },
    title: {
        fontWeight:"bold",
        fontSize:25
    }
});
export default EditBreweryScreen;