import thunk from 'redux-thunk'
import logger from './logger'
import checkSession from './checkSession'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk, //which takes the functions and executes them, thereby obtaining actions to pass to the reducers
  checkSession,
  logger, //used for debuging
)