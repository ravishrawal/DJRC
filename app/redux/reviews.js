import axios from 'axios';

const POST_REVIEW = 'POST_REVIEW';
const GET_REVIEWS_FOR_VENUE = 'GET_REVIEWS_FOR_VENUE';

const postReview = (review) => {
    return {
        type: POST_REVIEW,
        review
    }
}

const getReviewsForVenue = (reviews) => {
    return {
        type: GET_REVIEWS_FOR_VENUE,
        reviews
    }
}

export const postReviewToServer = (review, venueId, userId) => {

    return (dispatch) => {
        axios.post(`http://172.16.25.175:3002/api/reviews/${venueId}`, { venueId: venueId, rating: review.Rating, content: review.Review, genre: review.Genre, userId: userId })
            .then(res => res.data)
            .then(review => {
                console.log(review);
                dispatch(postReview(review));
            }).catch(console.log);

    }
}

export const fetchVenueReviews = (venueId) => {
    return (dispatch) => {
        axios.get(`http://172.16.25.175:3002/api/reviews/${venueId}`)
            .then(res => res.data)
            .then(reviews => {
                dispatch(getReviewsForVenue(reviews));
            }).catch(console.log);

    }
}

export default (state = [], action) => {
    switch (action.type) {
        case POST_REVIEW:
            const reviews = state.slice();
            reviews.push(action.review)
            return reviews;
        case GET_REVIEWS_FOR_VENUE:

            return action.reviews;
        default:
            return state;
    }
}
