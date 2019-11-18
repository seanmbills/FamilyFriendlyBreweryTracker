import React from 'react'
import {Rating} from 'react-native-ratings'
import {View, Text, StyleSheet, Image} from 'react-native'

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
        <View style={styles.container}>
            {
                (result.signedUrl === null || result.signedUrl === '') &&
                <Image source={require('../../assets/PhotosComingSoon.jpg')} style={{width: 200, height: 200}} />
            }
            {
                (result.signedUrl !== null) && result.signedUrl !== '' &&
                <Image source={{uri: result.signedUrl}} style={{width:200, height:200}} />
            }
            <Text style={styles.locationName}>{result.name}</Text> 
            <Text style={styles.locationName}>{result.address.street}</Text>
            <Text style={styles.locationName}>{getPriceSymbol(result.price)}</Text>
            <Text>{result.numReviews} Reviews</Text>
            <Rating
                imageSize={20}
                readonly
                startingValue={result.rating}
                style={styles.rating}
                fractions={1}
            />
            <Text>{result.distance}</Text>
            {/* {console.log(result.accommodations)} */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
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

    }
})

export default ResultDetails