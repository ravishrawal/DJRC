import axios from 'axios';

const GET_BARS = 'GET_BARS';


const getBars = (bars) => {
    return {
        type: GET_BARS,
        bars
    }
}

export const fetchBarsFromServer = () => {
    return (dispatch) => {
        axios.get('https://djrc-api.herokuapp.com/api/venues')
            .then(res => res.data)
            .then(bars => {
                bars = bars.map(bar => {
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
