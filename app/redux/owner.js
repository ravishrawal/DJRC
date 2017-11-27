// import axios from 'axios';

const SET_OWNER = 'SET_OWNER';

export const setOwner = (owner) => {
   return {
        type: SET_OWNER,
        owner
    }
}

// export const fetchOwner = (ownerId) => {

//     // return function (dispatch) {
//         return (dispatch) => {
//         console.log('also here')
//         axios.get(`https://djrc-barcast.herokuapp.com/api/venues/owner/${ownerId}`)
//         .then((venue) => {
//             console.log(venue);
//             dispatch(setOwner(venue))
//         })
//     }
// }
// }

export default (state = {}, action) => {
    switch (action.type) {
        case SET_OWNER:
            return Object.assign({}, state, action.owner)
        default:
            return state;
    }
}
