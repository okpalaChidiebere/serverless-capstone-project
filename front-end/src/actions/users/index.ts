import { User } from "../../types/User";
import { RECEIVE_USERS, UsersActionTypes, UPDATE_USER_SALES } from "./types";


export const receiveUsers = (users: User[]): UsersActionTypes =>
({
    type: RECEIVE_USERS,
    users,
})

export const updateUserSales = (full_name: string = '', //username could be undefined. But die to the route to addInvoice is protected, the value of full_name will be initialized before this point
invoice_id: string ): UsersActionTypes => ({
    type: UPDATE_USER_SALES,
    meta: {
        full_name,
        invoice_id
    }
})