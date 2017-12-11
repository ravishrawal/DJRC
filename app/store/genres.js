import axios from 'axios';

// ACTION TYPE(s)
const GET_GENRES = 'GET_GENRES';

// ACTION CREATOR(s)
const getGenres = (genres) => {
    return {
        type: GET_GENRES,
        genres
    };
};

// THUNK CREATOR(s)
export const fetchGenres = () => {
    return (dispatch) => {
        axios.get('https://djrc-api.herokuapp.com/api/genres')
            .then(res => res.data)
            .then(genres => {
                genres = genres.map(genre => {
                    return {
                        key: genre.id,
                        name: genre.name
                    };
                });
                dispatch(getGenres(genres));
            })
            .catch(console.log);

    };
};

// REDUCER(s)
export default (state = [], action) => {
    switch (action.type) {
        case GET_GENRES:
            return action.genres;
        default:
            return state;
    }
};
