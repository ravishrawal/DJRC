import axios from 'axios';
var SpotifyWebApi = require('spotify-web-api-js');

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
            // return bar;
        }
        // console.log('owner', bar.owner)
        let spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(bar.owner.spotifyAccessToken);
        // console.log(bar.name)
        spotifyApi.getMyRecentlyPlayedTracks()
            .then(data => {
                const songs = [];
                data.items.forEach(song => {
                    const track = {};
                    track.artist = song.track.artists[0].name;
                    track.name = song.track.name;
                    songs.push(track);
                })
                // console.log(songs[0].name)
                bar.currentSong = songs[0].name;
            // console.log(bar);
            
                return resolve(bar);
            
                // return bar;

            })
            .catch(err => {
                console.log('err', err);
                return reject(err);
                // console.log(bar.Owner.spotifyAccessToken);
                
                
            })

    })
}

export const fetchBarsFromServer = () => {
    return (dispatch) => {
        axios.get('http://192.168.0.14:3002/api/venues')
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
                console.log('bars', bars);
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
