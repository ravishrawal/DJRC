import axios from 'axios';
import { AsyncStorage } from 'react-native';

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

export const getUser = (credentials, navigate) => {
    return (dispatch) => {
        axios.post('http://192.168.0.14:3002/passportAuth/login', credentials)
            .then((res) => res.data)
            .then((res) => {
                if (res.error) {
                    alert(res.error)
                } else {
                    AsyncStorage.setItem('jwt', res.token)
                        .then(() => {
                            dispatch(setUser(res.user))
                            alert(`Loggedin`);
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
            return Object.assign({});
        default:
            return state;
    }
}