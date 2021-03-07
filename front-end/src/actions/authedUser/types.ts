export const SET_SESSION = 'SET_SESSION'
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN'
export const SET_EXP_TIME = 'SET_EXP_TIME'


export interface SessionState {
    isLoggedIn: boolean
    accessToken: string
    user: {
        full_name: string
        store: string
    } | null
    expiresAt: number
}

interface SetSessionAction {
    type: typeof SET_SESSION
    authedUser: SessionState
}

interface UpdateAccessToken {
    type: typeof UPDATE_ACCESS_TOKEN
    accessToken: string
    expiresAt: number
}

interface SetExpiresAt {
    type: typeof SET_EXP_TIME
    exp: number
}

export type SessionActionTypes = SetSessionAction | UpdateAccessToken | SetExpiresAt