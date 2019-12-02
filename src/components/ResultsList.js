import React, {useContext} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import ResultDetails from './ResultDetails';
import {withNavigation} from 'react-navigation'
import {Context as BreweryContext} from '../context/BreweryContext'


import {
    AdMobBanner,
    AdMobInterstitial,
    AdMobRewarded,
    PublisherBanner
} from 'expo-ads-admob'

let adBanner = (<AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                    testDeviceID="EMULATOR"
                    servePersonalizedAds // true or false
                    onDidFailToReceiveAdWithError={this.bannerError}
                />)


const ResultsList = ({results, navigation}) => {
    var {state, getBrewery} = useContext(BreweryContext);
    if (results === null || results === undefined || results.length === 0) {
        return null;
    }
    var dataList = []
    const addAd = 5
    var count = 0
    for (var i = 0; i < results.length; i++ ) {
        if (i % addAd === 0) {
            dataList.push({item: adBanner, isAd: true, key: count})
            count++
        }
        dataList.push({item: results[i], isAd: false, key: count})
        count++
    }
    console.log(dataList)
    
    return (
        <View style={styles.container}>
            <FlatList 
                data={dataList}
                keyExtractor={(result, index) => result.key.toString()}
                renderItem={({item}) => {
                    if (item.isAd) {
                        return (
                            <View style={{flex: 1}}>
                                {item.item}
                            </View>
                        )
                    }
                    return (
                        <View style={{flex: 1}}>
                        <TouchableOpacity onPress={
                            async () => {
                              await getBrewery({breweryId: item.item.breweryId})
                              navigation.navigate("BreweryDetails")
                            }
                        }>
                            <ResultDetails result={item.item}/>
                        </TouchableOpacity>
                        </View>
                    )
                }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 10,
        marginBottom: 5
    },
    container: {
        marginBottom: 10,
        paddingBottom: 50
    }
})

export default withNavigation(ResultsList)
