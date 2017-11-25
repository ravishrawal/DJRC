import axios from 'axios';

const GET_SPOTIFY_BARS = 'GET_SPOTIFY_BARS ';

const getSpotifyBars = (bars) => {
    return {
        type: GET_SPOTIFY_BARS,
        bars
    }
}

export const fetchSpotifyBars = () => {
    return (dispatch) => {
        axios.get('http://192.168.0.17:3002/api/venues/spotify')
        .then(res => res.data)
        .then(bars => {

            dispatch(getSpotifyBars(bars));
        }).catch(console.log)
    }
}

export default (state = [], action) => {
    switch (action.type) {
        case GET_SPOTIFY_BARS:
            return action.bars
        default:
            return state;
    }
}
