export const SET_TRIP_LENGTH = 'SET_TRIP_LENGTH';
export const setTripLength = (length) => (dispatch) => dispatch({
    type: SET_TRIP_LENGTH,
    payload: length
})

export const SET_TRIP_COST = 'SET_TRIP_COST'
export const setTripCost = (cost) => (dispatch) => dispatch({
    type: SET_TRIP_COST,
    payload: cost
})