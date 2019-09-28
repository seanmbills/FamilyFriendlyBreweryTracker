import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

const ResultDetails = ({result}) => {
    return (
        <View style={styles.container}>
            {/* <Image style={styles.images} source={{ uri: result.image_url }} /> */}
            <Text style={styles.locationName}>{result.name}</Text> 
            <Text style={styles.locationName}>{result.address.street}</Text>
            <Text style={styles.locationName}>{result.price}</Text>
            <Text>{result.ratings} Stars, {result.numReviews} Reviews</Text>
            <Text>{result.distance}</Text>
            {console.log(result.accommodations)}
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
    }
})

export default ResultDetails