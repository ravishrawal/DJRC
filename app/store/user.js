import axios from 'axios';

import { AsyncStorage } from 'react-native';
import { WebBrowser } from 'expo';
import { setOwner } from './owner';

// ACTION TYPE(s)
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

// ACTION CREATOR(s)
const setUser = (user) => {
    return {
        type: SET_USER,
        user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

// THUNK CREATOR(s)

export const tokenUser = () => {
    return (dispatch) => {

        //Persist a user if a jsonwebtoken is found
        AsyncStorage.getItem('jwt', (err, token) => {
                if (err) return err;
                if (!token) return {};
                axios.get('https://djrc-api.herokuapp.com/passportAuth/getUser', {
                        headers: {
                            Accept: 'application/json',
                            Authorization: `JWT ${token}`
                        }
                    })
                    .then(res => res.data)
                    .then(user => {
                        //Check to see if the user owns a bar
                        if (user.isBusiness) {
                            axios.get(`https://djrc-api.herokuapp.com/api/venues/owner/${user.id}`)
                                .then(res => res.data)
                                .then(venue => {
                                    dispatch(setOwner(venue));
                                });
                        }
                        dispatch(setUser(user));
                    })
                    .catch(console.log);
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const spotifyLogin = (token) => {
    return (dispatch) => {
        //Store jsonwebtoken received from server
        AsyncStorage.setItem('jwt', token)
            .then(() => {
                dispatch(tokenUser());
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const signUp = (credentials) => {
    return () => {
        axios.post('https://djrc-api.herokuapp.com/passportAuth/signup', credentials)
            .then(res => res.data)
            .then(() => {
                    alert('Success! You may now log in.');
            })
            .catch(err => {
                console.log(err);
                //Validation error from model definition
                alert('Email already in use!');
            });
    };
};

export const getUser = (credentials, navigate) => {
    return (dispatch) => {
        axios.post('https://djrc-api.herokuapp.com/passportAuth/login', credentials)
            .then(res => res.data)
            .then(res => {
                if (res.error) {
                    alert(res.error);
                } else {
                    //Store jsonwebtoken received from server
                    AsyncStorage.setItem('jwt', res.token)
                        .then(() => {
                            dispatch(tokenUser(navigate));
                        });
                }
            })
            .catch(err => {
                console.log(err);
                alert('There was an error logging in.');
            });
    };
};

export const logoutUser = (navigate) => {
    return (dispatch) => {
        AsyncStorage.removeItem('jwt')
            .then(() => {
                dispatch(removeUser());
            });
        navigate('Home');
    };
};

// REDUCER(s)
export default (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, state, action.user);
        case REMOVE_USER:
            return {};
        default:
            return state;
    }
};
