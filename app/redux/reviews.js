import axios from 'axios';

const POST_REVIEW = 'POST_REVIEW';

const postReview = (review) => {
    return {
        type: POST_REVIEW
    }
}

export const postReviewToServer = (review, venueId, userId) => {

    return (dispatch) => {
        axios.post(`http://192.168.0.14:3002/api/reviews/${venueId}`, { venueId: venueId, rating: review.Rating, content: review.Review, genre: review.Genre, userId: userId })
            .then(res => res.data)
            .then(review => {
                console.log(review);
                dispatch(postReview(review));
            }).catch(console.log);

    }
}
export default (state = [], action) => {
    switch (action.type) {
        case POST_REVIEW:
            return action.review
        default:
            return state;
    }
}
