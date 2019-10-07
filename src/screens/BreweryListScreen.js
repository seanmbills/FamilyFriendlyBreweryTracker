import React, {useState, useContext} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'

import WelcomeButton from '../components/WelcomeButton'
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'

const BreweryListScreen = ({navigation}) => {
    const {state, getSearchResults} = useContext(BreweryContext)
    const [searchTerm, setSearchTerm] = useState("")

    return ( 
        <View>
            <SearchBar/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ResultsList results={state.results} listName="Results" />
            </ScrollView>
            <WelcomeButton
                title="Update Account"
                onPress={()=> navigation.navigate("UpdateAccount")}
            />
            <WelcomeButton
                title="More"
                onPress={()=> navigation.navigate('More')}
            />
        </View>
        
    );
}

const styles = StyleSheet.create({})

export default BreweryListScreen;