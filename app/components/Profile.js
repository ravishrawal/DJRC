import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, TouchableOpacity, Text, AsyncStorage } from 'react-native'
import { Card, ListItem, List } from 'react-native-elements'
import { connect } from 'react-redux';
import { logoutUser } from '../redux/user';
import { email } from 'react-native-communications';

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
        const { user } = this.props;

        return (
            <View style={styles.container}>
                <Card title={user.email}>
                    <Text style={{ marginBottom: 10 }}>I love music</Text>
                    <TouchableHighlight 
                    onPress={() => email(['barcastnyc@gmail.com'], null, null, 'Sign me up as a bar owner!', 'I own (fill in bars name).')}
                    >
                        <Text style={[styles.button, styles.greenButton]}>Email</Text>
                    </TouchableHighlight>
                </Card>
                <TouchableHighlight onPress={this.logout}>
                    <Text style={[styles.button, styles.greenButton]}>Logout</Text>
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
    greenButton: {
        marginTop: 20,
        backgroundColor: '#4CD964'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})


const mapState = ({ user }) => {
    return {
        user
    }
}

const mapDispatch = (dispatch) => {
    return {
        logoutUser: (navigate) => {
            dispatch(logoutUser(navigate));
        }
    }
}

export default connect(mapState, mapDispatch)(Profile);
