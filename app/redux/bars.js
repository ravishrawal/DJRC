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
    if (!bar.Owner && !bar.Owner.spotifyAccessToken) return;


    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(bar.Owner.spotifyAccessToken);
    console.log(bar.name)
    spotifyApi.getMyRecentlyPlayedTracks()
        .then(data => {
            const songs = [];
            data.items.forEach(song => {
                const track = {};
                track.artist = song.track.artists[0].name;
                track.name = song.track.name;
                songs.push(track);
            })
            console.log(songs[0].name)
            return songs[0].name;

        })
        .catch(err => {
            console.log(bar.Owner.spotifyAccessToken);
            console.log('err', err);
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
                    const currentSong = bar.Owner ? getSongsFromSpotify(bar) : null;
                    if (currentSong) console.log('song', currentSong)
                    return {
                        id: bar.id,
                        lat: bar.lat,
                        lon: bar.lon,
                        name: bar.name,
                        address: bar.address,
                        genres: genres,
                        owner: bar.Owner,
                        currentSong: currentSong,
                        genreNames
                    }
                })
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
