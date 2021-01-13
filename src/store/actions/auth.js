import axios from 'axios'
import api from '../../axiosApi/tripsService'


export const AUTH_ACTION = 'AUTH_ACTION'
export const userAuth = (values, isSignIn) => async (dispatch) => {

    const authData = {
        ...values,
        returnSecureToken: true
    }

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`

    if (isSignIn) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
    }

    const { data } = await axios.post(url, authData);
    console.log(data);

    const cont = {
        userId: data.localId
    }

    if(!isSignIn) {
        console.log('posting user to DB');
        api.post(`/users/${data.localId}.json`, cont);
    }

    
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
    
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);
    
    dispatch({
        type: AUTH_ACTION,
        payload: data
    })
    
    autoSignOut(data.expiresIn);
    
}

const autoSignOut = (time) => {
    return (
        setTimeout(() => {
            signOut()
        }, time * 1000)
    )
}

export const AUTH_SIGNOUT = 'AUTH_SIGNOUT'
export const signOut = () => (dispatch) => {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    dispatch({
        type: AUTH_SIGNOUT
    })

}

export const autoLogin = () => (dispatch) => {
    const token = localStorage.getItem('token');
    // console.log(token);

    if(!token) {
        signOut();
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if(expirationDate <= new Date()) {
            signOut();
        } else {
            dispatch({
                type: AUTH_ACTION,
                payload: {idToken: token}
            })
            autoSignOut((expirationDate.getTime() - new Date().getTime()) / 1000)
        }
    }
}
