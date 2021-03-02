import { combineReducers } from 'redux'
import authedUser from './authedUser'


//We combine all reducers into a main root reducer because the createStore function only accepts a single reducer
const rootReducer = combineReducers({
  authedUser,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer