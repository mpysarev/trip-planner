import {combineReducers} from 'redux'
import trips from './trips'
import tripSummary from './tripSummary'
import auth from './auth'

export default combineReducers({
    trips,
    tripSummary,
    auth
})