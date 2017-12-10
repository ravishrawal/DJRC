// ACTION TYPE(s)
const SET_OWNER = 'SET_OWNER';

// ACTION CREATOR(s)
export const setOwner = (owner) => {
    return {
        type: SET_OWNER,
        owner
    };
};

// THUNK CREATOR(s)
// export const fetchOwner = (ownerId) => {
//     return function(dispatch) {
//         return (dispatch) => {
//             axios.get(`https://djrc-api.herokuapp.com/api/venues/owner/${ownerId}`)
//                 .then((venue) => {
//                     dispatch(setOwner(venue));
//                 });
//         };
//     };
// };

// REDUCER(s)
export default (state = {}, action) => {
    switch (action.type) {
        case SET_OWNER:
            return Object.assign({}, state, action.owner);
        default:
            return state;
    }
};
