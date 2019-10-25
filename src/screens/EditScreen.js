import React, {useState, useContext} from 'react';
import {Context as BreweryContext} from '../context/BreweryContext';

import {Text, View, StyleSheet} from 'react-native';
import WelcomeButton from '../components/WelcomeButton';
import BreweryForm from '../components/BreweryForm';

const EditScreen = ({navigation}) => {
    const {editBrewery} = useContext(BreweryContext);

    return (
        <ScrollView style={styles.backgroundContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Edit Brewery</Text>
            </View>
            <View style={styles.contentContainer}>
                <BreweryForm
                    isNew={true}
                    navigation={navigation}
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
export default EditScreen;