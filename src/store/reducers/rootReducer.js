import {combineReducers} from 'redux'
import trips from './trips'
import tripsForm from './tripsForm'

export default combineReducers({
    trips,
    tripsForm
})