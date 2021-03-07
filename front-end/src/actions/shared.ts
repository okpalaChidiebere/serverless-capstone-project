import { Dispatch } from 'redux'
import { getUsers } from '../api/users-api'
import { getInvoices } from '../api/invoices-api'
import { receiveInvoices } from './invoices'
import { receiveUsers } from './users'
import { RootState } from '../reducers'



export const handleInitialData = () => async (dispatch: Dispatch, getState: () => RootState) => {

    const { authedUser } = getState() //getState method returns the current state of our store

    try{
        const [ users, invoices ] = await Promise.all([
            getUsers(authedUser.accessToken),
            getInvoices(authedUser.accessToken),
        ])
    
        dispatch(receiveUsers(users))
        dispatch(receiveInvoices(invoices))
    }catch(err){
        console.warn('ERROR!', err)
        alert("Error fetching initial data")
    }//export type GetState = () => RootState;
}