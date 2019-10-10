import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { ButtonGroup } from 'react-native-elements';
import Checkbox from 'react-native-check-box';
import WelcomeButton from '../components/WelcomeButton'

const BreweryForm = ({route}) => {
    const [breweryName, setBreweryName] = useState('');
    const [address, setAddress] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [price, setPrice] = useState(0);
    const [email, setEmail] = useState(0);
    const [website, setWebsite] = useState('');
    const priceButtons = [ '$', '$$', '$$$' , '$$$$']
    const [phoneNumber, setPhoneNumber] = useState('');


    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [mondayOpenTime, setMondayOpenTime] = useState('8:00 a.m');
    const [mondayCloseTime, setMondayCloseTime] = useState('8:00 a.m');
    const [tuesdayOpenTime, setTuesdayOpenTime] = useState('8:00 a.m');
    const [tuesdayCloseTime, setTuesdayCloseTime] = useState('8:00 a.m');
    const [wednesdayOpenTime, setWednesdayOpenTime] = useState('8:00 a.m');
    const [wednesdayCloseTime, setWednesdayCloseTime] = useState('8:00 a.m');
    const [thursdayOpenTime, setThursdayOpenTime] = useState('8:00 a.m');
    const [thursdayCloseTime, setThursdayCloseTime] = useState('8:00 a.m');
    const [fridayOpenTime, setFridayOpenTime] = useState('8:00 a.m');
    const [fridayCloseTime, setFridayCloseTime] = useState('8:00 a.m');
    const [saturdayOpenTime, setSaturdayOpenTime] = useState('8:00 a.m');
    const [saturdayCloseTime, setSaturdayCloseTime] = useState('8:00 a.m');
    const [sundayOpenTime, setSundayOpenTime] = useState('8:00 a.m');
    const [sundayCloseTime, setSundayCloseTime] = useState('8:00 a.m');

    const [mondayKidOpenTime, setMondayKidOpenTime] = useState('8:00 a.m');
    const [mondayKidCloseTime, setMondayKidCloseTime] = useState('8:00 a.m');
    const [tuesdayKidOpenTime, setTuesdayKidOpenTime] = useState('8:00 a.m');
    const [tuesdayKidCloseTime, setTuesdayKidCloseTime] = useState('8:00 a.m');
    const [wednesdayKidOpenTime, setWednesdayKidOpenTime] = useState('8:00 a.m');
    const [wednesdayKidCloseTime, setWednesdayKidCloseTime] = useState('8:00 a.m');
    const [thursdayKidOpenTime, setThursdayKidOpenTime] = useState('8:00 a.m');
    const [thursdayKidCloseTime, setThursdayKidCloseTime] = useState('8:00 a.m');
    const [fridayKidOpenTime, setFridayKidOpenTime] = useState('8:00 a.m');
    const [fridayKidCloseTime, setFridayKidCloseTime] = useState('8:00 a.m');
    const [saturdayKidOpenTime, setSaturdayKidOpenTime] = useState('8:00 a.m');
    const [saturdayKidCloseTime, setSaturdayKidCloseTime] = useState('8:00 a.m');
    const [sundayKidOpenTime, setSundayKidOpenTime] = useState('8:00 a.m');
    const [sundayKidCloseTime, setSundayKidCloseTime] = useState('8:00 a.m');

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

    const handleTimePicked = (time)=> {
        var timeString = time.toString();
        console.log(timeString);
    }
    return (
        <ScrollView>
            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Brewery Name:</Text>
                <TextInput style={styles.textInput}
                    value={breweryName}
                    onChangeText={(newName) => setBreweryName(newName)}
                    placeholder="Brewery Name"
                />
            </View>
            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Brewery Address:</Text>
                <TextInput style={styles.textInput}
                    value={street}
                    onChangeText={(newStreet) => setStreet(newStreet)}
                    placeholder="Street"
                />
                <TextInput style={styles.textInput}
                    value={city}
                    onChangeText={(newCity) => setCity(newCity)}
                    placeholder="City"
                />
                <TextInput style={styles.textInput}
                    value={state}
                    onChangeText={(newState) => setState(newState)}
                    placeholder="State"
                />
                <TextInput style={styles.textInput}
                    value={zipCode}
                    onChangeText={(newZip) => setZipCode(newZip)}
                    placeholder="Zip Code"
                />
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
                />
            </View>

            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Email:</Text>
                <TextInput style={styles.textInput}
                    value={email}
                    onChangeText={(newEmail) => setEmail(newEmail)}
                    placeholder="Email"
                    keyboardType='email-address'
                />
            </View>

            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Website URL:</Text>
                <TextInput style={styles.textInput}
                    value={website}
                    onChangeText={(newWeb) => setWebsite(newWeb)}
                    placeholder="Website"
                    keyboardType='email-address'
                />
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
            <View style={styles.fieldView}>
                <TouchableOpacity onPress={() => setShowTimes(true)}>
                    <Text style={styles.timeTitle}>Edit Operational Hours</Text>
                </TouchableOpacity>
            </View>
            }
            { !showKidTimes &&
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
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        style={{display:'inline-block'}}
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Monday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Tuesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                      
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Tuesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Wednesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                      
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Wednesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Thursday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Thursday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Friday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                      
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Friday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Saturday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Saturday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Sunday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Sunday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
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
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        style={{display:'inline-block'}}
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Monday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Tuesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                      
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Tuesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Wednesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                      
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Wednesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Thursday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Thursday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Friday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                      
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Friday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Saturday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Saturday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
            <View style={styles.fieldView}>
            <View style={styles.timeContainers}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Sunday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Sunday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
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
        </ScrollView>
    );
}

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
});

export default BreweryForm;