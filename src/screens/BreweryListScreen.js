import React, {useState, useContext} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'

import WelcomeButton from '../components/WelcomeButton'
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'

const BreweryListScreen = ({navigation}) => {
    const {state, getSearchResults} = useContext(BreweryContext)
    const [searchTerm, setSearchTerm] = useState("")

        const name = "scofflow"
        const latitude = 33.8
        const longitude = -84.4
        const zipCode = 30318
        const distance = 10500
        const maximumPrice = 3
        var accommodationsSearch = {
            petFriendly: {
                waterStations: true,
                indoorSpaces: false
            }
        }
        const openNow = false
        const minimumRating = 0

    return ( 
        <View>
            <SearchBar searchTerm={searchTerm}
                onTermChange={setSearchTerm}
                name={name}
                latitude={latitude}
                longitude={longitude}
                zipCode={zipCode}
                distance={distance}
                maximumPrice={maximumPrice}
                onSearchSubmit={(newAccommodations) => {
                    accommodationsSearch = newAccommodations;
                    getSearchResults(
                    {
                        name, latitude, longitude,
                        zipCode, distance, accommodationsSearch,
                        maximumPrice, openNow, minimumRating
                    }
                )}}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <ResultsList results={state.results} listName="Results" />
            </ScrollView>
            <WelcomeButton
                title="Update Account"
                onPress={()=> navigation.navigate("UpdateAccount")}
            />
        </View>
        
    );
}

const styles = StyleSheet.create({})

export default BreweryListScreen