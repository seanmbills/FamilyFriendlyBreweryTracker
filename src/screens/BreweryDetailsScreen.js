import React, {useState, useContext, useEffect} from 'react'
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'

const BreweryDetailsScreen = ({navigation}) => {
  const breweryId = navigation.getParam('id')
    const {state, getBrewery} = useContext(BreweryContext)
    const [searchTerm, setSearchTerm] = useState("")
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = 50;


    var breweryFont = Math.sqrt((screenWidth - 32)*screenHeight/(state.results[0].name.length))
    breweryFont = Math.min(breweryFont, 35)


    useEffect(() => {
      getBrewery(breweryId)
    }, []);

    console.log(breweryId);
    console.log(state.results);

    return (
    <View>

        <Text
              style={{fontSize: breweryFont, textAlign: 'center', fontWeight: 'bold', marginTop: 25}}>{state.results[0].name}</Text>
        <Text style={styles.textStyleAddress}>{state.results[0].address.street}, {state.results[0].address.city}
        , {state.results[0].address.state} {state.results[0].address.zipCode}</Text>
    </View>
    );
};


const styles = StyleSheet.create({
    breweryName: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 25
    },
    textStyleAddress: {
        fontSize: 25
    },
    textStylename: {
        fontSize: 40
    },
    spaceAtTop: {
        fontSize: 10
    }
});

export default BreweryDetailsScreen;
