import React, {useState, useContext, Component, useEffect } from 'react'
import {View, Text, Button, StyleSheet, TextInput, 
    Switch, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import { ButtonGroup } from 'react-native-elements'
import {Rating} from 'react-native-ratings'
import ModalDropdown from 'react-native-modal-dropdown';
import Checkbox from 'react-native-check-box';
import {Context as BreweryContext} from '../context/BreweryContext';
import {Context as AuthContext} from '../context/AuthContext';

import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

class SearchBarComponent extends Component {
    state = {
        location: null,
        granted: false
    }

    componentWillMount() {
          this._getLocationAsync();
    }
    
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
    
        if (status === 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            this.setState({ location });
        }
    };

    render() {
        return (
            <SearchBar location={this.state.location} 
                navigation={this.props.navigation} term={this.props.term} 
                onTermChange={this.props.onTermChange} 
                userZip={this.props.userZip} 
            />
        )
    }
}



const SearchBar = ({navigation, term, onTermChange, userZip, location}) => {
    var latitude;
    var longitude;
    location === null ? null : latitude = location.coords.latitude
    location === null ? null : longitude = location.coords.longitude

    const {getSearchResults, clearErrorMessage} = useContext(BreweryContext);
    const {state} = useContext(AuthContext);

    const [modalOpen, setModalOpen] = useState(false)
    const [openNow, setOpenNow] = useState(false)
    const [kidFriendlyNow, setKidFriendlyNow] = useState(false)
    const [maximumPrice, setPrice] = useState(3)
    const [minimumRating, setRating] = useState(3)
    const [distanceIndex, setDistanceIndex] = useState(4);
    const [distance, setDistance] = useState(5 * 1609.34); //(5 miles converted into meters for backend)
    const [useLocation, setUseLocation] = useState(false)
    const [granted, setGranted] = useState(false)

    const [zipCode, setZipCode] = (state.token === null || state.token === '') ? useState('30332') : useState('')
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
    const [name, setName] = useState('');

    const milesOptions = ["1 mile", "5 miles", "10 miles", "25 miles", "50 miles"];

    
    const priceButtons = ["$", "$$", "$$$", "$$$$"]

    function buildAccommodationMap() {
        const accommodationsSearch = {
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
        return accommodationsSearch;
    }

    renderModalContent = () => (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View keyboardDismissMode='on-drag' style={styles.content}>
            { !showFilters &&
            <View>
            <Text style={styles.contentTitle}>Hi 👋!</Text>
            {granted && 
                <View style={{flexDirection: 'row'}}>
                    {/* if the user provides permission to use their location, need to figure out how to pull this information*/}
                    <Text>Use Current Location:</Text>
                    <Switch onValueChange={() => {
                        setUseLocation(!useLocation);
                    }} 
                    value={useLocation}/>
                </View>
            }
            </View>
            }
            {// display an entry field to ask for zipcode entry
            // and a button that gives the option to use the zipcode associated with the user's account instead
            // if user enters zipCode, should pull lat/long pair from MapQuest api by sending zipCode with " USA" appended to
            // end (to filter out potential results from other countries)
            // this should all be done in the backend
                // useLocation ? 
                // <Text style={styles.errorMsg}>{state.errorMessage}</Text>
                // : null
            }
            { !showFilters && 
              !useLocation && 
            <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={styles.filterText}>Zip Code</Text>
                <TextInput 
                    onChangeText={(newZip) => setZipCode(newZip)} 
                    value={zipCode}
                    placeholder="Enter Zip Code"
                    style={styles.zipInput}
                    maxLength={5}
                />
            </View>
            }
            {!showFilters && 
            <View>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.filterText}>Open Now</Text>
                <Switch onValueChange={() => setOpenNow(!openNow)} value={openNow}/>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.filterText}>Kid Friendly Now</Text>
                <Switch onValueChange={() => setKidFriendlyNow(!kidFriendlyNow)} value={kidFriendlyNow}/>
            </View>
            <Text>Maximum Price</Text>
            <ButtonGroup
                onPress={(e) => {setPrice(e)}}
                selectedIndex={maximumPrice}
                buttons={priceButtons}
                containerStyle={{height: 100}}
            />
            <View>
                <Text>Minimum Rating</Text>
                <Rating
                    imageSize={40}
                    startingValue={minimumRating}
                    onFinishRating={(e) => {setRating(e); console.log(e)}}
                    style={styles.rating}
                />
            </View>
            
            <View style={{flexDirection: 'row', marginTop: 25}}>
                <Text>Maximum Distance: </Text>
                <ModalDropdown 
                    options={["1 mile", "5 miles", "10 miles", "25 miles", "50 miles"]}
                    defaultIndex={distanceIndex}
                    defaultValue={milesOptions[distanceIndex]}
                    onSelect={(index) => {
                        var options = [1, 5, 10, 25, 50];
                        setDistanceIndex(parseInt(index));
                        var miles = options[parseInt(index)];
                        var meters = 1609.34 * miles;
                        setDistance(meters);
                    }}
                />
            </View>
            <View style={{flexDirection: 'row', marginTop: 25}}>
                <TouchableOpacity onPress={async () => {
                    setShowFilters(true);
                }}>
                    <Text>Show other Filters</Text> 
                </TouchableOpacity>
            </View>
            </View>
            }
            {
                /* need to display the possible accommodations to filter based on...probably easiest to use
                groups of radio buttons, each one of which can be selected */
            }
            { showFilters && 
            <View style={{flexDirection:'column'}}>
            <ScrollView style={{marginBottom:25, paddingBottom:25}}>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity onPress={() => setShowFilters(false)}>
                    <Text>Back</Text> 
                </TouchableOpacity>
            </View>
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
            </ScrollView>
            </View>
            }
            <View style={{ marginTop: 25, }}>
                <Button 
                    onPress={()=> {
                        const accommodationsSearch = buildAccommodationMap();
                        //onSearchSubmit(accommodationsSearch);
                        var req;
                        if (useLocation) {
                            req = {
                                name, latitude, longitude, zipCode, distance,
                                maximumPrice, accommodationsSearch, openNow,
                                kidFriendlyNow, minimumRating
                            }
                        } else {
                            req = {
                                name, latitude: '', longitude: '', zipCode, distance,
                                maximumPrice, accommodationsSearch, openNow,
                                kidFriendlyNow, minimumRating
                            }
                        }
                        getSearchResults(req);
                        setModalOpen(!modalOpen);
                    }}
                    title="Apply to Search"
                    >
                </Button>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );

    return (
        <View style = {styles.searchView}>
            <Feather style={styles.searchIcon} name="search"/>
            <TextInput style = {styles.textInput}
                placeholder="Search"
                placeholderTextColor="#686e72"
                value={term}
                onChangeText={(newName) => setName(newName)}
                autoCapitalize="none"
                autoCorrect={false}
                onEndEditing={async () => {
                    const accommodationsSearch = buildAccommodationMap();
                    var req;
                    if (useLocation) {
                        req = {
                            name, latitude, longitude, zipCode, distance,
                            maximumPrice, accommodationsSearch, openNow,
                            kidFriendlyNow, minimumRating
                        }
                    } else {
                        req = {
                            name, latitude: '', longitude: '', zipCode, distance,
                            maximumPrice, accommodationsSearch, openNow,
                            kidFriendlyNow, minimumRating
                        }
                    }
                    
                    getSearchResults(req);
                }}
            />
            <TouchableOpacity onPress={
                 async () => {
                    if (zipCode === '' && state.profileInfo) {
                        setZipCode(state.profileInfo.zipCode)
                    }
                    let { status } = await Permissions.getAsync(Permissions.LOCATION);
                    console.log("granted: " + status)
                    setGranted(status === 'granted' ? true : false)
                    setModalOpen(!modalOpen)
                    
            }}
            >
                <Feather style={styles.searchIcon} name="filter" />
            </TouchableOpacity>
            <Modal
                isVisible={modalOpen}
                backdropColor="#B4B3DB"
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                onBackdropPress={() => {
                    setModalOpen(!modalOpen);
                }}
            >
                    {this.renderModalContent()}
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    searchView: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        margin: 10,
        flexDirection: 'row',
    },
    textInput: {
        flex: 1,
        padding: 5,
        fontSize: 20,
        color: 'black',
    },
    searchIcon: {
        fontSize: 40,
        alignSelf: 'center',
        marginHorizontal: 10,

    },
    filterText: {
        textAlignVertical:'center',
        color: 'black',

    },
    zipInput: {
        backgroundColor: 'white',
        padding:5,
        margin:2,
        borderRadius:4,
        textAlign:'center'
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      contentTitle: {
        fontSize: 20,
        marginBottom: 12,
      }
})

export default SearchBarComponent