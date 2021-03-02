import { SessionState, SessionActionTypes, SET_SESSION } from '../../actions/authedUser/types'

const initialState: SessionState = {
    isLoggedIn: false,
    accessToken: null,
    user: null,
    expiresAt: 0
}

export default function authedUser(
  state = initialState,
  action: SessionActionTypes
): SessionState {
  switch (action.type) {
    case SET_SESSION:
        return action.authedUser
    default:
        return state
  }
}