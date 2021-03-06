import { SessionState, SET_SESSION, SessionActionTypes } from './types'
import { refreshToken } from '../../api/users-api'
import { getExpiryTime } from "../../utils/jsonWebToken"
import { Dispatch } from 'redux'
//import { History } from 'history'

export const setAuthedUser = (newSession: SessionState): SessionActionTypes =>
({
    type: SET_SESSION,
    authedUser: newSession,
})

export const renewSession = () => async (dispatch: Dispatch) => {

    try {
        const { accessToken, user } = await refreshToken()
        let expiresAt = getExpiryTime(accessToken)
        expiresAt = (expiresAt * 1000) + new Date().getTime()
        dispatch(setAuthedUser({
            accessToken,
            user,
            isLoggedIn: new Date().getTime() < expiresAt,
            expiresAt: expiresAt
        }))
        //history.replace('/auth/login');
    }catch(e){
        console.warn('ERROR!', e)
        //alert("Error fetching data")
        dispatch(setAuthedUser({
            accessToken: null,
            user: null,
            isLoggedIn: false,
            expiresAt: 0
        }))
    }
}