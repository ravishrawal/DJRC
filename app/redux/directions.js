import axios from 'axios';
import Polyline from '@mapbox/polyline';

const GET_DIRECTIONS_TO_BAR = 'GET_DIRECTIONS_TO_BAR';

export function getDirections(directions){
  return {
    type: GET_DIRECTIONS_TO_BAR,
    directions
  };
}

export function getDirectionsToBar(startLoc, destLoc){
    return axios.post('https://djrc-barcast.herokuapp.com/api/directions', {startLoc: startLoc, destLoc:destLoc})
      .then(res => { return res.data })
      .catch(er=>console.log(er))
}

export default (state = [], action) => {
    switch (action.type) {
        case GET_DIRECTIONS_TO_BAR:
            return action.directions
        default:
            return state;
    }
}
