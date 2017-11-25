import axios from 'axios';
var SpotifyWebApi = require('spotify-web-api-js');

const GET_BARS = 'GET_BARS';
const GET_ONE_BAR = 'GET_ONE_BAR';


const getBars = (bars) => {
    return {
        type: GET_BARS,
        bars
    }
}

const getOneBar = (bar) => {
    return {
        type: GET_ONE_BAR,
        bar
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
                console.log('err', err);
                return resolve(bar);
            })

    })
}

export const fetchOneBar = (userId) => {
    return (dispatch) => {
        axios.get(`http://djrc-api.herokuapp.com/api/venues/owner/${userId}`)
        .then(res => res.data)
        .then(bar => {
            dispatch(getOneBar(bar))
        })
        .catch(console.log('error'))
    }
}

export const fetchBarsFromServer = () => {
    return (dispatch) => {
        axios.get('http://djrc-api.herokuapp.com/api/venues')
            .then(res => res.data)
            .then(bars => {
                dispatch(getBars(bars));
            }).catch(console.log);

//                 if (!bars) return;
//                 bars = bars.length && bars.map(bar => {
//                     let genres = [];
//                     let genreNames = [];
//                     bar.genres.forEach(genre => {
//                         genres.push(genre.id)
//                         genreNames.push(genre.name)
//                     })
//                     return {
//                         id: bar.id,
//                         lat: bar.lat,
//                         lon: bar.lon,
//                         name: bar.name,
//                         address: bar.address,
//                         genres: genres,
//                         owner: bar.Owner,
//                         genreNames
//                     }
//                 })
//                 return bars
//             })
//             .then(bars => {
//                 bars = bars.map(bar => {
//                     return getSongsFromSpotify(bar);
//                 })
//                 return Promise.all(bars)
//             })
//             .then(bars => {
//                 dispatch(getBars(bars));
//             })
//             .catch(console.log);

    }
}


export default (state = [], action) => {
    switch (action.type) {
        case GET_BARS:
            return action.bars
        case GET_ONE_BAR:
            return action.bar
        default:
            return state;
    }
}
