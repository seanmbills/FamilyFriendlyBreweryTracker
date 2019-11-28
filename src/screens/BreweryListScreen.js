import React, {useState, useContext, Component} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'
import {Context as AuthContext} from '../context/AuthContext'
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList'

import {
    AdMobInterstitial
} from 'expo-ads-admob'

const MapBreweryContext = ({navigation}) => {
    return (
        <BreweryContext.Consumer>
            {
                context => (<BreweryListScreenComponent navigation={navigation} context={context} />)
            }
        </BreweryContext.Consumer>
    )
}

class BreweryListScreenComponent extends Component {
    state = {
        userZip: '30332',
        zipLoaded: false
    }

    async initializeInterstitial() {
        AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/4411468910'); // Test ID, Replace with your-admob-unit-id
        AdMobInterstitial.setTestDeviceID('EMULATOR');
        try {
            await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true}).catch(error => console.warn(error));
            await AdMobInterstitial.showAdAsync().catch(error => console.log(error));
        } catch (err) {
            console.warn(err)
        }
    }

    componentDidMount() {
        this.initializeInterstitial()
        let {getUserInfo} = this.context;
        this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            if ((this.context.state.profileInfo === null || this.context.state.profileInfo === undefined)) {
                var response = await getUserInfo({token: this.context.state.token});
                if (response && response.status < 400) {
                    this.setState({
                        userZip: response.data.zipCode,
                        zipLoaded: true
                    })

                }
            }
        })
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {

        return ( 
            <View>
                <SearchBar navigation={this.props.navigation} userZip={this.state.userZip}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ResultsList results={this.props.context.state.results} />
                </ScrollView>
            </View>
            
        );
    }
}
BreweryListScreenComponent.contextType = AuthContext;

const styles = StyleSheet.create({})

export default MapBreweryContext;