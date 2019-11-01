import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import WelcomeButton from '../components/WelcomeButton';
import BreweryForm from '../components/BreweryForm';
import { ScrollView } from 'react-native-gesture-handler';
import {Context as BreweryContext} from '../context/BreweryContext';

const CreateBreweryScreen = ({navigation}) => {
    return (
        <ScrollView style={styles.backgroundContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Create Brewery</Text>
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

export default CreateBreweryScreen;