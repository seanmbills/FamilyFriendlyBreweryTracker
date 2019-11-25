import React, {useState, useContext, Component} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import {Context as BreweryContext} from '../context/BreweryContext'
import {Context as AuthContext} from '../context/AuthContext'
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList'
import SharedStyles from '../../assets/SharedStyles';

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

    componentDidMount() {
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
            <View style={styles.mainContainer}>
                <SearchBar navigation={this.props.navigation} userZip={this.state.userZip}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ResultsList results={this.props.context.state.results} />
                </ScrollView>
            </View>
            
        );
    }
}
BreweryListScreenComponent.contextType = AuthContext;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: SharedStyles.backgroundColor,
        flex: 1
    }
})

export default MapBreweryContext;