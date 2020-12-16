import {SET_TRIP_LENGTH, SET_TRIP_COST} from '../actions/tripsForm'


const initialState = {
    tripLength: '',
    tripCost: ''
}

export default function tripsForm(state = initialState, {type, payload}) {
    switch(type) {
        case SET_TRIP_LENGTH: return {
            ...state,
            tripLength: payload 
        }
        case SET_TRIP_COST: return {
            ...state,
            tripCost: payload
        }

        default: return state
    }
}