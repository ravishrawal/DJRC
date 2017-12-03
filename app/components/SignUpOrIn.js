import React, { Component } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
// import axios from 'axios';
import { Button, FormInput, FormLabel, FormValidationMessage, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { WebBrowser} from 'expo';

import { getUser, spotifyLogin, signUp } from '../redux/user';

class SignUpOrIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            token: '',
            checked: false
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.login = this.login.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.onCheck = this.onCheck.bind(this);
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
    onCheck(){
        this.setState({checked:!this.state.checked})
    }
    handleAdd() {
        const credentials = {
            email: this.state.email,
            password: this.state.password,
            isBusiness: this.state.checked
        };
        const {navigate} = this.props.navigation;
        this.props.signUp(credentials)
        if (this.state.checked) navigate('ClaimBar', {navigate: this.props.navigation});
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
        WebBrowser.openBrowserAsync(`https://djrc-api.herokuapp.com/passportAuth/spotify`)
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
                        autoFocus={false}
                        keyboardType="email-address"
                        inputStyle={styles.formInput}
                        onChangeText={onChangeEmail}
                        placeholder="..."
                        placeholderTextColor={colors.yellow}
                        selectionColor={colors.yellow} />
                    <FormValidationMessage
                        labelStyle={styles.formError}></FormValidationMessage>

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
                        labelStyle={styles.formError}></FormValidationMessage>

                    <CheckBox
                        center
                        title='Check here to claim a bar!'
                        checked={this.state.checked}
                        onPress={this.onCheck}
                        textStyle = {styles.formLabel}
                      />

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
