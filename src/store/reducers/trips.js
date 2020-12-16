import {SAVE_TRIP} from '../actions/trips'

const initialState = {
    list: [],
    selectedTrip: getEmptyTrip(),
}


export default function reducer(state = initialState, {type, payload}) {
    switch(type) {
        case SAVE_TRIP: return {
            ...state,
            list: [...state.list, payload]
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
