// export const SET_TRIPS_LIST = 'SET_TRIPS_LIST';
// export const fetchTripsList = () => (dispatch) => {
//     dispatch({
//         type: SET_TRIPS_LIST,
//         payload
//     })
// }

export const SAVE_TRIP = 'SAVE_TRIP';
export const saveTrip = (trip, length, cost) => (dispatch) => {
    trip.id = Math.random();
    trip.tripLength = length;
    trip.tripCost = cost;
    dispatch({
        type: SAVE_TRIP,
        payload: trip
    })
}