import axios from 'axios';

// ACTION TYPE(s)
const GET_BARS = 'GET_BARS';

// ACTION CREATOR(s)
const getBars = (bars) => {
    return {
        type: GET_BARS,
        bars
    };
};

// THUNK CREATOR(s)
export const updateGenres = (venueId, genreArr) => {
    return axios.put(`https://djrc-api.herokuapp.com/api/venues/${venueId}`, genreArr)
        .then(res => res.data)
        .then(() => {
            alert('Genre updated!');
        });
};

export const addPromo = (venueId, description) => {
    return axios.post(`https://djrc-api.herokuapp.com/api/promos/${venueId}`, {
            description
        })
        .then(res => res.data);
};

export const fetchBarsFromServer = (location, radius) => {
    const { latitude, longitude } = location;
    return (dispatch) => {
        axios.get(`https://djrc-api.herokuapp.com/api/venues?latitude=${latitude}&longitude=${longitude}&radius=${radius}`)
            .then(res => res.data)
            .then(bars => {
                dispatch(getBars(bars));
            })
            .catch(console.log);
    };
};

// REDUCER(s)
export default (state = [], action) => {
    switch (action.type) {
        case GET_BARS:
            return action.bars;
        default:
            return state;
    }
};
