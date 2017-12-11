import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { email } from 'react-native-communications';

import colors from '../helper/colors.js';
// import commonStyles from '../helper/styles.js';
// import fonts from '../helper/fonts.js';

class ClaimBar extends Component {
    render() {
        // const { user } = this.props;
        const { navigate } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <TouchableHighlight
                    onPress={() => email(['barcastnyc@gmail.com'], null, null, 'Sign me up as a bar owner!', 'I own (fill in bars name). Here is my verification')}>
                    <Text style={[styles.button, styles.redButton]}>Click here to link your bar!</Text>
                </TouchableHighlight>
                <Button
                    buttonStyle={[{ backgroundColor: colors.redOrange,
                        borderColor: colors.redOrange }]}
                    onPress={() => navigate.navigate('Home')}
                    title="Go Home" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        color: '#fff',
        marginBottom: 20,
        padding: 20,
        textAlign: 'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    redButton: {
        alignItems: 'center',
        backgroundColor: colors.redOrange,
        borderColor: colors.redOrange,
        margin: 10,
        fontSize: 30
    },
});

export default connect(null, null)(ClaimBar);
