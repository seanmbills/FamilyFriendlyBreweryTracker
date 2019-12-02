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
import {Context as AuthContext} from '../context/AuthContext'
import {Context as BreweryContext} from '../context/BreweryContext'
import {Context as ReviewContext} from '../context/ReviewContext'
import {Rating} from 'react-native-ratings'
import Emoji from 'react-native-emoji'


const BreweryDetailsScreen = ({navigation}) => {
    const breweryId = navigation.getParam('id')
    var {state, getBrewery} = useContext(BreweryContext)
    var {getBreweryReviews} = useContext(ReviewContext);
    var authContext = useContext(AuthContext)

    const breweryResult = state.individualResult[0].brewery
    const openNow = state.individualResult[0].openNow
    const kidFriendlyNow = state.individualResult[0].kidFriendlyNow
    const signedUrl1 = state.individualResult[0].signedUrl1
    const signedUrl2 = state.individualResult[0].signedUrl2
    const signedUrl3 = state.individualResult[0].signedUrl3

    const data = []
    if (signedUrl1 !== null && signedUrl1 !== ''){
        data.push(signedUrl1)
    }
    if (signedUrl2 !== null && signedUrl2 !== ''){
        data.push(signedUrl2)
    }
    if (signedUrl3 !== null && signedUrl3 !== ''){
        data.push(signedUrl3)
    }

    //console.log(data)

    var priceStr = ""
    var priceStr2 = ""
    for (var x = 0; x < breweryResult.price; x++) {
        priceStr += "$"
    }
    for (var x = 0; x < 4 - breweryResult.price; x++) {
        priceStr2 += "$"
    }

    const screenWidth = Math.round(Dimensions.get('window').width);
    const imageWidth = screenWidth * 11 / 12;
    const screenHeight = 50;
    var breweryFont = Math.sqrt((screenWidth - 32)*screenHeight/(breweryResult.name.length))
    breweryFont = Math.min(breweryFont, 35)

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
    var alternativeKidFriendlyHours = breweryResult.alternativeKidFriendlyHours
    var kidsAllowed = false
    if (breweryResult.accommodations != undefined && breweryResult.accommodations.friendlyKidAges != undefined) {
      kidsAllowed = true
    }

    if (breweryResult.dwdiwerfgiwe == undefined) {
      console.log('WHY ISNT THIS WORKING?!!!!!');
    }

    console.log(breweryResult);

    var accommodations = false
    if (breweryResult.accommodations != undefined) {
      accommodations = true
    }
    var petFriendly = false
    if (accommodations && breweryResult.accommodations.petFriendly != undefined) {
      petFriendly = true
    }
    var waterStations = false
    if (accommodations && petFriendly && breweryResult.accommodations.petFriendly.waterStations != undefined) {
        waterStations = true
    }
    var indoorSpaces = false
    if (accommodations && petFriendly && breweryResult.accommodations.petFriendly.indoorSpaces != undefined) {
        indoorSpaces = true
    }
    var outdoorSpaces = false
    if (accommodations && petFriendly && breweryResult.accommodations.petFriendly.outdoorSpaces != undefined) {
        outdoorSpaces = true
    }
    var friendlyKidAges = false
    if (accommodations && breweryResult.accommodations.friendlyKidAges != undefined) {
        friendlyKidAges = true
    }
    var toddlers = false
    if (accommodations && friendlyKidAges && breweryResult.accommodations.friendlyKidAges.toddlers != undefined) {
        toddlers = true
    }
    var youngKids = false
    if (accommodations && friendlyKidAges && breweryResult.accommodations.friendlyKidAges.youngKids != undefined) {
        youngKids = true
    }
    var teens = false
    if (accommodations && friendlyKidAges && breweryResult.accommodations.friendlyKidAges.teens != undefined) {
        teens = true
    }
    var kidFoodDrinks = false
    if (accommodations && breweryResult.accommodations.kidFoodDrinks != undefined) {
        kidFoodDrinks = true
    }
    var kidFriendlyFood = false
    if (accommodations && kidFoodDrinks && breweryResult.accommodations.kidFoodDrinks.kidFriendlyFood != undefined) {
        kidFriendlyFood = true
    }
    var kidFriendlyDrinks = false
    if (accommodations && kidFoodDrinks && breweryResult.accommodations.kidFoodDrinks.kidFriendlyDrinks != undefined) {
        kidFriendlyDrinks = true
    }
    var childAccommodations = false
    if (accommodations && breweryResult.accommodations.childAccommodations != undefined) {
        childAccommodations = true
    }
    var games = false
    if (accommodations && childAccommodations && breweryResult.accommodations.childAccommodations.games != undefined) {
        games = true
    }
    var indoor = false
    if (accommodations && childAccommodations && games && breweryResult.accommodations.childAccommodations.games.indoor != undefined) {
        indoor = true
    }
    var outdoor = false
    if (accommodations && childAccommodations && games && breweryResult.accommodations.childAccommodations.games.outdoor != undefined) {
        outdoor = true
    }
    var seating = false
    if (accommodations && childAccommodations && breweryResult.accommodations.childAccommodations.seating != undefined) {
        seating = true
    }
    var strollerSpace = false
    if (accommodations && childAccommodations && breweryResult.accommodations.childAccommodations.strollerSpace != undefined) {
        strollerSpace = true
    }
    var changingStations = false
    if (accommodations && breweryResult.accommodations.changingStations != undefined) {
        changingStations = true
    }



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
        <TouchableOpacity onPress={async ()=> {
              var breweryId = breweryResult._id;
              var response = await getBreweryReviews({breweryId, token: authContext.state.token});
              //console.log("Brewery Reviews response", response)

              navigation.navigate("ReadReviews", {breweryId: breweryResult._id, name:breweryResult.name, breweryReviews: breweryResult.comments, breweryFontSize: breweryFont});
            }}>
          <Rating
              imageSize={20}
              readonly
              startingValue={parseFloat(breweryResult.ratings)}
              fractions={1}
          />

          <Text
              style={{textAlign: 'center', paddingTop: 5}}> {breweryResult.numReviews} reviews
          </Text>
        </TouchableOpacity>

        {
            (data.length > 0) &&
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <FlatList
                  horizontal
                  data={data}
                  renderItem={({item}) => {
                    return (
                      <Image source={{uri: item}} resizeMode='contain' style={{width:imageWidth, height:imageWidth}} />
                    )
                  }}
                  keyExtractor={item => item}
                  showsHorizontalScrollIndicator={false}
              />
            </View>
        }
        {
          data.length === 0 &&
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../assets/PhotosComingSoon.jpg')} resizeMode='contain' style={{width: imageWidth, height: imageWidth}} />
          </View>
        }

        {/*The first box*/}
        <View style={styles.boxInView}>
            {/*Displays the address*/}
            {breweryResult.address != undefined &&
            <Text style={styles.textAddress}><Emoji name="round_pushpin" style={{fontSize: 18}} />{breweryResult.address.street}, {breweryResult.address.city}
            , {breweryResult.address.state} {breweryResult.address.zipCode}</Text>}

            {/*Navigates the user to the maps (clickable)*/}
            {breweryResult.geoLocation != undefined &&
            <Text style={styles.textClickables} onPress={ ()=> Linking.openURL(url) } ><Emoji name="world_map" style={{fontSize: 18}} /> Get directions</Text>}

            {/*Displays the website (clickable)*/}
            {breweryResult.website != undefined &&
            <Text style={styles.textClickables} onPress={ ()=> Linking.openURL(breweryResult.website) } ><Emoji name="globe_with_meridians" style={{fontSize: 18}} /> View website</Text>}

            {/*Displays the phone number (clickable)*/}
            {breweryResult.address != undefined &&
            <Text style={styles.textClickables} onPress={this.dialCall}><Emoji name="telephone_receiver" style={{fontSize: 18}} /> {breweryResult.phoneNumber}</Text>}

            {/*Displays the email (clickable)*/}
            {breweryResult.email != undefined &&
            <Text style={styles.textClickables} onPress={() => Linking.openURL('mailto:'+ breweryResult.email) } ><Emoji name="email" style={{fontSize: 18}} /> {breweryResult.email}</Text>}

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
        {kidsAllowed &&
        <View style={styles.boxInView}>
            {/*Displays "Business Hours" and if it is open or closed*/}
            <Text style={styles.businessHoursHeader}>Kid Friendly Hours -
            {kidFriendlyNow && <Text style={{fontSize: 22, color: "green", paddingLeft: 10, paddingTop: 5}}> Open Now</Text>}
            {!kidFriendlyNow && <Text style={{fontSize: 22, color: "red", paddingLeft: 10, paddingTop: 5}}> Closed Now</Text>}
            </Text>

            {/*Displays the business hours per day*/}
            <Text style={styles.businessDays}>Sunday: {alternativeKidFriendlyHours.sun}</Text>
            <Text style={styles.businessDays}>Monday: {alternativeKidFriendlyHours.mon}</Text>
            <Text style={styles.businessDays}>Tuesday: {alternativeKidFriendlyHours.tue}</Text>
            <Text style={styles.businessDays}>Wednesday: {alternativeKidFriendlyHours.wed}</Text>
            <Text style={styles.businessDays}>Thursday: {alternativeKidFriendlyHours.thu}</Text>
            <Text style={styles.businessDays}>Friday: {alternativeKidFriendlyHours.fri}</Text>
            <Text style={styles.businessDays}>Saturday: {alternativeKidFriendlyHours.sat}</Text>
        </View>}

        {/*The fourth box*/}
        <View style={styles.boxInView}>
            {/*Displays pet accommodations*/}
            <Text style={styles.accommodationsHeaders}>Are pets allowed?</Text>

            {indoorSpaces && <Text style={styles.accommodations}> inside: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {!indoorSpaces && <Text style={styles.accommodations}> inside: <Emoji name="x" style={{fontSize: 18}} /></Text>}

            {outdoorSpaces && <Text style={styles.accommodations}> outside: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {!outdoorSpaces && <Text style={styles.accommodations}> outside: <Emoji name="x" style={{fontSize: 18}} /></Text>}

            {waterStations && <Text style={styles.accommodations}> water stations for pets: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {!waterStations && <Text style={styles.accommodations}> water stations for pets: <Emoji name="x" style={{fontSize: 18}} /></Text>}

            {/*Displays kid accommodations*/}
            <Text style={styles.accommodationsHeaders}>Are kids allowed?</Text>

            {toddlers && <Text style={styles.accommodations}> toddlers: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {!toddlers && <Text style={styles.accommodations}> toddlers: <Emoji name="x" style={{fontSize: 18}} /></Text>}

            {youngKids && <Text style={styles.accommodations}> young kids: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {!youngKids && <Text style={styles.accommodations}> young kids: <Emoji name="x" style={{fontSize: 18}} /></Text>}

            {teens && <Text style={styles.accommodations}> teens: <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {!teens && <Text style={styles.accommodations}> teens: <Emoji name="x" style={{fontSize: 18}} /></Text>}

            {kidsAllowed && <Text style={styles.accommodationsHeaders}>Are there kid friendly menu items?</Text>}

            {kidsAllowed && kidFriendlyFood && <Text style={styles.accommodations}>food : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {kidsAllowed && !kidFriendlyFood && <Text style={styles.accommodations}>food : <Emoji name="x" style={{fontSize: 18}} /></Text>}

            {kidsAllowed && kidFriendlyDrinks && <Text style={styles.accommodations}>drinks : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {kidsAllowed && !kidFriendlyDrinks && <Text style={styles.accommodations}>drinks : <Emoji name="x" style={{fontSize: 18}} /></Text>}

            {kidsAllowed && <Text style={styles.accommodationsHeaders}>Are there accommodations for kids?</Text>}

            {kidsAllowed && seating && <Text style={styles.accommodations}>kid seating : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {kidsAllowed && !seating && <Text style={styles.accommodations}>kid seating : <Emoji name="x" style={{fontSize: 18}} /></Text>}

            {kidsAllowed && strollerSpace && <Text style={styles.accommodations}>stroller space : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {kidsAllowed && !strollerSpace && <Text style={styles.accommodations}>stroller space : <Emoji name="x" style={{fontSize: 18}} /></Text>}

            {kidsAllowed && changingStations && <Text style={styles.accommodations}>stroller space : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {kidsAllowed && !changingStations && <Text style={styles.accommodations}>changing stations : <Emoji name="x" style={{fontSize: 18}} /></Text>}


            {kidsAllowed && <Text style={styles.accommodationsHeaders}>Are there games for kids?</Text>}

            {kidsAllowed && indoor && <Text style={styles.accommodations}>inside : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {kidsAllowed && !indoor && <Text style={styles.accommodations}>inside : <Emoji name="x" style={{fontSize: 18}} /></Text>}

            {kidsAllowed && outdoor && <Text style={styles.accommodations}>outside : <Emoji name="heavy_check_mark" style={{fontSize: 18}} /></Text>}
            {kidsAllowed && !outdoor && <Text style={styles.accommodations}>outside : <Emoji name="x" style={{fontSize: 18}} /></Text>}
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
