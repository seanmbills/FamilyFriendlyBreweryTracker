import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
const BreweryForm = () => {
    const [breweryName, setBreweryName] = useState('');
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [mondayOpenTime, setMondayOpenTime] = useState('8:00 a.m');

    const handleTimePicked = (time)=> {
        var timeString = time.toString();
        console.log(timeString);
    }
    return (
        <ScrollView>
            <View style={styles.fieldView}>
                <Text style={styles.fieldTitle}>Brewery Name:</Text>
                <TextInput style={styles.textInput}
                    value={breweryName}
                    onChangeText={(newName) => setBreweryName(newName)}
                />
            </View>
            <DateTimePicker
                mode="time"
                isVisible={timePickerVisible}
                onCancel={()=>setTimePickerVisible(!timePickerVisible)}
                onConfirm={(time)=>{
                    handleTimePicked(time);
                    setTimePickerVisible(!timePickerVisible)
                }}
                is24Hour={false}
                
            />
            <View style={styles.fieldView}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Monday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        style={{display:'inline-block'}}
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Monday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.fieldView}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Tuesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                      
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Tuesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.fieldView}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Wednesday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                      
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Wednesday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.fieldView}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Thursday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Thursday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.fieldView}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Friday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                      
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Friday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.fieldView}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Saturday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Saturday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.fieldView}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.timeTitle}>Sunday Open Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}
                        
                    >
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', flexWrap:'true'}}>
                    <Text style={styles.timeTitle}>Sunday Close Time:</Text>
                    <TouchableOpacity onPress={()=>setTimePickerVisible(!timePickerVisible)}>
                        <Text>{mondayOpenTime}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fieldView: {
        margin: 5,
        padding:5,
        alignItems:'flex-start',
        flexDirection:'column'
    },
    fieldTitle: {
        color: 'black',
        marginLeft:5,
        marginBottom:5,
        fontWeight:"bold",
        fontSize:20,
    },
    textInput: {
        marginLeft:5,
        backgroundColor:'white',
        height:25,
        width:200,
        borderRadius:5,
    },
    timeTitle: {
        marginLeft:4,
        color: 'black',
        marginBottom:5,
        fontSize:20,
        fontWeight:'bold',
    }
});

export default BreweryForm;