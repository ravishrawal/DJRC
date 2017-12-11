import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
// import { Card, ListItem, List, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { email } from 'react-native-communications';

import { logoutUser } from '../store/user';

import colors from '../helper/colors.js';
// import commonStyles from '../helper/styles.js';
// import fonts from '../helper/fonts.js';

class Profile extends Component {
    constructor() {
        super();
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
                    onPress={() => email(['barcastnyc@gmail.com'], null, null, 'Sign me up as a bar owner!', 'I own (fill in bars name). Here is my verification')}>
                    <Text style={[styles.button, styles.redButton, {fontSize: 20}]}>Click here to link your bar!</Text>
                </TouchableHighlight>
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
    name: {
        alignItems: 'center',
        borderColor: colors.redOrange,
        color: colors.blue,
        fontSize: 30,
        margin: 10,
    },
    redButton: {
        alignItems: 'center',
        backgroundColor: colors.redOrange,
        borderColor: colors.redOrange,
        fontSize: 30,
        margin: 10,
    },
});

const mapState = ({ user }) => {
    return { user };
};

const mapDispatch = (dispatch) => {
    return {
        logoutUser: (navigate) => {
            dispatch(logoutUser(navigate));
        }
    };
};


export default connect(mapState, mapDispatch)(Profile);
