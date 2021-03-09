import { Dispatch } from 'redux'
import { getUsers } from '../api/users-api'
import { getInvoices, addInvoice } from '../api/invoices-api'
import { receiveInvoices } from './invoices'
import { receiveUsers, updateUserSales } from './users'
import { RootState } from '../reducers'
import { addInvoice as addInvoiceActionCreator } from './invoices'
import { Invoice } from '../types/Invoice'



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
    }
}

export const handleAddInvoice = (newInvoice: Invoice) => async (dispatch: Dispatch, getState: () => RootState) => {
    const { authedUser } = getState()

    try{
        await addInvoice(newInvoice, authedUser.accessToken)
        dispatch(addInvoiceActionCreator(newInvoice))
        dispatch(updateUserSales(authedUser.user?.full_name, newInvoice.id))
    }catch(err){
        console.warn('Error in handleAddInvoice: ', err)
        alert('There was an error adding the invoice. Try again.')
    }
}