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
        axios.get('http://192.168.0.14:3002/api/venues')
            .then(res => res.data)
            .then(bars => {
                dispatch(dispatch(getBars(bars)));
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
