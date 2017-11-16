import React, { Component } from 'react';
import { View, StyleSheet, Linking, TouchableHighlight, Text } from 'react-native'
import axios from 'axios';
import { FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux';
import { WebBrowser} from 'expo';

import { getUser, spotifyLogin, signUp } from '../redux/user';

class SignUpOrIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            token: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.login = this.login.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    componentDidMount(){
        Linking.addEventListener('url', this.handleRedirect);
    }

    onChangeEmail(email) {
        this.setState({ email: email })
    }

    onChangePassword(password) {
        this.setState({ password: password })
    }

    handleAdd() {
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.signUp(credentials);

    }

    login() {
        const { navigate } = this.props.navigation;
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.getUser(credentials, navigate)
    }

    handleRedirect(event) {
        WebBrowser.dismissBrowser();
        let ev = event.url.split('=');
        const token = ev[1];
        this.props.spotifyLogin(token)
    }


    spotLogin() {
        Linking.addEventListener('url', this.handleRedirect);
        WebBrowser.openAuthSessionAsync(`http://192.168.0.14:3002/passportAuth/spotify`)
        Linking.removeEventListener('url', this.handleRedirect);
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
                <TouchableHighlight onPress={this.spotLogin}>
                    <Text style={[styles.button, styles.greenButton]}>Spotify</Text>
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
        },
        spotifyLogin: (token) => {
            dispatch(spotifyLogin(token));
        },
        signUp: (credentials) => {
            dispatch(signUp(credentials));
        }
    }
}

export default connect(mapState, mapDispatch)(SignUpOrIn);