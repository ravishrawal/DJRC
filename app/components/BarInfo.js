import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import { Card, ListItem, List, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { email } from 'react-native-communications';

import colors from '../helper/colors.js';
import fonts from '../helper/fonts.js';
import commonStyles from '../helper/styles.js';

class BarInfo extends Component {


    render() {

        return (
            <View style={styles.container}>
                <Text> Log in </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
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
        fontSize: 30
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default connect(null, null)(BarInfo);