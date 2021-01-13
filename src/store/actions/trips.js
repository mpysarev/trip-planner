import api from '../../axiosApi/tripsService'

export const fetchTripsList = (userId) => async (dispatch) => {

    try {
        const { data } = await api.get(`/users/${userId}.json`)
        console.log(data);
        const payload = Object.keys(data).map((key) => {
            return {
                ...data[key],
                id: key
            }
        })
        dispatch(setTripsList(payload))
    } catch (err) {
        console.warn('List fetch failure', err);
    }
}

export const SET_TRIPS_LIST = 'SET_TRIPS_LIST';
export const setTripsList = (payload) => ({
    type: SET_TRIPS_LIST,
    payload
})


export const saveTrip = (trip, length, cost, userId) => (dispatch) => {
    console.log('save action', trip);
    return trip.id
        ? updateTrip(trip, dispatch, length, cost, userId)
        : addTrip(trip, dispatch, length, cost, userId)
}

export const ADD_TRIP = 'ADD_TRIP';
const addTrip = async (trip, dispatch, length, cost, userId) => {
    trip.tripLength = length;
    trip.tripCost = cost;
    console.log(trip);

    try {
        const {data} = await api.post(`/users/${userId}.json`, trip)
        console.log(data);
        const payload = {
            ...trip,
            id: data.name
        }
                
        dispatch({
            type: ADD_TRIP,
            payload
        })
        return data;
        
    } catch (err) {
        console.warn('Trip create failure', err)
    }
}

export const UPDATE_TRIP = 'UPDATE_TRIP';
const updateTrip = async (trip, dispatch, length, cost, userId) => {
    trip.tripLength = length;
    trip.tripCost = cost;
    try {
        const { data } = await api.put(`/trips/${trip.id}.json`, trip);

        dispatch({
            type: UPDATE_TRIP,
            payload: data
        })
    } catch (err) {
        console.log('Trip update Failure', err);
    }

}

export const DELETE_TRIP = 'DELETE_TRIP';
export const deleteTrip = (id) => async (dispatch) => {
    try {
        await api.delete(`/trips/${id}.json`);
    } catch (err) {
        console.log('Trip delete Failure', err);
    }

    dispatch({
        type: DELETE_TRIP,
        payload: id
    })
}



