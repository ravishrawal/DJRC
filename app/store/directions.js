import axios from 'axios';
// import Polyline from '@mapbox/polyline';

// ACTION TYPE(s)
const GET_DIRECTIONS_TO_BAR = 'GET_DIRECTIONS_TO_BAR';

// ACTION CREATOR(s)
export const getDirections = (directions) => {
    return {
        type: GET_DIRECTIONS_TO_BAR,
        directions
    };
};

// THUNK CREATOR(s)
export const getDirectionsToBar = (startLoc, destLoc) => {
    return axios.post('https://djrc-api.herokuapp.com/api/directions', {
            startLoc: startLoc,
            destLoc: destLoc
        })
        .then(res => {
            return res.data;
        })
        .catch(console.log);
};

// REDUCER(s)
export default (state = [], action) => {
    switch (action.type) {
        case GET_DIRECTIONS_TO_BAR:
            return action.directions;
        default:
            return state;
    }
};
