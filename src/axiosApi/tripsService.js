import axios from 'axios'

export default axios.create({
    baseURL: 'https://trip-planner-a978b-default-rtdb.firebaseio.com'
})