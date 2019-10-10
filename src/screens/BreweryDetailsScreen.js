import React, {useState, useContext, useEffect} from 'react'
import {View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'
import {Rating} from 'react-native-ratings'
import Emoji from 'react-native-emoji'


const BreweryDetailsScreen = ({navigation}) => {
    const breweryId = navigation.getParam('id')
    var {state, getBrewery} = useContext(BreweryContext)
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = 50;
    var breweryFont = Math.sqrt((screenWidth - 32)*screenHeight/(state.results[0].name.length))
    breweryFont = Math.min(breweryFont, 35)
    var waterBowl = ' '
    if (!state.results[0].accommodations.petFriendly.waterStations) {
        waterBowl = ' not '
    }


    var boolToAnswerDict = {
        false:'no',
        true:'yes'
    };

    useEffect(() => {
        getBrewery({breweryId})
    }, []);
    

    var petsAllowedInside =  state.results[0].accommodations.petFriendly.indoorSpaces
    var petsAllowedOutside = state.results[0].accommodations.petFriendly.outdoorSpaces
    var toddlerAllowed = state.results[0].accommodations.friendlyKidAges.toddlers
    var youngKidsAllowed = state.results[0].accommodations.friendlyKidAges.youngKids
    var teensAllowed = state.results[0].accommodations.friendlyKidAges.teens
    var kidFriendlyFood = state.results[0].accommodations.kidFoodDrinks.kidFriendlyFood
    var kidFriendlyDrinks = state.results[0].accommodations.kidFoodDrinks.kidFriendlyDrinks
    var kidGamesInside = state.results[0].accommodations.childAccommodations.games.indoor
    var kidGamesOutdoor = state.results[0].accommodations.childAccommodations.games.outdoor
    var kidSeating = state.results[0].accommodations.childAccommodations.seating
    var strollerSpace = state.results[0].accommodations.childAccommodations.strollerSpace
    var changingStations = state.results[0].accommodations.changingStations

    return (
    <ScrollView style={styles.scrollView}>
        <Text
              style={{fontSize: breweryFont, textAlign: 'center', fontWeight: 'bold', marginTop: 25, paddingBottom: 15}}>{state.results[0].name}
        </Text>


        <TouchableOpacity>
          <Rating
              imageSize={20}
              readonly
              startingValue={state.results[0].rating}
              fractions={1}
          />
          <Text
              style={{textAlign: 'center'}}> {state.results[0].numReviews} reviews
          </Text>
        </TouchableOpacity>

        <Text style={{textAlign: 'center', paddingTop: 120, paddingBottom: 120}}> pics here
        </Text>

        <Text style={styles.textStyleAddress}>{state.results[0].address.street}, {state.results[0].address.city}
        , {state.results[0].address.state} {state.results[0].address.zipCode}
        </Text>

        <Text>{state.results[0].website}</Text>

        <Text style={styles.accommodationsHeaders}>Are pets allowed?</Text>

        {petsAllowedInside && <Text style={styles.accommodations}> inside: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {!petsAllowedInside && <Text style={styles.accommodations}> inside: <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {petsAllowedOutside && <Text style={styles.accommodations}> outside: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {!petsAllowedOutside && <Text style={styles.accommodations}> outside: <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {(petsAllowedInside || petsAllowedOutside) && <Text style={styles.accommodations}> there are{waterBowl}water stations for pets</Text>}

        <Text style={styles.accommodationsHeaders}>Are kids allowed?</Text>

        {toddlerAllowed && <Text style={styles.accommodations}> toddlers: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {!toddlerAllowed && <Text style={styles.accommodations}> toddlers: <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {youngKidsAllowed && <Text style={styles.accommodations}> young kids: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {!youngKidsAllowed && <Text style={styles.accommodations}> young kids: <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {teensAllowed && <Text style={styles.accommodations}> teens: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {!teensAllowed && <Text style={styles.accommodations}> teens: <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {(toddlerAllowed || youngKidsAllowed || teensAllowed) && <Text style={styles.accommodationsHeaders}>Are there kid friendly menu items?</Text>}

        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && kidFriendlyFood) &&
          <Text style={styles.accommodations}>food : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && !kidFriendlyFood) &&
          <Text style={styles.accommodations}>food : <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && kidFriendlyDrinks) &&
          <Text style={styles.accommodations}>drinks : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && !kidFriendlyDrinks) &&
          <Text style={styles.accommodations}>drinks : <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {(toddlerAllowed || youngKidsAllowed || teensAllowed) && <Text style={styles.accommodationsHeaders}>Are there accommodations for kids?</Text>}

        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && kidSeating) &&
          <Text style={styles.accommodations}>kid seating : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && !kidSeating) &&
          <Text style={styles.accommodations}>kid seating : <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && strollerSpace) &&
          <Text style={styles.accommodations}>stroller space : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && !strollerSpace) &&
          <Text style={styles.accommodations}>stroller space : <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && changingStations) &&
          <Text style={styles.accommodations}>stroller space : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && !changingStations) &&
          <Text style={styles.accommodations}>changing stations : <Emoji name="x" style={{fontSize: 18}} /></Text>}


        {(toddlerAllowed || youngKidsAllowed || teensAllowed) && <Text style={styles.accommodationsHeaders}>Are there games for kids?</Text>}

        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && kidGamesInside) &&
          <Text style={styles.accommodations}>inside : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && !kidGamesInside) &&
          <Text style={styles.accommodations}>inside : <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && kidGamesOutdoor) &&
          <Text style={styles.accommodations}>outside : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {((toddlerAllowed || youngKidsAllowed || teensAllowed) && !kidGamesOutdoor) &&
          <Text style={styles.accommodations}>outside : <Emoji name="x" style={{fontSize: 18}} /></Text>}

    </ScrollView>
    );
};


const styles = StyleSheet.create({
    textStyleAddress: {
        fontSize: 25,
        paddingLeft: 10
    },
    textStylename: {
        fontSize: 40
    },
    spaceAtTop: {
        fontSize: 10
    },
    accommodationsHeaders: {
      fontSize: 22,
      paddingTop: 12,
      paddingLeft: 10
    },
    accommodations: {
      fontSize: 18,
      paddingLeft: 25
    },
    rating: {
        alignContent: 'flex-start',

    }
});

export default BreweryDetailsScreen;
