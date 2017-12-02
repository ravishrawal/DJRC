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
                <View style={styles.inputContainer}>
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
                </View>

                <View style={styles.buttonContainer}>
                    <Button style={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                        backgroundColor={colors.redOrange}
                        color="#fff"
                        fontFamily={fonts.bold}
                        onPress={handleAdd}
                        title="Create Account" />

                    <Button style={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                        backgroundColor={colors.redOrange}
                        color="#fff"
                        fontFamily={fonts.bold}
                        onPress={login}
                        title="Login" />

                    <Button style={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                        backgroundColor={colors.redOrange}
                        color="#fff"
                        fontFamily={fonts.bold}
                        onPress={this.spotLogin}
                        title="Login with Spotify" />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        backgroundColor: colors.redOrange,
        borderColor: colors.redOrange,
        margin: 10,
        width: 200,
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
