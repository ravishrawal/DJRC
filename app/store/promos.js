import axios from 'axios';

// ACTION TYPE(s)
const GET_PROMOS = 'GET_PROMOS';

// ACTION CREATOR(s)
const getPromos = (promos) => {
    return {
        type: GET_PROMOS,
        promos
    };
};

// THUNK CREATOR(s)
export const fetchPromos = (venueId) => {
    return (dispatch) => {
        axios.get(`https://djrc-api.herokuapp.com/api/promos/${venueId}`)
            .then(res => res.data)
            .then(promos => {
                dispatch(getPromos(promos));
            })
            .catch(console.log('err promos'));
    };
};

export const deletePromo = (promoId) => {
    return axios.delete(`https://djrc-api.herokuapp.com/api/promos/${promoId}`);
};

// REDUCER(s)
export default (state = [], action) => {
    switch (action.type) {
        case GET_PROMOS:
            return action.promos;
        default:
            return state;
    }
};
