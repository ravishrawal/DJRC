import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, Button } from 'react-native'
import { Card, ListItem, List } from 'react-native-elements'
import { connect } from 'react-redux';
import { email } from 'react-native-communications';

import colors from '../helper/colors.js';
import fonts from '../helper/fonts.js';
import commonStyles from '../helper/styles.js';

class ClaimBar extends Component {


    render() {
        const { user } = this.props;
        const {navigate} = this.props.navigation.state.params;
        console.log('nav', navigate);
        return (
            <View style={styles.container}>
                <TouchableHighlight
                onPress={
                    () => email(['barcastnyc@gmail.com'], null, null, 'Sign me up as a bar owner!', 'I own (fill in bars name). Here is my verification')
                }>
                <Text style={[styles.button, styles.redButton]}>Click here to link your bar!</Text>
            </TouchableHighlight>
            
            <Button
            onPress={() => navigate.navigate('Home')}
            title='Go Home' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        borderRadius: 4,
        padding: 20,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff'
    },
    redButton: {
        alignItems: 'center',
        backgroundColor: colors.redOrange,
        borderColor: colors.redOrange,
        margin: 10,
        fontSize:30
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default connect(null, null)(ClaimBar);
