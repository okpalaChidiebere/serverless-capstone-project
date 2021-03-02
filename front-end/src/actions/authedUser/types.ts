export const SET_SESSION = 'SET_SESSION'


export interface SessionState {
    isLoggedIn: boolean
    accessToken: string | null
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

export type SessionActionTypes = SetSessionAction