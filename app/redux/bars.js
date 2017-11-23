import axios from 'axios';
var SpotifyWebApi = require('spotify-web-api-js');
import { AsyncStorage } from 'react-native';

const GET_BARS = 'GET_BARS';


const getBars = (bars) => {
    return {
        type: GET_BARS,
        bars
    }
}


const getSongsFromSpotify = (bar) => {
    return new Promise((resolve, reject) => {
        if (!bar.owner || !bar.owner.spotifyAccessToken) {
            return resolve(bar);
        }
        let spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(bar.owner.spotifyAccessToken);
        spotifyApi.getMyRecentlyPlayedTracks()
            .then(data => {
                bar.currentSong = data.items[0].track.name;
                return resolve(bar);
            })
            .catch(err => {
                if (error[2] === 'error_description="The access token expired"') {
                    console.log('asdfsa');
                    AsyncStorage
                    axios.get('http://192.168.0.14:3002/passportAuth/')
                }
                else {
                    return resolve(bar);
                }
            })

    })
}

export const fetchBarsFromServer = () => {
    return (dispatch) => {
        axios.get('https://djrc-api.herokuapp.com/api/venues')
            .then(res => res.data)
            .then(bars => {
                if (!bars) return;
                bars = bars.length && bars.map(bar => {
                    let genres = [];
                    let genreNames = [];
                    bar.genres.forEach(genre => {
                        genres.push(genre.id)
                        genreNames.push(genre.name)
                    })
                    return {
                        id: bar.id,
                        lat: bar.lat,
                        lon: bar.lon,
                        name: bar.name,
                        address: bar.address,
                        genres: genres,
                        owner: bar.Owner,
                        genreNames
                    }
                })
                return bars
            })
            .then(bars => {
                bars = bars.map(bar => {
                    return getSongsFromSpotify(bar);
                })
                return Promise.all(bars)
            })
            .then(bars => {
                dispatch(getBars(bars));
            })
            .catch(console.log);

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
