import React, {useState, useContext, useEffect} from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
  FlatList, 
  Image
} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'
import {Rating} from 'react-native-ratings'
import Emoji from 'react-native-emoji'


const BreweryDetailsScreen = ({navigation}) => {
    const breweryId = navigation.getParam('id')
    var {state, getBrewery} = useContext(BreweryContext)

    const breweryResult = state.individualResult[0].brewery
    const openNow = state.individualResult[0].openNow
    const kidFriendlyNow = state.individualResult[0].kidFriendlyNow
    const signedUrl1 = state.individualResult[0].signedUrl1
    const signedUrl2 = state.individualResult[0].signedUrl2
    const signedUrl3 = state.individualResult[0].signedUrl3

    const data = []
    if (signedUrl1 !== null && signedUrl1 !== ''){
        console.log(signedUrl1)
        data.push(signedUrl1)
    }
    if (signedUrl2 !== null && signedUrl2 !== ''){
        data.push(signedUrl2)
    }
    if (signedUrl3 !== null && signedUrl3 !== ''){
        data.push(signedUrl3)
    }

    console.log(data)

    var priceStr = ""
    var priceStr2 = ""
    for (var x = 0; x < breweryResult.price; x++) {
        priceStr += "$"
    }
    for (var x = 0; x < 4 - breweryResult.price; x++) {
        priceStr2 += "$"
    }

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

    const lat = breweryResult.geoLocation.coordinates[1]
    const lng = breweryResult.geoLocation.coordinates[0]

    const scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=';
    const latLng = `${lat},${lng}`;
    const label = breweryResult.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

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

    return (
    <ScrollView style={styles.scrollView}>

        {/*Displays the brewery name at the top of the screen*/}
        <Text
              style={{fontSize: breweryFont, textAlign: 'center', fontWeight: 'bold', marginTop: 25, paddingBottom: 5}}>{breweryResult.name}
        </Text>

        {/*Displays the price of the brewery*/}
        <Text style={{fontSize: 18, textAlign:"center", paddingBottom: 5}}>Price:
          <Text style={{color: 'rgba(0, 152, 0, 1)', fontWeight: 'bold'}}> {priceStr}</Text>
          <Text style={{color: 'rgba(0, 152, 0, .3)', fontWeight: 'bold'}}>{priceStr2}</Text>
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
              style={{textAlign: 'center', paddingTop: 5}}> {breweryResult.numReviews} reviews
          </Text>
        </TouchableOpacity>
        
        {
            (data.length > 0) && 
            <FlatList
                horizontal
                data={data}
                renderItem={({item}) => {
                  return (
                    <Image source={{uri: item}} style={{width:400, height:400}} />
                  )
                }}
                keyExtractor={item => item}
            />
        }
        {
          data.length === 0 &&
          <Image source={require('../../assets/PhotosComingSoon.jpg')} style={{width: 700, height: 500}} />
        }

        {/*The first box*/}
        <View style={styles.boxInView}>
            {/*Displays the address*/}
            <Text style={styles.textAddress}><Emoji name="round_pushpin" style={{fontSize: 18}} />{breweryResult.address.street}, {breweryResult.address.city}
            , {breweryResult.address.state} {breweryResult.address.zipCode}</Text>

            {/*Displays the website (clickable)*/}
            <Text style={styles.textClickables} onPress={ ()=> Linking.openURL(url) } ><Emoji name="world_map" style={{fontSize: 18}} /> Get directions</Text>

            {/*Displays the website (clickable)*/}
            <Text style={styles.textClickables} onPress={ ()=> Linking.openURL(breweryResult.website) } ><Emoji name="globe_with_meridians" style={{fontSize: 18}} /> View website</Text>

            {/*Displays the phone number (clickable)*/}
            <Text style={styles.textClickables} onPress={this.dialCall}><Emoji name="telephone_receiver" style={{fontSize: 18}} /> {breweryResult.phoneNumber}</Text>
        </View>

        {/*The second box*/}
        <View style={styles.boxInView}>
            {/*Displays "Business Hours" and if it is open or closed*/}
            <Text style={styles.businessHoursHeader}>Business Hours -
            {openNow && <Text style={{fontSize: 22, color: "green", paddingLeft: 10, paddingTop: 5}}> Open Now</Text>}
            {!openNow && <Text style={{fontSize: 22, color: "red", paddingLeft: 10, paddingTop: 5}}> Closed Now</Text>}
            </Text>

            {/*Displays the business hours per day*/}
            <Text style={styles.businessDays}>Sunday: {hours.sun}</Text>
            <Text style={styles.businessDays}>Monday: {hours.mon}</Text>
            <Text style={styles.businessDays}>Tuesday: {hours.tue}</Text>
            <Text style={styles.businessDays}>Wednesday: {hours.wed}</Text>
            <Text style={styles.businessDays}>Thursday: {hours.thu}</Text>
            <Text style={styles.businessDays}>Friday: {hours.fri}</Text>
            <Text style={styles.businessDays}>Saturday: {hours.sat}</Text>
        </View>

        {/*The third box*/}
        <View style={styles.boxInView}>
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
          </View>

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
    boxInView: {
      borderRadius: 10,
      borderStyle: 'dashed',
      borderWidth: 1,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      paddingTop: 5,
      paddingLeft: 5,
      paddingBottom: 10
    },
    textAddress: {
      fontSize:18,
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
    textClickables:{
      fontSize:18,
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
      color: "blue"
    },
    businessHoursHeader: {
      fontSize: 22,
      paddingTop: 5,
      paddingLeft: 10,
      marginBottom: 10
    },
    businessDays: {
      paddingLeft: 25,
      fontSize: 18
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
