import axios from 'axios'


export const AUTH_ACTION = 'AUTH_ACTION'
export const userAuth = (values, isSignIn) => async (dispatch) => {
    console.log('Auth action', values);

    const authData = {
        ...values,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsVEprmFn_Q_fTx-aiFZ0yVpygE_6u-IQ'

    if (isSignIn) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsVEprmFn_Q_fTx-aiFZ0yVpygE_6u-IQ'
    }

    const { data } = await axios.post(url, authData);
    console.log(data);

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch({
        type: AUTH_ACTION,
        payload: data.idToken
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

    if(!token) {
        signOut();
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if(expirationDate <= new Date()) {
            signOut();
        } else {
            dispatch({
                type: AUTH_ACTION,
                payload: token
            })
            autoSignOut((expirationDate.getTime() - new Date().getTime()) / 1000)
        }
    }
}
