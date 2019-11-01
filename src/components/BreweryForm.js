import React, {useState, useContext} from 'react';
import {Context as BreweryContext} from '../context/BreweryContext';

import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ButtonGroup } from 'react-native-elements';
import Checkbox from 'react-native-check-box';
import WelcomeButton from '../components/WelcomeButton'
import {validateEmail, validatePhoneNumber, validateBreweryName, validateAddress, validateURL} from '../api/InputValidation';
import Modal from 'react-native-modal'
import Dialog, {DialogContent} from 'react-native-popup-dialog';

const BreweryForm = ({isNew, navigation}) => {
    const getOpenHrsFromStr = (hoursString) => {
        var openHours = hoursString.substring(0,hoursString.indexOf(' '));
        var numIndex = 0;
        if (openHours.length <= 3) {
            while (numIndex < openHours.length && (openHours.charAt(numIndex) == ':' || (openHours.charAt(numIndex) >= '0' && openHours.charAt(numIndex) <= '9'))) {
                numIndex += 1;
            }
            openHours = openHours.substring(0, numIndex) + ':00' + openHours.substring(numIndex);
        }
        
        return openHours;
    }
    const getCloseHrsFromStr = (hoursString) => {
        var closeHours = hoursString.substring(hoursString.indexOf('- ') + 2);
        var numIndex = 0;
        if (closeHours.length <= 3) {
            while (numIndex < closeHours.length && (closeHours.charAt(numIndex) == ':' || (closeHours.charAt(numIndex) >= '0' && closeHours.charAt(numIndex) <= '9'))) {
                numIndex += 1;
            }
            closeHours = closeHours.substring(0, numIndex) + ':00' + closeHours.substring(numIndex);
        }
        return closeHours
    }
    
    /*
     * Splits hours received from backend into a usable form so we can plug them
     * into the time items.
     * 
     * @param hoursMap -> the hours received from the backend
     * @return a new map object containing the split open and close hours
    */
    const convertHoursFromString = (hoursMap) => {
        var hoursObj = new Object();
        hoursObj['monOpen'] = getOpenHrsFromStr(hoursMap.mon);
        hoursObj['monClose'] = getCloseHrsFromStr(hoursMap.mon);

        hoursObj['tueOpen'] = getOpenHrsFromStr(hoursMap.tue);
        hoursObj['tueClose'] = getCloseHrsFromStr(hoursMap.tue);

        hoursObj['wedOpen'] = getOpenHrsFromStr(hoursMap.wed);
        hoursObj['wedClose'] = getCloseHrsFromStr(hoursMap.wed);

        hoursObj['thuOpen'] = getOpenHrsFromStr(hoursMap.thu);
        hoursObj['thuClose'] = getCloseHrsFromStr(hoursMap.thu);

        hoursObj['friOpen'] = getOpenHrsFromStr(hoursMap.fri);
        hoursObj['friClose'] = getCloseHrsFromStr(hoursMap.fri);

        hoursObj['satOpen'] = getOpenHrsFromStr(hoursMap.sat);
        hoursObj['satClose'] = getCloseHrsFromStr(hoursMap.sat);

        hoursObj['sunOpen'] = getOpenHrsFromStr(hoursMap.sun);
        hoursObj['sunClose'] = getCloseHrsFromStr(hoursMap.sun);

        return hoursObj;
    }

    const fillAccommodationsFromBackend = (map) => {
       
        var accommodationsMap = new Object();
        
        accommodationsMap['petFriendly'] = new Object();
        accommodationsMap['petFriendly']['indoorSpaces'] = (map.petFriendly) ? 
                                                           (map.petFriendly.indoorSpaces) ? true : false : false;
        accommodationsMap['petFriendly']['outdoorSpaces'] = (map.petFriendly) ? 
                                                            (map.petFriendly.outdoorSpaces) ? true : false : false;
        accommodationsMap['petFriendly']['waterStations'] = (map.petFriendly) ?
                                                            (map.petFriendly.waterStations) ? true : false : false;

        accommodationsMap['friendlyKidAges'] = new Object();
        accommodationsMap['friendlyKidAges']['toddlers'] = (map.friendlyKidAges) ? 
                                                           (map.friendlyKidAges.toddlers) ? true : false : false;
        accommodationsMap['friendlyKidAges']['youngKids'] = (map.friendlyKidAges) ? 
                                                            (map.friendlyKidAges.youngKids) ? true : false : false;
        accommodationsMap['friendlyKidAges']['teens'] = (map.friendlyKidAges) ? 
                                                        (map.friendlyKidAges.teens) ? true : false : false;
        
        accommodationsMap['kidFoodDrinks'] = new Object();
        accommodationsMap['kidFoodDrinks']['kidFriendlyFood'] = (map.kidFoodDrinks) ?
                                                                (map.kidFoodDrinks.kidFriendlyDrinks) ? true : false : false;
        accommodationsMap['kidFoodDrinks']['kidFriendlyDrinks'] = (map.kidFoodDrinks) ? 
                                                                  (map.kidFoodDrinks.kidFriendlyDrinks) ? true : false : false;
        accommodationsMap['changingStations'] = (map.changingStations) ? true : false;
        
        accommodationsMap['childAccommodations'] = new Object();
        accommodationsMap['childAccommodations']['games'] = new Object();
        accommodationsMap['childAccommodations']['games']['indoor'] = (map.childAccommodations) ?
                                                                      (map.childAccommodations.games) ?
                                                                      (map.childAccommodations.games.indoor) ? true : false : false : false;

        accommodationsMap['childAccommodations']['games']['outdoor'] = (map.childAccommodations) ?
                                                                      (map.childAccommodations.games) ?
                                                                      (map.childAccommodations.games.outdoor) ? true : false : false : false;

        accommodationsMap['childAccommodations']['seating'] = (map.childAccommodations) ?
                                                              (map.childAccommodations.seating) ? true : false : false;
        accommodationsMap['childAccommodations']['strollerSpace']  = (map.childAccommodations) ? 
                                                                     (map.childAccommodations.strollerSpace) ? true : false : false;

        return accommodationsMap;
    }

    const {state, createBrewery, updateBrewery, getOwnedBreweries} = useContext(BreweryContext);
    
    const brewery = (state['individualResult'] != null) ? state['individualResult'][0].brewery : null;

    var initHours;
    var initKidHours;
    var accommodations;
    if (brewery) {
        initHours = convertHoursFromString(brewery.businessHours);
        initKidHours = convertHoursFromString(brewery.alternativeKidFriendlyHours);
        accommodations = fillAccommodationsFromBackend(brewery.accommodations);
    }

    const [dialogOpen, setDialogOpen] = useState(false);
    const [breweryName, setBreweryName] = (brewery) ? useState(brewery.name) : useState('');
    const [street, setStreet] = (brewery) ? useState(brewery.address.street) : useState('');
    const [city, setCity] = (brewery) ? useState(brewery.address.city) : useState('');
    const [breweryState, setState] = (brewery) ? useState(brewery.address.state) : useState('');
    const [zipCode, setZipCode] = (brewery) ? useState(brewery.address.zipCode) : useState('');
    const [price, setPrice] = (brewery) ? useState(brewery.price) : useState(0);
    const [email, setEmail] = (brewery) ? useState(brewery.email) : useState(0);
    const [website, setWebsite] = (brewery) ? useState(brewery.website) : useState('');
    const priceButtons = [ '$', '$$', '$$$' , '$$$$']
    const [phoneNumber, setPhoneNumber] = (brewery) ? useState(brewery.phoneNumber) : useState('');
    const [dayPicked, setDayPicked] = useState('');
    const [kidHoursSame, setKidHoursSame] = (brewery) ? useState(brewery.kidHoursSameAsNormal) : useState(false);

    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [addressErrorMsg, setAddressErrorMsg] = useState('');
    const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
    const [emailErrorMsg, setEmailErrorMsg]= useState('');
    const [websiteErrorMsg, setWebsiteErrorMsg] = useState('');


    const [timePickerVisible, setTimePickerVisible] = useState(false);

    const [mondayOpenTime, setMondayOpenTime] = (brewery) ? useState(initHours['monOpen']) : useState('8AM');
    const [mondayCloseTime, setMondayCloseTime] = (brewery) ? useState(initHours['monClose']) : useState('8PM');
    const [tuesdayOpenTime, setTuesdayOpenTime] = (brewery) ? useState(initHours['tueOpen']) : useState('8AM');
    const [tuesdayCloseTime, setTuesdayCloseTime] = (brewery) ? useState(initHours['tueClose']) : useState('8PM');
    const [wednesdayOpenTime, setWednesdayOpenTime] = (brewery) ? useState(initHours['wedOpen']) : useState('8AM');
    const [wednesdayCloseTime, setWednesdayCloseTime] = (brewery) ? useState(initHours['wedClose']) : useState('8PM');
    const [thursdayOpenTime, setThursdayOpenTime] = (brewery) ? useState(initHours['thuOpen']) : useState('8AM');
    const [thursdayCloseTime, setThursdayCloseTime] = (brewery) ? useState(initHours['thuClose']) : useState('8PM');
    const [fridayOpenTime, setFridayOpenTime] = (brewery) ? useState(initHours['friOpen']) : useState('8AM');
    const [fridayCloseTime, setFridayCloseTime] = (brewery) ? useState(initHours['friClose']) : useState('8PM');
    const [saturdayOpenTime, setSaturdayOpenTime] = (brewery) ? useState(initHours['satOpen']) : useState('8AM');
    const [saturdayCloseTime, setSaturdayCloseTime] = (brewery) ? useState(initHours['satClose']) : useState('8PM');
    const [sundayOpenTime, setSundayOpenTime] = (brewery) ? useState(initHours['sunOpen']) : useState('8AM');
    const [sundayCloseTime, setSundayCloseTime] = (brewery) ? useState(initHours['sunClose']) : useState('8PM');

    const [mondayKidOpenTime, setMondayKidOpenTime] = (brewery) ? useState(initHours['monOpen']) : useState('8AM');
    const [mondayKidCloseTime, setMondayKidCloseTime] = (brewery) ? useState(initHours['monClose']) : useState('8PM');
    const [tuesdayKidOpenTime, setTuesdayKidOpenTime] = (brewery) ? useState(initHours['tueOpen']) : useState('8AM');
    const [tuesdayKidCloseTime, setTuesdayKidCloseTime] = (brewery) ? useState(initHours['tueClose']) : useState('8PM');
    const [wednesdayKidOpenTime, setWednesdayKidOpenTime] = (brewery) ? useState(initHours['wedOpen']) : useState('8AM');
    const [wednesdayKidCloseTime, setWednesdayKidCloseTime] = (brewery) ? useState(initHours['wedClose']) : useState('8PM');
    const [thursdayKidOpenTime, setThursdayKidOpenTime] = (brewery) ? useState(initHours['thuOpen']) : useState('8AM');
    const [thursdayKidCloseTime, setThursdayKidCloseTime] = (brewery) ? useState(initHours['thuClose']) : useState('8PM');
    const [fridayKidOpenTime, setFridayKidOpenTime] = (brewery) ? useState(initHours['friOpen']) : useState('8AM');
    const [fridayKidCloseTime, setFridayKidCloseTime] = (brewery) ? useState(initHours['friClose']) : useState('8PM');
    const [saturdayKidOpenTime, setSaturdayKidOpenTime] = (brewery) ? useState(initHours['satOpen']) : useState('8AM');
    const [saturdayKidCloseTime, setSaturdayKidCloseTime] = (brewery) ? useState(initHours['satClose']) : useState('8PM');
    const [sundayKidOpenTime, setSundayKidOpenTime] = (brewery) ? useState(initHours['sunOpen']) : useState('8AM');
    const [sundayKidCloseTime, setSundayKidCloseTime] = (brewery) ? useState(initHours['sunClose']) : useState('8PM');

    const [waterStations, setWaterStations] = (brewery) ? useState(accommodations['petFriendly']['waterStations']) : useState(false);
    const [indoorSpaces, setIndoorSpaces] = (brewery) ? useState(accommodations['petFriendly']['indoorSpaces']) : useState(false);
    const [outdoorSpaces, setOutdoorSpaces] = (brewery) ? useState(accommodations['petFriendly']['outdoorSpaces']) : useState(false);
    const [toddlers, setToddlers] = (brewery) ? useState(accommodations['friendlyKidAges']['toddlers']) : useState(false);
    const [youngKids, setYoungKids] = (brewery) ? useState(accommodations['friendlyKidAges']['youngKids']) : useState(false);
    const [teens, setTeens] = (brewery) ? useState(accommodations['friendlyKidAges']['teens']) : useState(false);
    const [kidFriendlyFood, setKidFriendlyFood] = (brewery) ? useState(accommodations['kidFoodDrinks']['kidFriendlyFood']) : useState(false);
    const [kidFriendlyDrinks, setKidFriendlyDrinks] = (brewery) ? useState(accommodations['kidFoodDrinks']['kidFriendlyDrinks']) : useState(false);
    const [changingStations, setChangingStations] = (brewery) ? useState(accommodations['changingStations']) : useState(false);
    const [indoorGames, setIndoorGames] = (brewery) ? useState(accommodations['childAccommodations']['games']['indoor']) : useState(false);
    const [outdoorGames, setOutdoorGames] = (brewery) ? useState(accommodations['childAccommodations']['games']['outdoor']) : useState(false);
    const [childSeating, setChildSeating] = (brewery) ? useState(accommodations['childAccommodations']['seating']) : useState(false);
    const [strollerSpace, setStrollerSpace] = (brewery) ? useState(accommodations['childAccommodations']['strollerSpace']) : useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const [showTimes, setShowTimes] = useState(false);
    const [showKidTimes, setShowKidTimes] = useState(false);

    /*
     * Takes time given and formats it to conform to backend string restrictions
     * 
     * @param time -> time string given from time picker component
     * @return a formatted time string
    */
    const formatTime = (time) => {
        time = time.toString();
        var colonIndex = time.indexOf(':');
        var formatTime = time.substring(colonIndex-2, colonIndex);
        var hours = parseInt(formatTime);
        var minutes = time.substring(colonIndex+1, colonIndex +3);
        if (12 <= hours && hours <= 23) {

            if (hours > 12){
                formatTime = (hours % 12)
            } else {
                formatTime = hours
            }
            formatTime += ":" + minutes + "PM"
        } else {
            if (hours == 0) {
                formatTime = 12;
            } else {
                formatTime = hours;
            }
            formatTime += ":" + minutes + "AM"
        }
        return formatTime;
    }

    const handleTimePicked = (time)=> {
        time = formatTime(time);
        switch(dayPicked) {
            case 'mondayOpen':
                setMondayOpenTime(time);
                break;
            case 'mondayClose':
                setMondayCloseTime(time);
                break;
            case 'tuesdayOpen':
                setTuesdayOpenTime(time);
                break;
            case 'tuesdayClose':
                setTuesdayCloseTime(time);
                break;
            case 'wednesdayOpen':
                setWednesdayOpenTime(time);
                break;
            case 'wednesdayClose':
                setWednesdayCloseTime(time);
                break;
            case 'thursdayOpen':
                setThursdayOpenTime(time);
                break;
            case 'thursdayClose':
                setThursdayCloseTime(time);
                break;
            case 'fridayOpen':
                setFridayOpenTime(time);
                break;
            case 'fridayClose':
                setFridayCloseTime(time);
                break;
            case 'saturdayOpen':
                setSaturdayOpenTime(time);
                break;
            case 'saturdayClose':
                setSaturdayCloseTime(time);
                break;
            case 'sundayOpen':
                setSundayOpenTime(time);
                break;
            case 'sundayClose':
                setSundayCloseTime(time);
                break;

            case 'mondayKidOpen':
                setMondayKidOpenTime(time);
                break;
            case 'mondayKidClose':
                setMondayKidCloseTime(time);
                break;
            case 'tuesdayKidOpen':
                setTuesdayKidOpenTime(time);
                break;
            case 'tuesdayKidClose':
                setTuesdayKidCloseTime(time);
                break;
            case 'wednesdayKidOpen':
                setWednesdayKidOpenTime(time);
                break;
            case 'wednesdayKidClose':
                setWednesdayKidCloseTime(time);
                break;
            case 'thursdayKidOpen':
                setThursdayKidOpenTime(time);
                break;
            case 'thursdayKidClose':
                setThursdayKidCloseTime(time);
                break;
            case 'fridayKidOpen':
                setFridayKidOpenTime(time);
                break;
            case 'fridayKidClose':
                setFridayKidCloseTime(time);
                break;
            case 'saturdayKidOpen':
                setSaturdayKidOpenTime(time);
                break;
            case 'saturdayKidClose':
                setSaturdayKidCloseTime(time);
                break;
            case 'sundayKidOpen':
                setSundayKidOpenTime(time);
                break;
            case 'sundayKidClose':
                setSundayKidCloseTime(time);
                break;
            case 'mondayKidOpen':
                setMondayKidOpenTime(time);
                break;
            case 'mondayKidClose':
                setMondayKidCloseTime(time);
                break;
            case 'tuesdayKidOpen':
                setTuesdayKidOpenTime(time);
                break;
            case 'tuesdayKidClose':
                setTuesdayKidCloseTime(time);
                break;
            case 'wednesdayKidOpen':
                setWednesdayKidOpenTime(time);
                break;
            case 'wednesdayKidClose':
                setWednesdayKidCloseTime(time);
                break;
            case 'thursdayKidOpen':
                setThursdayKidOpenTime(time);
                break;
            case 'thursdayKidClose':
                setThursdayKidCloseTime(time);
                break;
            case 'fridayKidOpen':
                setFridayKidCloseTime(time);
                break;
            case 'fridayKidClose':
                setFridayKidCloseTime(time);
                break;
            case 'saturdayKidOpen':
                setSaturdayKidOpenTime(time);
                break;
            case 'saturdayKidClose':
                setSaturdayKidCloseTime(time);
                break;
            case 'sundayKidOpen':
                setSundayKidOpenTime(time);
                break;
            case 'sundayKidClose':
                setSundayKidCloseTime(time);
                break;
            default:
                setDayPicked('');
        }
    }


    const formatAddress = () => {
        var address = new Object();
        if (street == '' || city == '' || breweryState == '' || zipCode == '') {
            setAddressErrorMsg("Must provide all address information.")
        } else {
            setAddressErrorMsg();
        }
        address['street'] = street;
        address['city'] = city;
        address['state'] = breweryState;
        address['zipCode'] = zipCode;

        return address;
    }


    const formatBusinessHours = () => {
        var mon = mondayOpenTime + " - " + mondayCloseTime;
        var tue = tuesdayOpenTime + ' - ' + tuesdayCloseTime;
        var wed = wednesdayOpenTime + ' - ' + wednesdayCloseTime;
        var thu = thursdayOpenTime + ' - ' + thursdayCloseTime;
        var fri = fridayOpenTime + ' - ' + fridayCloseTime;
        var sat = saturdayOpenTime + ' - ' + saturdayCloseTime;
        var sun = sundayOpenTime + ' - ' + sundayCloseTime;
        var businessHours = new Object();
        businessHours['mon'] = mon;
        businessHours['tue'] = tue;
        businessHours['wed'] = wed;
        businessHours['thu'] = thu;
        businessHours['fri'] = fri;
        businessHours['sat'] = sat;
        businessHours['sun'] = sun;
        return businessHours;
    }

    const formatKidsHours = () => {

        var mon = mondayKidOpenTime + " - " + mondayKidCloseTime;
        var tue = tuesdayKidOpenTime + ' - ' + tuesdayKidCloseTime;
        var wed = wednesdayKidOpenTime + ' - ' + wednesdayKidCloseTime;
        var thu = thursdayKidOpenTime + ' - ' + thursdayKidCloseTime;
        var fri = fridayKidOpenTime + ' - ' + fridayKidCloseTime;
        var sat = saturdayKidOpenTime + ' - ' + saturdayKidCloseTime;
        var sun = sundayKidOpenTime + ' - ' + sundayKidCloseTime;
        var businessHours = new Object();
        businessHours['mon'] = mon;
        businessHours['tue'] = tue;
        businessHours['wed'] = wed;
        businessHours['thu'] = thu;
        businessHours['fri'] = fri;
        businessHours['sat'] = sat;
        businessHours['sun'] = sun;
        return businessHours;
    }

    

    const buildAccommodationMap = () => {
        const accommodations = {
            petFriendly: {
                waterStations: waterStations,
                indoorSpaces: indoorSpaces,
                outdoorSpaces: outdoorSpaces
            },
            friendlyKidAges: {
                toddlers: toddlers,
                youngKids: youngKids,
                teens: teens
            },
            kidFoodDrinks: {
                kidFriendlyFood: kidFriendlyFood,
                kidFriendlyDrinks: kidFriendlyDrinks
            },
            changingStations: changingStations,
            childAccommodations: {
                games: {
                    indoor: indoorGames,
                    outdoor: outdoorGames
                },
                seating: childSeating,
                strollerSpace: strollerSpace
            }
        }
        return accommodations;
    }

    const clearErrorMsgs = () => {
        setAddressErrorMsg('');
        setEmailErrorMsg('');
        setPhoneErrorMsg('');
        setNameErrorMsg('');
        setWebsiteErrorMsg('');
    }

    renderModalContent = () => {
        return (
        <View>
            <Text>Brewery Updated Successfully!</Text>
        </View>
        );

    }

    return (
        <ScrollView>
            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Brewery Name:</Text>
                <TextInput style={styles.textInput}
                    value={breweryName}
                    onChangeText={(newName) => setBreweryName(newName)}
                    placeholder="Brewery Name"
                    autoCapitalize="words"
                />
                <Text style={styles.errorMsg}>{nameErrorMsg}</Text>
            </View>
            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Brewery Address:</Text>
                <TextInput style={styles.textInput}
                    value={street}
                    onChangeText={(newStreet) => setStreet(newStreet)}
                    placeholder="Street"
                    autoCapitalize="words"
                />
                <TextInput style={styles.textInput}
                    value={city}
                    onChangeText={(newCity) => setCity(newCity)}
                    placeholder="City"
                    autoCapitalize="words"
                />
                <TextInput style={styles.textInput}
                    value={breweryState}
                    onChangeText={(newState) => setState(newState)}
                    placeholder="State"
                    autoCapitalize="characters"
                    maxLength={2}
                />
                <TextInput style={styles.textInput}
                    value={zipCode}
                    onChangeText={(newZip) => setZipCode(newZip)}
                    placeholder="Zip Code"
                    maxLength={5}
                />
                <Text style={styles.errorMsg}>{addressErrorMsg}</Text>
            </View>

            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Relative Price:</Text>
                <ButtonGroup
                    onPress={(e) => {setPrice(e)}}
                    selectedIndex={price}
                    buttons={priceButtons}
                    containerStyle={{height: 100}}
                />
            </View>

            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Phone Number:</Text>
                <TextInput style={styles.textInput}
                    value={phoneNumber}
                    onChangeText={(newPhone) => setPhoneNumber(newPhone)}
                    placeholder="Phone Number"
                    keyboardType="number-pad"
                    maxLength={10}
                />
                <Text style={styles.errorMsg}>{phoneErrorMsg}</Text>
            </View>

            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Email:</Text>
                <TextInput style={styles.textInput}
                    value={email}
                    onChangeText={(newEmail) => setEmail(newEmail)}
                    placeholder="Email"
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text style={styles.errorMsg}>{emailErrorMsg}</Text>
            </View>

            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Website URL:</Text>
                <TextInput style={styles.textInput}
                    value={website}
                    onChangeText={(newWeb) => setWebsite(newWeb)}
                    placeholder="Website"
                    keyboardType='email-address'
                    autoCapitalize="none"
                />
                <Text style={styles.errorMsg}>{websiteErrorMsg}</Text>
            </View>



            <DateTimePicker
                mode="time"
                isVisible={timePickerVisible}
                onCancel={()=>setTimePickerVisible(!timePickerVisible)}
                onConfirm={(time)=>{
                    handleTimePicked(time);
                    setTimePickerVisible(!timePickerVisible);
                }}
                is24Hour={false}
                
            />
            { !showFilters &&
            <View style={styles.fieldView}>
                <TouchableOpacity onPress={() => setShowFilters(true)}>
                    <Text style={styles.timeTitle}>Edit Additional Accommodations</Text>
                </TouchableOpacity>
            </View>
            }

            { !showTimes &&
            <View>
            <View style={styles.fieldView}>
                <TouchableOpacity onPress={() => setShowTimes(true)}>
                    <Text style={styles.timeTitle}>Edit Operational Hours</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.fieldView}>
                <Text style={styles.timeTitle}> Kids Hours Same as Operational: </Text>
                <Switch
                    value={kidHoursSame}
                    onValueChange={()=>setKidHoursSame(!kidHoursSame)}
                />
            </View>
            </View>
            }
            { !kidHoursSame &&
                <View style={styles.fieldView}>
                    <TouchableOpacity onPress={() => setShowKidTimes(true)}>
                      <Text style={styles.timeTitle}>Edit Kid Friendly Hours</Text>
                    </TouchableOpacity>
                </View>
            }

            {/*
              * Show times segment will allow users to set the operational hours of their brewery
              * All options refer to the singular DateTimePicker component on screen
              */}
            { showTimes && 
            <View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Monday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('mondayOpen');
                    }}
                        style={{display:'inline-block'}}
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Monday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('mondayClose');
                    }}
                    >
                        <Text>{mondayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Tuesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('tuesdayOpen');
                    }}
                      
                    >
                        <Text>{tuesdayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Tuesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible);
                        setDayPicked('tuesdayClose');
                    }}>
                        <Text>{tuesdayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Wednesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('wednesdayOpen');
                    }}
                      
                    >
                        <Text>{wednesdayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Wednesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked("wednesdayClosed");
                    }}
                    >
                        <Text>{wednesdayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Thursday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('thursdayOpen');
                    }}
                        
                    >
                        <Text>{thursdayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Thursday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('thursdayClose');
                    }
                    }>
                        <Text>{thursdayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Friday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('fridayOpen');
                    }}
                      
                    >
                        <Text>{fridayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Friday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('fridayClose');
                    }}>
                        <Text>{fridayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Saturday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked("saturdayOpen")
                    }}
                        
                    >
                        <Text>{saturdayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Saturday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked("saturdayClose");
                    }}>
                        <Text>{saturdayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Sunday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('sundayOpen');
                    }}
                        
                    >
                        <Text>{sundayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Sunday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('sundayClose');
                    }}>
                        <Text>{sundayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
                <TouchableOpacity onPress={() => setShowTimes(false)}>
                    <Text style={styles.timeTitle}>Close Operational Hours</Text>
                </TouchableOpacity>
            </View>
        </View>
        }
        { showKidTimes && 
        <View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Monday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked("mondayKidOpen");
                    }}
                        style={{display:'inline-block'}}
                    >
                        <Text>{mondayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Monday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('mondayKidClosed');
                    }}>
                        <Text>{mondayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Tuesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('tuesdayKidOpen');
                    }}
                      
                    >
                        <Text>{tuesdayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Tuesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('tuesdayKidClose');
                    }}>
                        <Text>{tuesdayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Wednesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('wednesdayKidOpen');
                    }}
                      
                    >
                        <Text>{wednesdayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Wednesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('wednesdayKidClose');
                    }}>
                        <Text>{wednesdayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Thursday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible);
                        setDayPicked('thursdayKidOpen');
                    }}
                        
                    >
                        <Text>{thursdayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Thursday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('thursdayKidClose');
                    }}>
                        <Text>{thursdayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Friday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('fridayKidOpen');
                    }}
                      
                    >
                        <Text>{fridayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Friday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('fridayKidClose');
                    }}>
                        <Text>{fridayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Saturday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('saturdayKidOpen');
                    }}
                        
                    >
                        <Text>{saturdayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Saturday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('saturdayKidClose');
                    }}>
                        <Text>{saturdayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Sunday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('sundayKidOpen');
                    }}
                        
                    >
                        <Text>{sundayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Sunday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('sundayKidClose');
                    }}>
                        <Text>{sundayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
                <TouchableOpacity onPress={() => setShowKidTimes(false)}>
                    <Text style={styles.timeTitle}>Close Kid Friendly Hours</Text>
                </TouchableOpacity>
            </View>
        </View>
        }

        { showFilters && 
            <View style={styles.filtersContainer}>
            <View style={{marginTop: 10}}>
                <Text>Additional Filters: </Text>
                <Text>Pet Filters:</Text>
                <Checkbox
                    leftText={"Water Stations"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setWaterStations(!waterStations)}}
                    isChecked={waterStations}
                />
                <Checkbox
                    leftText={"Outdoor Pet Spaces"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setOutdoorSpaces(!outdoorSpaces)}}
                    isChecked={outdoorSpaces}
                />
                <Checkbox
                    leftText={"Indoor Pet Spaces"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setIndoorSpaces(!indoorSpaces)}}
                    isChecked={indoorSpaces}
                />
            </View>
            <View style={{ marginTop: 25}}>
                <Text>Kid Age Filters: </Text>
                <Checkbox
                    leftText={"Toddler (0-3yrs) Friendly"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setToddlers(!toddlers)}}
                    isChecked={toddlers}
                />
                <Checkbox
                    leftText={"Toddler (4-12yrs) Friendly"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setYoungKids(!youngKids)}}
                    isChecked={youngKids}
                />
                <Checkbox
                    leftText={"Teen (13-18yrs) Friendly"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setTeens(!teens)}}
                    isChecked={teens}
                />
            </View>
            <View style={{ marginTop: 25, }}>
                <Text>Child Accommodations: </Text>
                <Checkbox
                    leftText={"Child Menu Options"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setKidFriendlyFood(!kidFriendlyFood)}}
                    isChecked={kidFriendlyFood}
                />
                <Checkbox
                    leftText={"Child Drink Options"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setKidFriendlyDrinks(!kidFriendlyDrinks)}}
                    isChecked={kidFriendlyDrinks}
                />
                <Checkbox
                    leftText={"Changing Stations"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setChangingStations(!changingStations)}}
                    isChecked={changingStations}
                />
                <Checkbox
                    leftText={"Indoor Child Games"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setIndoorGames(!indoorGames)}}
                    isChecked={indoorGames}
                />
                <Checkbox
                    leftText={"Outdoor Child Games"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setOutdoorGames(!outdoorGames)}}
                    isChecked={outdoorGames}
                />
                <Checkbox
                    leftText={"Child Seats"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setChildSeating(!childSeating)}}
                    isChecked={childSeating}
                />
                <Checkbox
                    leftText={"Stroller Space"}
                    style={{padding:10, color:'#000000'}}
                    onClick={() => {setStrollerSpace(!strollerSpace)}}
                    isChecked={strollerSpace}
                />
            </View>
            <View style={styles.fieldView}>
                <TouchableOpacity onPress={() => setShowFilters(false)}>
                    <Text style={styles.timeTitle}>Close</Text>
                </TouchableOpacity>
            </View>
            </View>
            }
            <View style={styles.fieldView}>
                <WelcomeButton
                    title="Submit"
                    onPress={ async ()=> {
                        clearErrorMsgs();
                      
                        var name = breweryName;
                        var address = formatAddress();
                        var businessHours = formatBusinessHours();
                        var alternativeKidFriendlyHours = businessHours;
                        if (!kidHoursSame) {
                            alternativeKidFriendlyHours = formatKidsHours();
                        }
                        var accommodations = buildAccommodationMap();
                        
                        
                        if (!validateBreweryName(name)) {
                            setNameErrorMsg("Brewery Name cannot be empty.");
                            return;
                        } else if (!validateAddress(address)) {
                            setAddressErrorMsg('Must fill all address fields');
                            return;
                        } else if (!validatePhoneNumber) {
                            setPhoneErrorMsg("Must provide a valid phone number");
                            return;
                        } else if (!validateEmail(email)) {
                            setEmailErrorMsg("Must provide a valid email address");
                            return;
                        } else if (!validateURL(website)) {
                            setWebsiteErrorMsg("Must provide a valid website URL");
                            return;
                        } 
                        var breweryId = brewery._id;
                        var kidHoursSameAsNormal = kidHoursSame;
                        
                        var response;
                        if (isNew) {
                            console.log("isNew is true")
                            response =  await createBrewery({
                                name, address, price, phoneNumber, 
                                email, website, businessHours, kidHoursSameAsNormal, 
                                alternativeKidFriendlyHours, accommodations
                            });
                           
                        } else {
                            response = await updateBrewery({
                                breweryId,
                                name, address, price, phoneNumber, 
                                email, website, businessHours, kidHoursSameAsNormal, 
                                alternativeKidFriendlyHours, accommodations
                            });
                            getOwnedBreweries();
                        }
                        if (response.status == 200) {
                            setDialogOpen(true);
                        }
   
                    }}
                />
            </View>

            <Dialog
                visible={dialogOpen}
            >
                <DialogContent>
                    <View>
                        { isNew && 
                        <View style={styles.dialogTitle}>
                            <Text>Brewery Created Successfully</Text> 
                        </View>
                        }
                        { !isNew &&
                        <View style={styles.dialogTitle}>
                            <Text>Brewery Updated Successfully</Text>
                        </View>
                        }
                    </View>
                    <View>
                        <WelcomeButton
                            title="Back"
                            onPress={() => {
                                setDialogOpen(false);
                                navigation.navigate('More');
                            }}
                        />
                    </View>
                </DialogContent>
                
            </Dialog>

            <View style={styles.fieldView}>
                <WelcomeButton
                    title="Cancel"
                    onPress={() => navigation.navigate("More")}
                />
            </View>            
        </ScrollView>
    );
}
//8:00AM or 8:00PM

const styles = StyleSheet.create({
    fieldView: {
        margin: 5,
        padding:5,
        alignItems:'flex-start',
        flexDirection:'column'
    },
    fieldTitle: {
        color: 'black',
        marginLeft:5,
        marginBottom:5,
        fontWeight:"bold",
        fontSize:20,
    },
    textInput: {
        marginLeft:5,
        marginBottom:5,
        backgroundColor:'white',
        height:25,
        width:200,
        borderRadius:5,
    },
    timeTitle: {
        marginLeft:4,
        color: 'black',
        marginBottom:5,
        fontSize:15,
        fontWeight:'bold',
    },
    filtersContainer: {
        flexDirection:'column',
        backgroundColor: 'white',
        margin:5,
        padding:5,
        borderRadius:5
    },
    timeContainers: {
        backgroundColor: 'white',
        margin:5,
        padding:5,
        borderRadius:5,
        borderColor: 'black',
        borderWidth:2,
        flexDirection:'column',
        flex:1
    },
    contentContainer: {
        margin:5,
        padding:5,
    },
    errorMsg: {
        color:'red',
        fontSize:15
    },
    dialogTitle: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: '25'
    }
});

export default BreweryForm;