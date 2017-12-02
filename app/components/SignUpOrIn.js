import React, { Component } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
// import axios from 'axios';
import { Button, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
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
                <View style={styles.formContainer}>
                    <FormLabel
                        labelStyle={styles.formLabel}>Email</FormLabel>
                    <FormInput
                        autoFocus={true}
                        keyboardType="email-address"
                        inputStyle={styles.formInput}
                        onChangeText={onChangeEmail}
                        placeholder="..."
                        placeholderTextColor={colors.yellow}
                        selectionColor={colors.yellow} />
                    <FormValidationMessage
                        labelStyle={styles.formError}>Error!</FormValidationMessage>

                    <FormLabel
                        labelStyle={styles.formLabel}>Password</FormLabel>
                    <FormInput
                        inputStyle={styles.formInput}
                        onChangeText={onChangePassword}
                        name="password"
                        placeholder="..."
                        placeholderTextColor={colors.yellow}
                        secureTextEntry={true}
                        selectionColor={colors.yellow} />
                    <FormValidationMessage
                        labelStyle={styles.formError}>Error!</FormValidationMessage>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        backgroundColor={colors.redOrange}
                        buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                        color="#fff"
                        fontFamily={fonts.bold}
                        onPress={handleAdd}
                        title="Create Account" />

                    <Button
                        backgroundColor={colors.redOrange}
                        buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                        color="#fff"
                        fontFamily={fonts.bold}
                        onPress={login}
                        title="Login" />

                    <Button
                        backgroundColor={colors.redOrange}
                        buttonStyle={[styles.button, commonStyles.roundedCorners, commonStyles.shadow]}
                        color="#fff"
                        fontFamily={fonts.bold}
                        iconRight={{ name: 'spotify', type: 'font-awesome' }}
                        onPress={this.spotLogin}
                        title="Login with Spotify" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.redOrange,
        borderColor: colors.redOrange,
        margin: 10,
        width: 200,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    formError: {
        color: colors.pink,
        fontFamily: fonts.regular,
        textAlign: 'right',
    },
    formContainer: {
        marginBottom: 20,
    },
    formInput: {
        backgroundColor: '#fff',
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
        color: colors.yellow,
        fontFamily: fonts.regular,
        fontSize: 20,
        padding: 10,
        width: '100%', // github.com/react-native-training/react-native-elements/issues/461
    },
    formLabel: {
        color: colors.blue,
        fontFamily: fonts.regular,
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
