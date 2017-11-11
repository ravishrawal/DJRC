import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import {logoutUser} from '../redux/user';

class Protected extends Component {
    constructor() {
        super()
        this.state = {
            secret: ''
        }
        this.logout = this.logout.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd() {
        AsyncStorage.getItem('jwt', (err, token) => {
            fetch('http://192.168.0.14:3002/auth/protected', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `JWT ${token}`
                }
            }).then((response) => response.json())
                .then((json) => {

                    this.setState({ secret: json.secret })

                })
                .catch((err) => {
                    console.log(err);
                    alert('There was an error fetching the secret info.')
                })
        })
    }

    logout() {
        const { navigate } = this.props.navigation;
        this.props.logoutUser(navigate);
        this.setState({ secret: '' })
    }

    render() {

        const { handleAdd } = this;
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={handleAdd}>
                    <Text style={[styles.button, styles.greenButton]}>Secret</Text>
                </TouchableHighlight>
                <Text>Secret: {this.state.secret}</Text>

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

export default connect(mapState, mapDispatch)(Protected);
