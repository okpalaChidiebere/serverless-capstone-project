import { combineReducers } from 'redux'
import authedUser from './authedUser'
import users from './users'
import invoices from './invoices'


//We combine all reducers into a main root reducer because the createStore function only accepts a single reducer
const rootReducer = combineReducers({
  authedUser,
  users,
  invoices,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer