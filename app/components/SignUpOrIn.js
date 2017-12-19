import React, { Component } from 'react';
import { View, StyleSheet, Linking, Dimensions } from 'react-native';
import { Button, FormInput, Card, FormLabel, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { WebBrowser } from 'expo';
import Modal from 'react-native-modal';

import { getUser, spotifyLogin, signUp } from '../store/user';

import colors from '../helper/colors.js';
import commonStyles from '../helper/styles.js';
import fonts from '../helper/fonts.js';

let { width } = Dimensions.get('window');

class SignUpOrIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            token: '',
            modalVisible: false,
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.login = this.login.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    //Add event listener for asyncBrowser
    componentDidMount() {
        Linking.addEventListener('url', this.handleRedirect);
    }

    //Create a new user
    handleAdd() {
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.signUp(credentials);
    }

    //Receive jsonwebtoken from server after login in with oAuth
    handleRedirect(event) {
        WebBrowser.dismissBrowser();
        let ev = event.url.split('=');
        const token = ev[1];
        this.props.spotifyLogin(token);
    }
    login() {
        const { navigate } = this.props.navigation;
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.getUser(credentials, navigate);
    }
    onChangeEmail(email) {
        this.setState({ email: email });
    }
    onChangePassword(password) {
        this.setState({ password: password });
    }
    
    //Open browser to authenticate with Spotify
    spotLogin() {
        Linking.addEventListener('url', this.handleRedirect);
        WebBrowser.openBrowserAsync(`https://djrc-api.herokuapp.com/passportAuth/spotify`);
        Linking.removeEventListener('url', this.handleRedirect);
    }
    toggleModal() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }
    render() {
        const { handleAdd, onChangeEmail, onChangePassword, login } = this;

        //Render a form for signing up or logging in.
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

                    <Button
                        buttonStyle={[commonStyles.roundedCorners, commonStyles.shadow, {
                            backgroundColor: colors.redOrange,
                            borderColor: colors.redOrange,
                            marginTop: 10,
                        }]}
                        fontFamily={fonts.bold}
                        onPress={this.toggleModal}
                        title="Bar Signup Information" />

                    <Modal isVisible={this.state.modalVisible}>
                        <View style={{ flex: 1, alignItems: 'center', width: width }}>
                            <Card
                                containerStyle={styles.card}
                                title={`Bar Signup Information`}
                                titleStyle={{ fontSize: 20 }}
                                fontFamily={fonts.regular}>
                                <Text style={styles.formLabel}>Login with your Spotify account to share your music with customers</Text>
                                <Text></Text>
                                <Text style={styles.formLabel}>Go into the settings tab to link your bar</Text>
                            </Card>
                            <View style={{ alignItems: 'center' }}>
                                <Button
                                    buttonStyle={[styles.button, commonStyles.roundedCorners]}
                                    onPress={this.toggleModal}
                                    title="Go back" />
                            </View>
                        </View>
                    </Modal>

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
    card: {
        alignItems: 'center',
        width: width,
        backgroundColor: '#F5FCFF',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    formContainer: {
        marginBottom: 20,
    },
    formError: {
        color: colors.pink,
        fontFamily: fonts.regular,
        textAlign: 'right',
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
