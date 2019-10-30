import React, {useState, useContext} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'

import WelcomeButton from '../components/WelcomeButton'
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'

const BreweryListScreen = ({navigation}) => {
    const {state, getSearchResults} = useContext(BreweryContext)
    const [searchTerm, setSearchTerm] = useState("")

        const name=""
        const zipCode = 30308
        const distance = 10000
        const maximumPrice = 3
        const minimumRating = 0

    return (
        <View>
            <SearchBar searchTerm={searchTerm}
                onTermChange={setSearchTerm}
                onSearchSubmit={() => getSearchResults(
                    {
                        name,
                        zipCode, distance,
                        maximumPrice, minimumRating
                    }
                )}
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
