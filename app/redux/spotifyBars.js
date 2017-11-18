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
        axios.get('https://djrc-api.herokuapp.com/api/users/spotify')
        .then(res => res.data)
        .then(bars => {
            console.log(bars)
            dispatch(getSpotifyBars());
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