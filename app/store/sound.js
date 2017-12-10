import axios from 'axios';

// ACTION TYPE(s)
const SEND_RECORDING = 'SEND_RECORDING';

// ACTION CREATOR(s)
const sendRecording = (recording) => {
    return {
        type: SEND_RECORDING,
        recording
    };
};

// THUNK CREATOR(s)
export const sendAudio = (soundFile) => {
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
