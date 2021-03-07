import { SessionState, SessionActionTypes, SET_SESSION, 
  UPDATE_ACCESS_TOKEN, SET_EXP_TIME } from '../../actions/authedUser/types'

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
    case SET_EXP_TIME: 

      const { exp } = action
      return {
        ...state,
        expiresAt: exp
      }
    case UPDATE_ACCESS_TOKEN:

      const { accessToken, expiresAt } = action
      return {
        ...state,
        accessToken,
        expiresAt
      }
    default:
        return state
  }
}