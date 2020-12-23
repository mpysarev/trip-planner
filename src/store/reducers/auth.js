import {AUTH_ACTION, AUTH_SIGNOUT} from '../actions/auth'

const initialState = {
    token: null
}

export default function auth(state = initialState, {type, payload}) {
    switch(type) {
        case AUTH_ACTION: return {
            ...state,
            token: payload
        }
        case AUTH_SIGNOUT: return {
            ...state,
            token: null
        }
        default: return state
    }
}