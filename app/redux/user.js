import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { WebBrowser } from 'expo';
import { setOwner } from './owner';

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';


const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}




export const logoutUser = (navigate) => {
    return (dispatch) => {
        AsyncStorage.removeItem('jwt')
            .then(() => {
                dispatch(removeUser());
            })
        navigate('Home')
    }
}

export const tokenUser = () => {
    return (dispatch) => {
        AsyncStorage.getItem('jwt', (err, token) => {
            if (err) return err;
            if (!token) return {};
            axios.get('https://djrc-barcast.herokuapp.com/passportAuth/getUser', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `JWT ${token}`
                }
            })
                .then(res => res.data)
                .then(user => {

                    if (user.isBusiness){

                    axios.get(`https://djrc-barcast.herokuapp.com/api/venues/owner/${user.id}`)
                    .then(res => res.data)
                    .then(venue => {
                        dispatch(setOwner(venue))
                    })
                    }



                    dispatch(setUser(user))

                }).catch(console.log)

        }).catch(err => {
            console.log(err);
        })
    }
}

export const spotifyLogin = (token) => {
    return (dispatch) => {
        AsyncStorage.setItem('jwt', token)
            .then(() => {
                dispatch(tokenUser());
            }).catch(err => {
                console.log(err)
            })
    }
}

export const signUp = (credentials) => {
   return () => {
        axios.post('https://djrc-barcast.herokuapp.com/passportAuth/signup', credentials)
            .then((res) => res.data)
            .then(() => {
                alert('Success! You may now log in.');
            })
            .catch(error => {
                alert('Email already in use!');
            })
        }
}

export const getUser = (credentials, navigate) => {
    return (dispatch) => {
        axios.post('https://djrc-barcast.herokuapp.com/passportAuth/login', credentials)
            .then((res) => res.data)
            .then((res) => {
                if (res.error) {
                    alert(res.error)
                } else {
                    AsyncStorage.setItem('jwt', res.token)
                        .then(() => {
                            dispatch(tokenUser(navigate));
                        })
                }
            }).catch((err) => {
                console.log(err);
                alert('There was an error logging in.');
            })
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, state, action.user)
        case REMOVE_USER:
            return {};
        default:
            return state;
    }
}

