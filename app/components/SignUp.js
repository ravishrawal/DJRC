import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native'
import axios from 'axios';
import { FormLabel, FormInput } from 'react-native-elements'

export default class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    //value returned onChange is just string, not sure how to get full object
    onChangeEmail(email) {
        this.setState({ email: email })
    }

    onChangePassword(password) {
        this.setState({ password: password })
    }

    handleAdd() {
        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        axios.post('http://192.168.0.14:3002/passportAuth/signup', data)
            .then((res) => res.data)
            .then(() => {
                alert('Success! You may now log in.');
            })
            .catch((error) => {
                console.log(error);
            })


    }

    render() {
        const { handleAdd, onChangeEmail, onChangePassword } = this;
        return (
            <View style={styles.container}>
                <FormLabel>Email</FormLabel>
                <FormInput onChangeText={onChangeEmail} ></FormInput>
                <FormLabel>Password</FormLabel>
                <FormInput name='password' onChangeText={onChangePassword} ></FormInput>
                <TouchableHighlight onPress={handleAdd}>
                    <Text style={[styles.button, styles.greenButton]}>Create account</Text>
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

