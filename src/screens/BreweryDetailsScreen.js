import React, {useState, useContext} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'

const BreweryDetailsScreen = ({navigation}) => {
    const {state, getSearchResults} = useContext(BreweryContext)
    const [searchTerm, setSearchTerm] = useState("")
    //const id = props.id
    console.log(state.results);


    return (
    <View>
        <Text></Text>
        <Text style={styles.textStylename}>{state.results[0].address.street}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 45
    },

    textStylename: {
        fontSize: 20
    }
});

export default BreweryDetailsScreen;