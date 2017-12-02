import React, { Component } from 'react';
import { View, StyleSheet, Linking, TouchableHighlight, Text } from 'react-native';
// import axios from 'axios';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import { WebBrowser} from 'expo';

import { getUser, spotifyLogin, signUp } from '../redux/user';

import colors from '../helper/colors.js';
import fonts from '../helper/fonts.js';
import commonStyles from '../helper/styles.js';

class SignUpOrIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            token: '',
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.login = this.login.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    componentDidMount() {
        Linking.addEventListener('url', this.handleRedirect);
    }
    onChangeEmail(email) {
        this.setState({ email: email });
    }
    onChangePassword(password) {
        this.setState({ password: password });
    }
    handleAdd() {
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.signUp(credentials);
    }
    login() {
        const { navigate } = this.props.navigation;
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.getUser(credentials, navigate);
    }
    handleRedirect(event) {
        WebBrowser.dismissBrowser();
        let ev = event.url.split('=');
        const token = ev[1];
        this.props.spotifyLogin(token);
    }
    spotLogin() {
        Linking.addEventListener('url', this.handleRedirect);
        WebBrowser.openBrowserAsync(`https://djrc-api.herokuapp.com/passportAuth/spotify`);
        Linking.removeEventListener('url', this.handleRedirect);
    }
    render() {
        const { handleAdd, onChangeEmail, onChangePassword, login } = this;
        return (
            <View style={styles.container}>
                <FormLabel>Email</FormLabel>
                <FormInput
                    autoFocus={true}
                    keyboardType="email-address"
                    onChangeText={onChangeEmail} />

                <FormLabel>Password</FormLabel>
                <FormInput
                    onChangeText={onChangePassword}
                    name="password"
                    secureTextEntry={true} />

                <TouchableHighlight
                    onPress={handleAdd}
                    style={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}>
                        <Text style={styles.buttonText}>Create account</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={login}
                    style={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}>
                        <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this.spotLogin}
                    style={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}>
                        <Text style={styles.buttonText}>Spotify</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.redOrange,
        borderColor: colors.redOrange,
        margin: 10,
        padding: 10,
        width: 200,
    },
    buttonText: {
        color: '#fff',
        fontFamily: fonts.bold,
        fontSize: 20,
    },
});

const mapState = ({ user }) => {
    return {
        user,
    };
};

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
        },
    };
};

export default connect(mapState, mapDispatch)(SignUpOrIn);
