import { User } from '../../types/User'


export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER_SALES = 'UPDATE_USER_SALES'


interface ReceivesUsers { 
    type: typeof RECEIVE_USERS
    users: User[]
}

interface UpdateUserSalesAction { 
    type: typeof UPDATE_USER_SALES
    meta: {
        full_name: string //| undefined
        invoice_id: string
    }
}

export type UsersActionTypes = ReceivesUsers | UpdateUserSalesAction