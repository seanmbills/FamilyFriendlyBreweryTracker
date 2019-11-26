import React, {useState, useContext, useEffect, Component} from 'react';
import {Context as BreweryContext} from '../context/BreweryContext';
import {Context as AuthContext} from '../context/AuthContext'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch, FlatList, Image} from 'react-native';
import {Input} from 'react-native-elements';

import DateTimePicker from 'react-native-modal-datetime-picker';
import { ButtonGroup } from 'react-native-elements';
import Checkbox from 'react-native-check-box';
import moment from 'moment'

// Local Component imports
import WelcomeButton from '../components/WelcomeButton'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import {Feather } from '@expo/vector-icons'
import BufferPopup from '../components/BufferPopup';


import {validateEmail, validatePhoneNumber, validateBreweryName, validateAddress, validateURL} from '../api/InputValidation';

import Dialog, {DialogContent} from 'react-native-popup-dialog';
import { DrawerActions } from 'react-navigation-drawer';

const BreweryForm = ({isNew, navigation}) => {
    
    /*
     * Accepts a time string in format X:XXAM - X:XXPM and returns just the AM hour mark
     * this will be used to set the initial state for each open hour state object.
     * (assuming this component is being populated with data from the database)
     * 
     * @param hoursString - a string (from the database) representation of the open and close hours for a brewery on a
     *      particular day
     * @return A string containing just the open hours for the brewery
    */
    const getOpenHrsFromStr = (hoursString) => {
        var openHours = hoursString.substring(0,hoursString.indexOf(' '));
        if (openHours[0] === '0') openHours = openHours.substring(1)

        if (openHours.indexOf(":") === -1) {
            var amIndex = openHours.indexOf("M") - 1
            return openHours.substring(0, amIndex) + ":00" + openHours.substring(amIndex)
        } else {
            return openHours
        }
    }

    /*
     * Performs exact same funciton as getOpenHrsFromStr except in this case it is just the close hours for the brewery
     *
     * @param hoursString - a string (from the database) representation of the open and close hours for a brewery on a
     *      particular day
     * @return A string containing just the close hours for the brewery
    */
    const getCloseHrsFromStr = (hoursString) => {
        var openHours = hoursString.substring(hoursString.indexOf('- ') + 2);
        if (openHours[0] === '0') openHours = openHours.substring(1)

        if (openHours.indexOf(":") === -1) {
            var amIndex = openHours.indexOf("M") - 1
            return openHours.substring(0, amIndex) + ":00" + openHours.substring(amIndex)
        } else {
            return openHours
        }
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

    /*
     * This method accepts a javascript object containing the accommodations fields a brewery may choose to add to its
     * page. This function will then parse the object and create a javascript object which can be used to set the state
     * for all accommodations fields. This is needed, because the backend does not store accommodations fields which are
     * not set to true. 
     * 
     * @param map - a javascript object from the backend which contains accommodations the brewery has selected
     * @return - a javascript object which contains ALL accommodations fields, both those which are set and those which aren't
     */
    const fillAccommodationsFromBackend = (map) => {
        
        // If not given a map, or the map is null, create  a new blank object so all fields will get set to false
        console.log(map)
        if (!map || map === null || map === undefined) {
            map = new Map();
        }
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
    
    //Here were are checking if a brewery object has been supplied in the application context
    const brewery = (state['individualResult'] != null) ? state['individualResult'][0].brewery : null;

    var initHours;
    var initKidHours;
    var accommodations;

    // if the brewery exists, use the functions above to create business & kidfriendly hours objects and an accommodations object
    if (brewery) {
        initHours = convertHoursFromString(brewery.businessHours);
        initKidHours = convertHoursFromString(brewery.alternativeKidFriendlyHours);
        accommodations = fillAccommodationsFromBackend(brewery.accommodations);
    }

    const [dialogOpen, setDialogOpen] = useState(false);

    //The following are all state objects related to the fields on the form
    const [breweryName, setBreweryName] = (brewery) ? useState(brewery.name) : useState('');
    const [street, setStreet] = (brewery) ? useState(brewery.address.street) : useState('');
    const [city, setCity] = (brewery) ? useState(brewery.address.city) : useState('');
    const [breweryState, setState] = (brewery) ? useState(brewery.address.state) : useState('');
    const [zipCode, setZipCode] = (brewery) ? useState(brewery.address.zipCode) : useState('');
    const [price, setPrice] = (brewery) ? useState(brewery.price) : useState(0);
    const [email, setEmail] = (brewery) ? useState(brewery.email) : useState('');
    const [website, setWebsite] = (brewery) ? useState(brewery.website) : useState('');
    const priceButtons = [ '$', '$$', '$$$' , '$$$$']
    const [phoneNumber, setPhoneNumber] = (brewery) ? useState(brewery.phoneNumber) : useState('');
    const [dayPicked, setDayPicked] = useState('');
    const [kidHoursSame, setKidHoursSame] = (brewery) ? useState(brewery.kidHoursSameAsNormal) : useState(false);

    // State objects for business hours
    const [mondayOpenTime, setMondayOpenTime] = (brewery) ? useState(initHours['monOpen']) : useState('8:00AM');
    const [mondayCloseTime, setMondayCloseTime] = (brewery) ? useState(initHours['monClose']) : useState('8:00PM');
    const [tuesdayOpenTime, setTuesdayOpenTime] = (brewery) ? useState(initHours['tueOpen']) : useState('8:00AM');
    const [tuesdayCloseTime, setTuesdayCloseTime] = (brewery) ? useState(initHours['tueClose']) : useState('8:00PM');
    const [wednesdayOpenTime, setWednesdayOpenTime] = (brewery) ? useState(initHours['wedOpen']) : useState('8:00AM');
    const [wednesdayCloseTime, setWednesdayCloseTime] = (brewery) ? useState(initHours['wedClose']) : useState('8:00PM');
    const [thursdayOpenTime, setThursdayOpenTime] = (brewery) ? useState(initHours['thuOpen']) : useState('8:00AM');
    const [thursdayCloseTime, setThursdayCloseTime] = (brewery) ? useState(initHours['thuClose']) : useState('8:00PM');
    const [fridayOpenTime, setFridayOpenTime] = (brewery) ? useState(initHours['friOpen']) : useState('8:00AM');
    const [fridayCloseTime, setFridayCloseTime] = (brewery) ? useState(initHours['friClose']) : useState('8:00PM');
    const [saturdayOpenTime, setSaturdayOpenTime] = (brewery) ? useState(initHours['satOpen']) : useState('8:00AM');
    const [saturdayCloseTime, setSaturdayCloseTime] = (brewery) ? useState(initHours['satClose']) : useState('8:00PM');
    const [sundayOpenTime, setSundayOpenTime] = (brewery) ? useState(initHours['sunOpen']) : useState('8:00AM');
    const [sundayCloseTime, setSundayCloseTime] = (brewery) ? useState(initHours['sunClose']) : useState('8:00PM');

    // State objects for kidFriendlyHours
    const [mondayKidOpenTime, setMondayKidOpenTime] = (brewery) ? useState(initHours['monOpen']) : useState('8:00AM');
    const [mondayKidCloseTime, setMondayKidCloseTime] = (brewery) ? useState(initHours['monClose']) : useState('8:00PM');
    const [tuesdayKidOpenTime, setTuesdayKidOpenTime] = (brewery) ? useState(initHours['tueOpen']) : useState('8:00AM');
    const [tuesdayKidCloseTime, setTuesdayKidCloseTime] = (brewery) ? useState(initHours['tueClose']) : useState('8:00PM');
    const [wednesdayKidOpenTime, setWednesdayKidOpenTime] = (brewery) ? useState(initHours['wedOpen']) : useState('8:00AM');
    const [wednesdayKidCloseTime, setWednesdayKidCloseTime] = (brewery) ? useState(initHours['wedClose']) : useState('8:00PM');
    const [thursdayKidOpenTime, setThursdayKidOpenTime] = (brewery) ? useState(initHours['thuOpen']) : useState('8:00AM');
    const [thursdayKidCloseTime, setThursdayKidCloseTime] = (brewery) ? useState(initHours['thuClose']) : useState('8:00PM');
    const [fridayKidOpenTime, setFridayKidOpenTime] = (brewery) ? useState(initHours['friOpen']) : useState('8:00AM');
    const [fridayKidCloseTime, setFridayKidCloseTime] = (brewery) ? useState(initHours['friClose']) : useState('8:00PM');
    const [saturdayKidOpenTime, setSaturdayKidOpenTime] = (brewery) ? useState(initHours['satOpen']) : useState('8:00AM');
    const [saturdayKidCloseTime, setSaturdayKidCloseTime] = (brewery) ? useState(initHours['satClose']) : useState('8:00PM');
    const [sundayKidOpenTime, setSundayKidOpenTime] = (brewery) ? useState(initHours['sunOpen']) : useState('8:00AM');
    const [sundayKidCloseTime, setSundayKidCloseTime] = (brewery) ? useState(initHours['sunClose']) : useState('8:00PM');

    // State objects for accommodations
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

    const [selectedTime, setSelectedTime] = useState('')

    // The message the dialog popup contains (will say if creation/update was successful)
    const [dialogMessage, setDialogMessage] = useState('');

    const [showBufferPopup, setShowBufferPopup] = useState(false)
    const [bufferText, setBufferText] = useState('')

    const [showFilters, setShowFilters] = useState(false); // Show checklist for accommodations
    const [showTimes, setShowTimes] = useState(false); // Show options to edit business hours
    const [showKidTimes, setShowKidTimes] = useState(false); // Show options ot edit kidFriendlyHours

    // State objects for error messages (these are checked and set on the front end)
    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [addressErrorMsg, setAddressErrorMsg] = useState('');
    const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
    const [emailErrorMsg, setEmailErrorMsg]= useState('');
    const [websiteErrorMsg, setWebsiteErrorMsg] = useState('');
    const [timePickerVisible, setTimePickerVisible] = useState(false);


    const [breweryImage1, setBreweryImage1] = useState(null)
    const [breweryImage2, setBreweryImage2] = useState(null)
    const [breweryImage3, setBreweryImage3] = useState(null)
    const [imageCount, setImageCount] = useState(1)


    _listEmptyComponent = () => {
        return null
    }

    useEffect(() => {
        getPermissionAsync()
    }, [])
    
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async (breweryImageNumber, update) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            quality: 1.0
        });
        
        if (!result.cancelled) {
           
            if (breweryImageNumber === 1) {
                console.log('setting image 1')
                setBreweryImage1(result)
                if (update)
                    setImageCount((imageCount + 1) % 3)
                console.log('adding data to list')
                data.push(result)
                
            } else if (breweryImageNumber === 2)  {
                setBreweryImage2(result)
                if (update)
                    setImageCount((imageCount + 1) % 3)
                
            } else if (breweryImageNumber === 0) {
                setBreweryImage3(result)
                if (update)
                    setImageCount((imageCount + 1) % 3)
            }
        }
    };

    /*
     * Takes time given from the react-native-date-picker component and formats it to conform to backend string restrictions
     * This string is then sent to the backend
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

    /*
     * only one react-native-datetime-picker component has been implemented on this screen.  This switch statement
     * is used to identify which state object (relating to business or kidFriendly) hours needs to be set and then
     * sets those hours accoordingly. 
     * 
     * @param - time -> the time from the datetime-picker which will used to set time state
     */
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


    /*
     *  Takes the address fields from the brewery form and creates a singular javascript object with multiple properties
     * this is done so the address object correctly conforms to the format expected by the backend
     * 
     * @return - a singular javascript object conformed to the format expected by the backend
     */
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

    /*
     *  Upon submission of form, takes all businessHour state objects and creates a singular javascript object in a form
     *  which the backend will accept
     * 
     * @return a singular javascript object in a form which the backend will accept
     */
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

    /*
     *  Upon submission of form, takes all kidFriendlyHour state objects and creates a singular javascript object in a form
     *  which the backend will accept
     * 
     * @return a singular javascript object in a form which the backend will accept
     */
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

    
    /*
     *  Upon submission of form, takes all accommodations state objects and creates a singular javascript object in a form
     *  which the backend will accept
     * 
     * @return a singular javascript object in a form which the backend will accept
     */
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

    /*
     * Clears all (frontend) error messages from the brewery form
     */
    const clearErrorMsgs = () => {
        setAddressErrorMsg('');
        setEmailErrorMsg('');
        setPhoneErrorMsg('');
        setNameErrorMsg('');
        setWebsiteErrorMsg('');
    }


    return (
        <ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
                (breweryImage1 === null && 
                    state.individualResult !== null && state.individualResult[0].signedUrl1 !== '') &&
                <TouchableOpacity
                    onPress={
                        () => {
                            this._pickImage(1, false)
                        }
                    }
                >
                    <Image source={{uri: state.individualResult[0].signedUrl1}} style={{width:200, height:200}} />
                </TouchableOpacity>
            }
            {
                (breweryImage1 !== null) &&
                <TouchableOpacity
                    onPress={
                        () => {
                            this._pickImage(1, false)
                        }
                    }
                >
                    <Image source={{uri: breweryImage1.uri}} style={{width:200, height:200}} />
                </TouchableOpacity>
            }

            {
                (breweryImage2 === null && 
                    state.individualResult !== null && state.individualResult[0].signedUrl2 !== '') &&
                <TouchableOpacity
                    onPress={
                        () => {
                            this._pickImage(2, false)
                        }
                    }
                >
                    <Image source={{uri: state.individualResult[0].signedUrl2}} style={{width:200, height:200}} />
                </TouchableOpacity>
            }
            {
                (breweryImage2 !== null) && 
                <TouchableOpacity
                    onPress={
                        () => {
                            this._pickImage(2, false)
                        }
                    }
                >
                    <Image source={{uri: breweryImage2.uri}} style={{width:200, height:200}} />
                </TouchableOpacity>
            }

            {
                (breweryImage3 === null && 
                    state.individualResult !== null && state.individualResult[0].signedUrl3 !== '') &&
                <TouchableOpacity
                    onPress={
                        () => {
                            this._pickImage(0, false)
                        }
                    }
                >
                    <Image source={{uri: state.individualResult[0].signedUrl3}} style={{width:200, height:200}} />
                </TouchableOpacity>
            }
            {
                (breweryImage3 !== null) &&
                <TouchableOpacity
                    onPress={
                        () => {
                            this._pickImage(0, false)
                        }
                    }
                >
                    <Image source={{uri: breweryImage3.uri}} style={{width:200, height:200}} />
                </TouchableOpacity>
            }
            {
                (!breweryImage1 || !breweryImage2 || !breweryImage3) && 
                (state.individualResult === null || (state.individualResult !== null &&
                    (state.individualResult[0].signedUrl1 === '' || 
                    state.individualResult[0].signedUrl2 === '' ||
                    state.individualResult[0].signedUrl3 === '')
                ))
                &&
                (
                <View style={{flex:1, width: 200, alignSelf:'center', alignContent:'center'}}>
                    <TouchableOpacity
                        onPress = { () => {
                                this._pickImage(imageCount, true)
                            }
                        }    
                    >
                        <Feather name="upload" style={{fontSize: 100, alignSelf: 'center'}} />
                    </TouchableOpacity>
                </View>)
            }
            </ScrollView>


            <View style={styles.fieldView}>
                <Input 
                    
                    labelStyle={{color: 'black', fontSize: 20}}
                    label="Brewery Name"
                    placeholderTextColor="#262626"
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    value={breweryName}
                    onChangeText={(newName) => setBreweryName(newName)}
                    placeholder="Brewery Name"
                    autoCapitalize="words"
                />
                <Text style={styles.errorMsg}>{nameErrorMsg}</Text>
            </View>
            <View style={styles.fieldView}>
                <Input
                    label="Brewery Address"
                    labelStyle={{color: 'black', fontSize: 20}}
                    value={street}
                    onChangeText={(newStreet) => setStreet(newStreet)}
                    placeholder="Street"
                    autoCapitalize="words"
                    placeholderTextColor="#262626"
                    inputContainerStyle={{borderBottomColor: 'black'}}
                />
                <Input
                    value={city}
                    onChangeText={(newCity) => setCity(newCity)}
                    placeholder="City"
                    autoCapitalize="words"
                    placeholderTextColor="#262626"
                    inputContainerStyle={{borderBottomColor: 'black'}}
            
                />
                <Input
                    value={breweryState}
                    onChangeText={(newState) => setState(newState)}
                    placeholder="State"
                    autoCapitalize="characters"
                    placeholderTextColor="#262626"
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    maxLength={2}
                />
                <Input

                    value={zipCode}
                    onChangeText={(newZip) => setZipCode(newZip)}
                    placeholder="Zip Code"
                    keyboardType="decimal-pad"
                    placeholderTextColor="#262626"
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    maxLength={5}
                />
                <Text style={styles.errorMsg}>{addressErrorMsg}</Text>
            </View>

            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Relative Price</Text>
                <ButtonGroup
                    onPress={(e) => {setPrice(e)}}
                    selectedIndex={price}
                    buttons={priceButtons}
                    containerStyle={{height: 100}}
                />
            </View>

            <View style={styles.fieldView}>
                
                <Input
                    value={phoneNumber}
                    onChangeText={(newPhone) => setPhoneNumber(newPhone)}
                    label="Phone Number"
                    labelStyle={{color: 'black', fontSize: 20}}
                    placeholder="Phone Number"
                    keyboardType="number-pad"
                    placeholderTextColor="#262626"
                    leftIcon={{type: 'font-awesome', name: 'phone'}}
                    leftIconContainerStyle={{paddingRight: 8}}
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    maxLength={10}
                />
                <Text style={styles.errorMsg}>{phoneErrorMsg}</Text>
            </View>

            <View style={styles.fieldView}>
                <Input 
                    value={email}
                    onChangeText={(newEmail) => setEmail(newEmail)}
                    label="Email"
                    labelStyle={{color: 'black', fontSize: 20}}
                    placeholder="Email"
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    leftIcon={{type: 'font-awesome', name: 'envelope'}}
                    leftIconContainerStyle={{paddingRight: 8}}
                    placeholderTextColor='#262626'
                    inputContainerStyle={{borderBottomColor: 'black'}}
                />
                <Text style={styles.errorMsg}>{emailErrorMsg}</Text>
            </View>

            <View style={styles.fieldView}>
                <Input 
                    value={website}
                    onChangeText={(newWeb) => setWebsite(newWeb)}
                    label="Website"
                    labelStyle={{color: 'black', fontSize: 20}}
                    leftIcon={{type: 'font-awesome', name: 'globe'}}
                    leftIconContainerStyle={{paddingRight: 8}}
                    placeholder="Website"
                    placeholderTextColor='#262626'
                    inputContainerStyle={{borderBottomColor: 'black'}}
                    keyboardType='email-address'
                    autoCapitalize="none"
                />
                <Text style={styles.errorMsg}>{websiteErrorMsg}</Text>
            </View>



            <DateTimePicker
                mode="time"
                isVisible={timePickerVisible}
                date={moment(`${selectedTime}`, 'H:mm a').toDate()}
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
                    <TouchableOpacity style={styles.timeValue}
                        onPress={()=>{
                        setSelectedTime(mondayOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('mondayOpen');
                    }}
                    >
                        <Text style={styles.timeValue}>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Monday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(mondayCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('mondayClose');
                    }}
                    >
                        <Text style={styles.timeValue}>{mondayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Tuesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(tuesdayOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('tuesdayOpen');
                    }}
                      
                    >
                        <Text style={styles.timeValue}>{tuesdayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Tuesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(tuesdayCloseTime)
                        setTimePickerVisible(!timePickerVisible);
                        setDayPicked('tuesdayClose');
                    }}>
                        <Text style={styles.timeValue}>{tuesdayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Wednesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(wednesdayOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('wednesdayOpen');
                    }}
                      
                    >
                        <Text style={styles.timeValue}>{wednesdayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Wednesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(wednesdayCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked("wednesdayClose");
                    }}
                    >
                        <Text style={styles.timeValue}>{wednesdayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Thursday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(thursdayOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('thursdayOpen');
                    }}
                        
                    >
                        <Text style={styles.timeValue}>{thursdayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Thursday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(thursdayCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('thursdayClose');
                    }
                    }>
                        <Text style={styles.timeValue}>{thursdayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Friday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(fridayOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('fridayOpen');
                    }}
                      
                    >
                        <Text style={styles.timeValue}>{fridayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Friday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(fridayCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('fridayClose');
                    }}>
                        <Text style={styles.timeValue}>{fridayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Saturday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(saturdayOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked("saturdayOpen")
                    }}
                        
                    >
                        <Text style={styles.timeValue}>{saturdayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Saturday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(saturdayCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked("saturdayClose");
                    }}>
                        <Text style={styles.timeValue}>{saturdayCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Sunday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(sundayOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('sundayOpen');
                    }}
                        
                    >
                        <Text style={styles.timeValue}>{sundayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Sunday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(sundayCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('sundayClose');
                    }}>
                        <Text style={styles.timeValue}>{sundayCloseTime}</Text>
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
                        setSelectedTime(mondayKidOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked("mondayKidOpen");
                    }}
                        style={{display:'inline-block'}}
                    >
                        <Text style={styles.timeValue}>{mondayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Monday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(mondayKidCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('mondayKidClose');
                    }}>
                        <Text style={styles.timeValue}>{mondayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Tuesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(tuesdayKidOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('tuesdayKidOpen');
                    }}
                      
                    >
                        <Text style={styles.timeValue}>{tuesdayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Tuesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(tuesdayKidCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('tuesdayKidClose');
                    }}>
                        <Text style={styles.timeValue}>{tuesdayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Wednesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(wednesdayKidOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('wednesdayKidOpen');
                    }}
                      
                    >
                        <Text style={styles.timeValue}>{wednesdayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Wednesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(wednesdayKidCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('wednesdayKidClose');
                    }}>
                        <Text style={styles.timeValue}>{wednesdayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Thursday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(thursdayKidOpenTime)
                        setTimePickerVisible(!timePickerVisible);
                        setDayPicked('thursdayKidOpen');
                    }}
                        
                    >
                        <Text style={styles.timeValue}>{thursdayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Thursday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(thursdayKidCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('thursdayKidClose');
                    }}>
                        <Text style={styles.timeValue}>{thursdayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Friday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(fridayKidOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('fridayKidOpen');
                    }}
                      
                    >
                        <Text style={styles.timeValue}>{fridayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Friday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(fridayKidCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('fridayKidClose');
                    }}>
                        <Text style={styles.timeValue}>{fridayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Saturday Open Time:</Text>
                    <TouchableOpacity style={styles.timeValue}
                        onPress={()=>{
                        setSelectedTime(saturdayKidOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('saturdayKidOpen');
                    }}
                        
                    >
                        <Text style={styles.timeValue}>{saturdayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Saturday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(saturdayKidCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('saturdayKidClose');
                    }}>
                        <Text style={styles.timeValue}>{saturdayKidCloseTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Sunday Open Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(sundayKidOpenTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('sundayKidOpen');
                    }}
                        
                    >
                        <Text style={styles.timeValue}>{sundayKidOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Sunday Close Time:</Text>
                    <TouchableOpacity onPress={()=>{
                        setSelectedTime(sundayKidCloseTime)
                        setTimePickerVisible(!timePickerVisible)
                        setDayPicked('sundayKidClose');
                    }}>
                        <Text style={styles.timeValue}>{sundayKidCloseTime}</Text>
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
                        clearErrorMsgs(); // Clear any error messages from prior attempts
                        var name = breweryName; //rename breweryName state object to conform to backend expectations
                        var address = formatAddress(); 
                        var businessHours = formatBusinessHours();

                        // If the kidFriendlyHours are not the same as businessHours, build kidFriendlyHours object
                        if (!kidHoursSame) {
                            var alternativeKidFriendlyHours = businessHours;
                        }

                        alternativeKidFriendlyHours = formatKidsHours();

                        var accommodations = buildAccommodationMap();
                        
                        // Validate all user input
                        if (!validateBreweryName(name)) {
                            setNameErrorMsg("Brewery Name cannot be empty.");
                            return;
                        } else if (!validateAddress(address)) {
                            setAddressErrorMsg('Must fill all address fields');
                            return;
                        } else if (!validatePhoneNumber) {
                            setPhoneErrorMsg("Must provide a valid phone number");
                            return;
                        } 

                        var kidHoursSameAsNormal = kidHoursSame; //rename kidHoursFriendly state object to what backend expects
                        
                        var params = {
                            token: authContext.state.token,
                            name: name,
                            address: address,
                            price: price,
                            phoneNumber: phoneNumber,
                            businessHours: businessHours,
                            kidHoursSameAsNormal: kidHoursSameAsNormal,
                            alternativeKidFriendlyHours: alternativeKidFriendlyHours,
                            accommodations: accommodations,
                            breweryImage1: breweryImage1,
                            breweryImage2: breweryImage2,
                            breweryImage3: breweryImage3
                        }

                        if (email && email.length > 0 && validateEmail(email)) {
                            params['email'] = email;
                        } else if (email && email.length > 0){
                            setEmailErrorMsg("Must provide a valid email address");
                            return;
                        }

                        if (website && website.length > 0 && validateURL(website)) {
                            params['website'] = website
                        } else if (website && website.length > 0){
                            setWebsiteErrorMsg("Must provide a valid website URL");
                            return;
                        }
                        
                        
                        // If brewery is being used to create a new brewery, hit createBrewery route
                        if (isNew) {
                            setBufferText('Creating New Location...')
                            setShowBufferPopup(true)
                            response = await createBrewery(params)
                            getOwnedBreweries({token: authContext.state.token});
                            setShowBufferPopup(false)
                           
                        } else { // if brewery is being used to edit brewery, hit updateBrewery route
                            var breweryId = brewery._id;
                            params['breweryId'] = breweryId;
                            setBufferText('Updating Location...')
                            setShowBufferPopup(true)
                            response = await updateBrewery(params)
                            getOwnedBreweries({token: authContext.state.token});
                            setShowBufferPopup(false)
                        }

                        // If response was not received, or an error code was provided, set dialog error message
                        if (!response || parseInt(response.status) >= 400) {
                            console.log("Update failed")
                            setDialogMessage("Something went wrong. Brewery was not created/updated successfully.");
                        } else {
                            // Set dialog success message based on if form was being used to create/update brewery
                            if (isNew) {
                                setDialogMessage("Brewery Created Successfully");
                            } else {
                                setDialogMessage("Brewery Updated Successfully");
                            }  
                        }
                        
                        setDialogOpen(true);
                        
                    }}
                />
            </View>

            <Dialog
                visible={dialogOpen}
            >
                <DialogContent>
                    <View>
                        <View style={styles.dialogTitle}>
                            <Text>{dialogMessage}</Text>
                        </View>
                        
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

            <BufferPopup isVisible={showBufferPopup} text={bufferText}/>           
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
        fontSize:20,
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
        margin:5,
        padding:5,
        flexDirection:'column',
        flex:1,
        borderBottomColor: 'black'
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
        fontSize: 25
    },
    timeValue: {
        justifyContent: 'space-evenly',
        textAlignVertical: 'bottom',
        fontSize: 14,
        // display: 'inline-block',
        marginLeft: 2
    }
});

export default BreweryForm;