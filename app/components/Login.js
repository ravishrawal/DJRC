import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, AsyncStorage } from 'react-native'
import axios from 'axios';
import { FormLabel, FormInput } from 'react-native-elements'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        // this.login = this.login.bind(this);
    }

    onChangeEmail(email) {
        this.setState({ email: email })
    }

    onChangePassword(password) {
        this.setState({ password: password })
    }

    login() {
        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(data);
        axios.post('http://192.168.0.14:3002/passportAuth/login', data)
            .then((res) => res.data)
            .then((res) => {
                if (res.error) {
                    alert(res.error)
                } else {
                    AsyncStorage.setItem('jwt', res.token)
                    console.log(res.token)
                    alert(`Success! You may now access protected content.`)
                }
            })
            .catch(() => {
                alert('There was an error logging in.');
            })
    }

    render() {
        const { login, onChangeEmail, onChangePassword } = this;
        return (
            <View style={styles.container}>
                <FormLabel>Email</FormLabel>
                <FormInput onChangeText={onChangeEmail} ></FormInput>
                <FormLabel>Password</FormLabel>
                <FormInput name='password' onChangeText={onChangePassword} ></FormInput>
                <TouchableHighlight onPress={login}>
                    <Text style={[styles.button, styles.greenButton]}>Login</Text>
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

