import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import { Card, ListItem, List, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { logoutUser } from '../redux/user';
import { email } from 'react-native-communications';

import colors from '../helper/colors.js';
import fonts from '../helper/fonts.js';
import commonStyles from '../helper/styles.js';

class Profile extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this);
    }

    logout() {
        const { navigate } = this.props.navigation;
        this.props.logoutUser(navigate);
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={[styles.button, styles.name]}>User: {this.props.user.email}</Text>
                <TouchableHighlight onPress={this.logout}>
                    <Text style={[styles.button, styles.redButton]}>Logout</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={
                        () => email(['barcastnyc@gmail.com'], null, null, 'Sign me up as a bar owner!', 'I own (fill in bars name). Here is my verification')
                    }>
                    <Text style={[styles.button, styles.redButton, {fontSize: 20}]}>Click here to link your bar!</Text>
                </TouchableHighlight>
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
        fontSize: 30
    },
    name: {
        alignItems: 'center',
        color: colors.blue,
        borderColor: colors.redOrange,
        margin: 10,
        fontSize: 30
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapState = ({ user }) => {
    return { user };
}

const mapDispatch = (dispatch) => {
    return {
        logoutUser: (navigate) => {
            dispatch(logoutUser(navigate));
        }
    }
}


export default connect(mapState, mapDispatch)(Profile);
