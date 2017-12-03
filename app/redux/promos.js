import axios from 'axios'

const GET_PROMOS = 'GET_PROMOS';

const getPromos = (promos) => {
  return{
    type: GET_PROMOS,
    promos
  }
}

export const fetchPromos = (venueId) => {
  console.log(venueId)
  return (dispatch) => {
    axios.get(`https://djrc-api.herokuapp.com/api/promos/${venueId}`)
    .then(res => res.data)
    .then(promos => {
      console.log(promos, 'promos in fetch')
      dispatch(getPromos(promos));
    })
    .catch(console.log('err promos'));
  }
}

export function deletePromo(promoId){
    return axios.delete(`https://djrc-api.herokuapp.com/api/promos/${promoId}`)
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_PROMOS:
      return action.promos
    default:
      return state
  }
}
