import { SessionState, SET_SESSION, SessionActionTypes, 
    SET_EXP_TIME, UPDATE_ACCESS_TOKEN } from './types'
import { refreshToken } from '../../api/users-api'
import { getExpiryTime } from "../../utils/jsonWebToken"
import { Dispatch } from 'redux'
//import { History } from 'history'

export const setAuthedUser = (newSession: SessionState): SessionActionTypes =>
({
    type: SET_SESSION,
    authedUser: newSession,
})

export const updateAccessToken = (accessToken: string, expiresAt: number): SessionActionTypes =>
({
    type: UPDATE_ACCESS_TOKEN,
    accessToken,
    expiresAt,
})

export const setExpiresAt = (exp: number): SessionActionTypes =>
({
    type: SET_EXP_TIME,
    exp,
})

export const renewSession = () => async (dispatch: Dispatch) => {

    const { accessToken, user } = await refreshToken()
    let expiresAt = getExpiryTime(accessToken)
    expiresAt = expiresAt * 1000
    dispatch(setAuthedUser({
        accessToken,
        user,
        isLoggedIn: Date.now() < expiresAt,
        expiresAt
    }))
}