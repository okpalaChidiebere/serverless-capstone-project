import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk, //which takes the functions and executes them, thereby obtaining actions to pass to the reducers
  logger,
)