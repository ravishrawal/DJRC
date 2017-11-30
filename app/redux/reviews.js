import axios from 'axios';

const POST_REVIEW = 'POST_REVIEW';

const postReview = (review) => {
    return {
        type: POST_REVIEW
    }
}

export const postReviewToServer = (review) => {
    return (dispatch) => {
        axios.post('https://djrc-api.herokuapp.com/api/reviews', review)
            .then(res => res.data)
            .then(review => {
                
                dispatch(postReview(review));
            }).catch(console.log);

    }
}
export default (state = [], action) => {
    switch (action.type) {
        case POST_REVIEW:
            // return action.genres
        default:
            return state;
    }
}
