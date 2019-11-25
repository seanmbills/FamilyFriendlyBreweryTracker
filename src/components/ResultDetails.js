import React from 'react'
import {Rating} from 'react-native-ratings'
import {View, Text, StyleSheet, Image} from 'react-native'
import SharedStyles from '../../assets/SharedStyles'

function getPriceSymbol(price) {
    var priceStr = ""
    for (var x = 0; x < price; x++) {
        priceStr += "$"
    }
    return priceStr
}

const ResultDetails = ({result}) => {
    console.log(typeof(result.signedUrl))
    return (
        <View style={{flex: 1, backgroundColor: 'white', margin: 7,}}>
            <View style={styles.container}>
                <View style={{flex: 2, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                    {
                        (result.signedUrl === null || result.signedUrl === '') &&
                        <Image source={require('../../assets/PhotosComingSoon.jpg')} resizeMode='cover' style={{width: 100, height: 100}} />
                    }
                    {
                        (result.signedUrl !== null) && result.signedUrl !== '' &&
                        <Image source={{uri: result.signedUrl}} resizeMode='cover' style={{width:100, height:100}} />
                    }
                </View>
                <View style={{flex: 4, justifyContent:'center'}}>
                        <Text style={styles.locationName}>{result.name}</Text> 
                        <Text style={styles.locationName}>{result.address.street}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.locationName, {marginRight: 30}}>{getPriceSymbol(result.price)}</Text>
                            <Text>{String(Math.round(result.distance)) + " miles"}</Text>
                        </View>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{flex: 1, marginRight: 25}} >
                            <Rating
                                imageSize={20}
                                readonly
                                startingValue={result.rating}
                                style={styles.rating}
                                fractions={1}
                            />
                        </View>
                        <View style={{flex: 1, justifyContent:'center'}}>
                            <Text>{result.numReviews} Reviews</Text>
                        </View>
                    </View>
                    {/* {console.log(result.accommodations)} */}
                </View>
            </View>
            <View style={styles.breakLine}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        flex: 6,
        flexDirection: 'row',
        marginBottom: 5,
    },
    images: {
        height: 250,
        width: 250,
        borderRadius: 4,
        marginBottom: 5
    },
    locationName: {
        fontWeight: 'bold',
    },
    rating: {
        margin: 0,
    },
    breakLine: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        margin: 10
    }
})

export default ResultDetails