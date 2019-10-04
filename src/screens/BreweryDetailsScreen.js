import React, {useState, useContext, useEffect} from 'react'
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'

const BreweryDetailsScreen = ({navigation}) => {
  const breweryId = navigation.getParam('id')
    const {state, getBrewery} = useContext(BreweryContext)
    const [searchTerm, setSearchTerm] = useState("")
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = 50;
    var response = null
    var count = 0
    while (state.results[0].breweryId != breweryId) {
      count += 1
    }
    var breweryFont = Math.sqrt((screenWidth - 32)*screenHeight/(state.results[count].name.length))
    console.log(breweryFont);
    // breweryFont = Math.min(breweryFont, 35)

    //
    // useEffect(() => {
    //   console.log(response == null)
    //   response = getBrewery(breweryId)
    //   console.log(response == null)
    //   console.log(state.results[0].breweryId)
    // }, []);

    //
    // console.log(state.results[0].breweryId)
    // console.log(breweryId)
    // console.log(breweryId == state.results[0].breweryId)


    //<Text style={styles.textStylename}>{state.results[0].address.street}</Text>

    return (
    <View>

        <Text
              style={{fontSize: breweryFont, textAlign: 'center', fontWeight: 'bold', marginTop: 25}}>{state.results[count].name}</Text>
        <Text style={styles.textStyleAddress}>{state.results[count].address.street}, {state.results[count].address.city}
        , {state.results[count].address.state} {state.results[count].address.zipCode}</Text>
    </View>
    );
};


const styles = StyleSheet.create({
    breweryName: {
        //fontSize: ${breweryFont},
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
