import { Middleware } from 'redux'
import { RootState } from '../reducers'

const logger: Middleware<
  {}, // legacy type parameter added to satisfy interface signature
  RootState
> = (store) => (next) => (action) => {
    console.group(action.type)
    console.log('The action: ', action)
    const returnValue = next(action) 
    console.log('The new state: ', store.getState()) 
    console.groupEnd()
    return returnValue
}

export default logger