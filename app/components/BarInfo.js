import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import { Card, ListItem, List, Button } from 'react-native-elements';
import { connect } from 'react-redux';
// import { email } from 'react-native-communications';

import colors from '../helper/colors.js';
// import commonStyles from '../helper/styles.js';
// import fonts from '../helper/fonts.js';

class BarInfo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Log in</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        borderRadius: 4,
        color: '#fff',
        marginBottom: 20,
        padding: 20,
        textAlign: 'center',
    },
    redButton: {
        alignItems: 'center',
        backgroundColor: colors.redOrange,
        borderColor: colors.redOrange,
        fontSize: 30,
        margin: 10,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(null, null)(BarInfo);
