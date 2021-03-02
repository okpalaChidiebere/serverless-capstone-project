import { SessionState, SET_SESSION, SessionActionTypes } from './types'


export const setAuthedUser = (newSession: SessionState): SessionActionTypes =>
({
    type: SET_SESSION,
    authedUser: newSession,
})