import React, {useState, useContext} from 'react';
import {Context as BreweryContext} from '../context/BreweryContext';

import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ButtonGroup } from 'react-native-elements';
import Checkbox from 'react-native-check-box';
import WelcomeButton from '../components/WelcomeButton'
import {validateEmail, validatePhoneNumber, validateBreweryName, validateAddress, validateURL} from '../api/InputValidation';

const BreweryForm = ({isNew, navigation}) => {
    const {state, createBrewery} = useContext(BreweryContext);

    const [breweryName, setBreweryName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [breweryState, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [price, setPrice] = useState(0);
    const [email, setEmail] = useState(0);
    const [website, setWebsite] = useState('');
    const priceButtons = [ '$', '$$', '$$$' , '$$$$']
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dayPicked, setDayPicked] = useState('');
    const [kidHoursSame, setKidHoursSame] = useState(false);

    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [addressErrorMsg, setAddressErrorMsg] = useState('');
    const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
    const [emailErrorMsg, setEmailErrorMsg]= useState('');
    const [websiteErrorMsg, setWebsiteErrorMsg] = useState('');


    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [mondayOpenTime, setMondayOpenTime] = useState('8:00AM');
    const [mondayCloseTime, setMondayCloseTime] = useState('8:00PM');
    const [tuesdayOpenTime, setTuesdayOpenTime] = useState('8:00AM');
    const [tuesdayCloseTime, setTuesdayCloseTime] = useState('8:00PM');
    const [wednesdayOpenTime, setWednesdayOpenTime] = useState('8:00AM');
    const [wednesdayCloseTime, setWednesdayCloseTime] = useState('8:00PM');
    const [thursdayOpenTime, setThursdayOpenTime] = useState('8:00AM');
    const [thursdayCloseTime, setThursdayCloseTime] = useState('8:00PM');
    const [fridayOpenTime, setFridayOpenTime] = useState('8:00AM');
    const [fridayCloseTime, setFridayCloseTime] = useState('8:00PM');
    const [saturdayOpenTime, setSaturdayOpenTime] = useState('8:00AM');
    const [saturdayCloseTime, setSaturdayCloseTime] = useState('8:00PM');
    const [sundayOpenTime, setSundayOpenTime] = useState('8:00AM');
    const [sundayCloseTime, setSundayCloseTime] = useState('8:00PM');

    const [mondayKidOpenTime, setMondayKidOpenTime] = useState('8:00AM');
    const [mondayKidCloseTime, setMondayKidCloseTime] = useState('8:00PM');
    const [tuesdayKidOpenTime, setTuesdayKidOpenTime] = useState('8:00AM');
    const [tuesdayKidCloseTime, setTuesdayKidCloseTime] = useState('8:00PM');
    const [wednesdayKidOpenTime, setWednesdayKidOpenTime] = useState('8:00AM');
    const [wednesdayKidCloseTime, setWednesdayKidCloseTime] = useState('8:00PM');
    const [thursdayKidOpenTime, setThursdayKidOpenTime] = useState('8:00AM');
    const [thursdayKidCloseTime, setThursdayKidCloseTime] = useState('8:00PM');
    const [fridayKidOpenTime, setFridayKidOpenTime] = useState('8:00AM');
    const [fridayKidCloseTime, setFridayKidCloseTime] = useState('8:00PM');
    const [saturdayKidOpenTime, setSaturdayKidOpenTime] = useState('8:00AM');
    const [saturdayKidCloseTime, setSaturdayKidCloseTime] = useState('8:00PM');
    const [sundayKidOpenTime, setSundayKidOpenTime] = useState('8:00AM');
    const [sundayKidCloseTime, setSundayKidCloseTime] = useState('8:00PM');

    const [waterStations, setWaterStations] = useState(false);
    const [indoorSpaces, setIndoorSpaces] = useState(false);
    const [outdoorSpaces, setOutdoorSpaces] = useState(false);
    const [toddlers, setToddlers] = useState(false);
    const [youngKids, setYoungKids] = useState(false);
    const [teens, setTeens] = useState(false);
    const [kidFriendlyFood, setKidFriendlyFood] = useState(false);
    const [kidFriendlyDrinks, setKidFriendlyDrinks] = useState(false);
    const [changingStations, setChangingStations] = useState(false);
    const [indoorGames, setIndoorGames] = useState(false);
    const [outdoorGames, setOutdoorGames] = useState(false);
    const [childSeating, setChildSeating] = useState(false);
    const [strollerSpace, setStrollerSpace] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const [showTimes, setShowTimes] = useState(false);
    const [showKidTimes, setShowKidTimes] = useState(false);

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
                    onPress={()=> {
                        clearErrorMsgs();
                        console.log("submit pressed")
                        var name = breweryName;
                        var address = formatAddress();
                        var businessHours = formatBusinessHours();
                        var alternativeKidFriendlyHours = businessHours;
                        if (!kidHoursSame) {
                            alternativeKidFriendlyHours = formatKidsHours();
                        }
                        var accommodations = buildAccommodationMap();
                        
                        console.log("Made it through formatting");
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
                        var kidHoursSameAsNormal = kidHoursSame;
                        
                        if (isNew) {
                            // console.log("calling create brewery");
                            // console.log("name: " + name);
                            // console.log('address: ', address);
                            // console.log('price: ' + price);
                            // console.log('phoneNumber: ' + phoneNumber);
                            // console.log('email: ' + email);
                            // console.log('website: ' + website);
                            // console.log('businessHours: ' , businessHours);
                            // console.log('kidHoursSameAsNormal: ' + kidHoursSameAsNormal);
                            // console.log('alternativeKidFriendlyHours: ' , alternativeKidFriendlyHours);
                            // console.log('accommodations: ' , accommodations)
                            createBrewery({
                                name, address, price, phoneNumber, 
                                email, website, businessHours, kidHoursSameAsNormal, 
                                alternativeKidFriendlyHours, accommodations
                            });
                            // createBrewery({name, address, price, phoneNumber, email, website, businessHours, accommodations});
                        }
                        
                    }}
                />
            </View>
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
    }
});

export default BreweryForm;