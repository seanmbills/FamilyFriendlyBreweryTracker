import React, {useState, useContext, useEffect} from 'react'
import {View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Linking, Platform} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'
import {Rating} from 'react-native-ratings'
import Emoji from 'react-native-emoji'


const BreweryDetailsScreen = ({navigation}) => {
    const breweryId = navigation.getParam('id')
    var {state, getBrewery} = useContext(BreweryContext)

    const breweryResult = state.individualResult[0].brewery
    const openNow = state.individualResult[0].openNow
    const kidFriendlyNow = state.individualResult[0].kidFriendlyNow
    console.log(breweryResult)
    console.log("Open now: " + openNow);
    console.log("kid friendly now: " + kidFriendlyNow);


    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = 50;
    var breweryFont = Math.sqrt((screenWidth - 32)*screenHeight/(breweryResult.name.length))
    breweryFont = Math.min(breweryFont, 35)
    var waterBowl = ' '
    if (!breweryResult.accommodations.petFriendly.waterStations) {
        waterBowl = ' not '
    }

    dialCall = () => {
      var phoneNumber = breweryResult.phoneNumber;
      if (Platform.OS === 'android') {
        phoneNumber = 'tel:${' + phoneNumber + '}';
      }
      else {
        phoneNumber = 'telprompt:${' + phoneNumber + '}';
      }
      Linking.openURL(phoneNumber);
  };

    const lat = 33.813714
    const lng = -84.444927

    // console.log(breweryResult);
    // console.log('please log!');

    // const lat = breweryResult.geoLocation.coordinates[1]
    // const lng = breweryResult.geoLocation.coordinates[0]


    const scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=';
    const latLng = `${lat},${lng}`;
    const label = breweryResult.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });


    // var hours = breweryResult.businessHours
    // var petsAllowedInside =  breweryResult.accommodations.petFriendly.indoorSpaces
    // var petsAllowedOutside = breweryResult.accommodations.petFriendly.outdoorSpaces
    // var toddlerAllowed = breweryResult.accommodations.friendlyKidAges.toddlers
    // var youngKidsAllowed = breweryResult.accommodations.friendlyKidAges.youngKids
    // var teensAllowed = breweryResult.accommodations.friendlyKidAges.teens
    // var kidFriendlyFood = breweryResult.accommodations.kidFoodDrinks.kidFriendlyFood
    // var kidFriendlyDrinks = breweryResult.accommodations.kidFoodDrinks.kidFriendlyDrinks
    // var kidGamesInside = breweryResult.accommodations.childAccommodations.games.indoor
    // var kidGamesOutdoor = breweryResult.accommodations.childAccommodations.games.outdoor
    // var kidSeating = breweryResult.accommodations.childAccommodations.seating
    // var strollerSpace = breweryResult.accommodations.childAccommodations.strollerSpace
    // var changingStations = breweryResult.accommodations.changingStations

    var hours = breweryResult.businessHours
    var petsAllowedInside =  breweryResult.accommodations.petFriendly.indoorSpaces
    var petsAllowedOutside = breweryResult.accommodations.petFriendly.outdoorSpaces
    var toddlerAllowed = breweryResult.accommodations.friendlyKidAges.toddlers
    var youngKidsAllowed = breweryResult.accommodations.friendlyKidAges.youngKids
    var teensAllowed = breweryResult.accommodations.friendlyKidAges.teens
    var kidFriendlyFood = breweryResult.accommodations.kidFoodDrinks.kidFriendlyFood
    var kidFriendlyDrinks = breweryResult.accommodations.kidFoodDrinks.kidFriendlyDrinks
    var kidGamesInside = breweryResult.accommodations.childAccommodations.games.indoor
    var kidGamesOutdoor = breweryResult.accommodations.childAccommodations.games.outdoor
    var kidSeating = breweryResult.accommodations.childAccommodations.seating
    var strollerSpace = breweryResult.accommodations.childAccommodations.strollerSpace
    var changingStations = breweryResult.accommodations.changingStations

    //console.log(breweryResult);
    console.log(hours);
    // console.log(petsAllowedInside);

    return (
    <ScrollView style={styles.scrollView}>

        {/*Displays the brewery name at the top of the screen*/}
        <Text
              style={{fontSize: breweryFont, textAlign: 'center', fontWeight: 'bold', marginTop: 25, paddingBottom: 15}}>{breweryResult.name}
        </Text>

        {/*Displays the number and rating of reviews (clickable)*/}
        <TouchableOpacity>
          <Rating
              imageSize={20}
              readonly
              startingValue={breweryResult.rating}
              fractions={1}
          />

          <Text
              style={{textAlign: 'center'}}> {breweryResult.numReviews} reviews
          </Text>
        </TouchableOpacity>

        {/*Displays the pictures*/}
        <Text style={{textAlign: 'center', paddingTop: 120, paddingBottom: 120}}> pics here
        </Text>

        {/*Displays the address      onPress={ ()=> Linking.openURL(url)*/}

        <Text style={styles.textStyleAddress} onPress={ ()=> Linking.openURL(url) }><Emoji name="round_pushpin" style={{fontSize: 18}} />{breweryResult.address.street}, {breweryResult.address.city}
        , {breweryResult.address.state} {breweryResult.address.zipCode}
        </Text>

        {/*Displays the website (clickable)*/}
        <Text style={styles.textWebsite} onPress={ ()=> Linking.openURL(breweryResult.website) } ><Emoji name="globe_with_meridians" style={{fontSize: 18}} />View this brewery's website</Text>

        {/*Displays the phone number (clickable)*/}
        <TouchableOpacity onPress={this.dialCall} style={styles.button} >

          <Text style={styles.textPhone}><Emoji name="telephone_receiver" style={{fontSize: 18}} />Call this location {breweryResult.phoneNumber}</Text>

        </TouchableOpacity>

        <Text style={styles.businessHoursHeader}>Business Hours</Text>
        <Text style={styles.businessHours}>Sunday: {hours.sun}{"\n"}
                                           Monday: {hours.mon}{"\n"}
                                           Tuesday: {hours.tue}{"\n"}
                                           Wednesday: {hours.wed}{"\n"}
                                           Thursday: {hours.thu}{"\n"}
                                           Friday: {hours.fri}{"\n"}
                                           Saturday: {hours.sat}</Text>


        {/*Displays pet accommodations*/}
        <Text style={styles.accommodationsHeaders}>Are pets allowed?</Text>

        {petsAllowedInside && <Text style={styles.accommodations}> inside: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {!petsAllowedInside && <Text style={styles.accommodations}> inside: <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {petsAllowedOutside && <Text style={styles.accommodations}> outside: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
        {!petsAllowedOutside && <Text style={styles.accommodations}> outside: <Emoji name="x" style={{fontSize: 18}} /></Text>}

        {(petsAllowedInside || petsAllowedOutside) && <Text style={styles.accommodations}> there are{waterBowl}water stations for pets</Text>}

        {/*Displays kid accommodations*/}
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
    spaceAtTop: {
        fontSize: 10
    },
    textStylename: {
        fontSize: 40
    },
    textStyleAddress: {
        fontSize: 18,
        paddingLeft: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10

    },
    textWebsite: {
      fontSize:18,
      paddingLeft: 10,
      paddingRight: 10,
      borderColor: 'gray',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 10,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10
    },
    textPhone: {
      fontSize:18,
      paddingLeft: 10,
      paddingRight: 10,
      borderColor: 'gray',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 10,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10
    },
    businessHoursHeader: {
      fontSize: 22,
      paddingTop: 12,
      paddingLeft: 10
    },
    businessHours: {
      fontSize: 18,
      paddingLeft: 25
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
