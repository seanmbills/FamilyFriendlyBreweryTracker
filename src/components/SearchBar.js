import React, {useState} from 'react'
import {View, Text, StyleSheet, TextInput, Switch,} from 'react-native'
import {Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import { ButtonGroup } from 'react-native-elements'
import {Rating} from 'react-native-ratings'
import ModalDropdown from 'react-native-modal-dropdown'



const SearchBar = ({term, onTermChange, onSearchSubmit}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [openNow, setOpenNow] = useState(false)
    const [kidFriendlyNow, setKidFriendlyNow] = useState(false)
    const [maximumPrice, setPrice] = useState(0)
    const [minimumRating, setRating] = useState(5)
    const [distance, setDistance] = useState(1)
    const [useLocation, setUseLocation] = useState(true)

    const priceButtons = ["$", "$$", "$$$", "$$$$"]

    renderModalContent = () => (
        <View style={styles.content}>
            <Text style={styles.contentTitle}>Hi 👋!</Text>
            <View style={{flexDirection: 'row'}}>
                {/* if the user provides permission to use their location, need to figure out how to pull this information*/}
                <Text>Use Current Location:</Text>
                <Switch onValueChange={() => setUseLocation(!useLocation)} value={useLocation}/>
            </View>
            
            {// display an entry field to ask for zipcode entry
            // and a button that gives the option to use the zipcode associated with the user's account instead
            // if user enters zipCode, should pull lat/long pair from MapQuest api by sending zipCode with " USA" appended to
            // end (to filter out potential results from other countries)
                useLocation ? 
                <Text style={styles.errorMsg}>{state.errorMessage}</Text>
                : null
            }
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
                    defaultIndex={distance}
                    defaultValue="5 miles"
                    onSelect={(index) => {setDistance(parseInt(index))}}
                />
            </View>

            {
                /* need to display the possible accommodations to filter based on...probably easiest to use
                groups of radio buttons, each one of which can be selected */
            }
        </View>
    );

    return (
        <View style = {styles.searchView}>
            <Feather style={styles.searchIcon} name="search"/>
            <TextInput style = {styles.textInput}
                placeholder="Search"
                placeholderTextColor="#686e72"
                value={term}
                onChangeText={onTermChange}
                autoCapitalize="none"
                autoCorrect={false}
                onEndEditing={onSearchSubmit}
            />
            <TouchableOpacity onPress={
                () => setModalOpen(!modalOpen)}
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
                onBackdropPress={() => setModalOpen(!modalOpen)}
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
      },
})

export default SearchBar