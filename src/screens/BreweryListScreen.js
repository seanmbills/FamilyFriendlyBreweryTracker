import React, {useState, useContext} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'
import {Context as AuthContext} from '../context/AuthContext'

import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'


const BreweryListScreen = ({navigation}) => {

    const {state} = useContext(BreweryContext)
    const [searchTerm, setSearchTerm] = useState("")

    return ( 
        <View>
            <SearchBar navigation={navigation}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ResultsList results={state.results} listName="Results" />
            </ScrollView>
        </View>
        
    );
}

const styles = StyleSheet.create({})

export default BreweryListScreen;