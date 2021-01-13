import {AUTH_ACTION, AUTH_SIGNOUT} from '../actions/auth'

const initialState = {
    token: null,
    userId: null
}

export default function auth(state = initialState, {type, payload}) {

    switch(type) {
        case AUTH_ACTION: return {
            ...state,
            token: payload.idToken,
            userId: payload.localId
        }
        case AUTH_SIGNOUT: return {
            ...state,
            userId: null,
            token: null
        }
        default: return state
    }
}