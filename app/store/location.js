// ACTION TYPE(s)
const SET_LOCATION = 'SET_LOCATION';

// ACTION CREATOR(s)
export const setLocation = (location) => {
    return {
        type: SET_LOCATION,
        location
    };
};

// REDUCER(s)
export default (state = [], action) => {
    switch (action.type) {
        case SET_LOCATION:
            return action.location;
        default:
            return state;
    }
};
