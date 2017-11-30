import axios from 'axios';

const GET_BARS = 'GET_BARS';



const getBars = (bars) => {
    return {
        type: GET_BARS,
        bars
    }
}



export function updateGenres (venueId, genreArr) {
  return axios.put(`http://192.168.0.17:3002/api/venues/${venueId}`, genreArr)
  .then(res => res.data)
}

export function addPromo (venueId, description) {


  return axios.post(`http://192.168.0.17:3002/api/promos/${venueId}`, { description } )
  .then(res => res.data)
}


export const fetchBarsFromServer = () => {
    return (dispatch) => {

        axios.get('http://192.168.0.17:3002/api/venues')
            .then(res => res.data)
            .then(bars => {

                dispatch(getBars(bars));

            }).catch(console.log);
    }
}


export default (state = [], action) => {
    switch (action.type) {
        case GET_BARS:
            return action.bars
        default:
            return state;
    }
}
