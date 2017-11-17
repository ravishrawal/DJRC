import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, AsyncStorage, Dimensions } from 'react-native'
import axios from 'axios';
import { FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux';
import { getUser } from '../redux/user';

let { width } = Dimensions.get('window')

class SignUpOrIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.login = this.login.bind(this);
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

    login() {
        const { navigate } = this.props.navigation;
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        }


        this.props.getUser(credentials, navigate)
    }

    render() {
        const { handleAdd, onChangeEmail, onChangePassword, login } = this;
        return (
            <View style={styles.container}>
                <FormLabel>Email</FormLabel>
                <FormInput onChangeText={onChangeEmail} ></FormInput>
                <FormLabel>Password</FormLabel>
                <FormInput name='password' onChangeText={onChangePassword} ></FormInput>
                <TouchableHighlight onPress={handleAdd}>
                    <Text style={[styles.button, styles.greenButton]}>Create account</Text>
                </TouchableHighlight>
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

const mapState = ({ user }) => {
    return {
        user
    }
}

const mapDispatch = (dispatch) => {
    return {
        getUser: (credentials, navigate) => {
            dispatch(getUser(credentials, navigate));
        }
    }
}

export default connect(mapState, mapDispatch)(SignUpOrIn);