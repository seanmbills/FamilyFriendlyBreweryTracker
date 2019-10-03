import React, {useState, useContext, useEffect} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'

const BreweryDetailsScreen = ({navigation}) => {
  const breweryId = navigation.getParam('id')
    const {state, getBrewery} = useContext(BreweryContext)
    const [searchTerm, setSearchTerm] = useState("")
    var responce = null
    var isResponceStillNull = '1'

    useEffect(() => {
      responce = getBrewery(breweryId)
    }, [])

    if (responce == null) {
      isResponceStillNull += '0000000000000'
    }

    console.log(breweryId);
    console.log(state.results);
    console.log('bfchwqbfhwerfbhwqbewqrfbiwqerfbilwqrefi');
    //console.log(responce);


    return (
    <View>
        <Text>{isResponceStillNull}</Text>
        <Text style={styles.textStylename}>{state.results[0].address.street}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 45
    },

    textStylename: {
        fontSize: 40
    }
});

export default BreweryDetailsScreen;
