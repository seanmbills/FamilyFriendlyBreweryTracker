import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import WelcomeButton from '../components/WelcomeButton';
import BreweryForm from '../components/BreweryForm';
import { ScrollView } from 'react-native-gesture-handler';
import {Context as BreweryContext} from '../context/BreweryContext';

const CreateBreweryScreen = ({navigation}) => {
    const {state, createBrewery} = useContext(BreweryContext);
    return (
        <ScrollView style={styles.backgroundContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Create Brewery</Text>
            </View>
            <View style={styles.contentContainer}>
                <BreweryForm
                    isNew={false}
                />
            </View>
            <View style={styles.contentContainer}>
                <WelcomeButton
                    title="Save"
                />
                <WelcomeButton
                    title="Cancel"
                    onPress={() => navigation.navigate("More")}
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