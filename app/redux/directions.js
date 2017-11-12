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
  return function thunk(dispatch){
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${destLoc.latitude},${destLoc.longitude}&mode=walking`)
    .then(res=> res.data)
    .then(res=> {
      let points = Polyline.decode(res.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
                return  {
                    latitude :point[0],
                    longitude :point[1]
                }
            })
      let obj = {
        time: res.routes[0].legs[0].duration.text,
        coords
      }
      dispatch(getDirections(obj));
    }).catch(er=>console.log(er.message))
  }
}

export default (state = [], action) => {
    switch (action.type) {
        case GET_DIRECTIONS_TO_BAR:
            return action.directions
        default:
            return state;
    }
}
