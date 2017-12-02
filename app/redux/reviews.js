import axios from 'axios';
import { fetchBarsFromServer } from './bars';

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

export const postReviewToServer = (review, venueId, userId, location) => {
    return (dispatch) => {
        axios.post(`https://djrc-api.herokuapp.com/api/reviews/${venueId}`, { venueId: venueId, rating: review.Rating, content: review.Review, genre: review.Genre, userId: userId })
            .then(res => res.data)
            .then(review => {
                dispatch(postReview(review))
                dispatch(fetchBarsFromServer(location.currentLocation, location.radius))

            }).catch(console.log);

    }
}

export const fetchVenueReviews = (venueId) => {
    return (dispatch) => {
        axios.get(`https://djrc-api.herokuapp.com/api/reviews/${venueId}`)
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
