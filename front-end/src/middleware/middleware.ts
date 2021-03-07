import { Middleware } from 'redux'
import { RootState } from '../reducers'


export type MiddleWare =  Middleware <{}, RootState>