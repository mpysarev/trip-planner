import {ADD_TRIP, UPDATE_TRIP, SET_TRIPS_LIST, DELETE_TRIP} from '../actions/trips'

const initialState = {
    list: [],
    emptyTrip: getEmptyTrip(),
}


export default function trips(state = initialState, {type, payload}) {

    // console.log(payload);
    switch(type) {
        case ADD_TRIP: return {
            ...state,
            list: [...state.list, payload]
        }
        case UPDATE_TRIP: return {
            ...state,
            list: state.list.map((trip) => trip.id === payload.id ? payload : trip)
        }
        case DELETE_TRIP: return {
            ...state,
            list: state.list.filter((trip) => trip.id !== payload),
        }
        case SET_TRIPS_LIST: return {
            ...state,
            list: payload
        }

        default: return state
    }
}

function getEmptyTrip() {
    return {
        destination: '',
        housing: {
            type: '',
            cost: ''
        },
        meals: {
            type: '',
            cost: ''
        },
        transportation: {
            type: [''],
            cost: ['']
        },
        dates: {
            start: '',
            end: ''
        },
        extraExpenses: {
            type: [''],
            cost: ['']
        }
    }
}
