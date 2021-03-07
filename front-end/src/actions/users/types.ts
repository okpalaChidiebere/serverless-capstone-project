import { User } from '../../types/User'


export const RECEIVE_USERS = 'RECEIVE_USERS'


interface ReceivesUsers { 
    type: typeof RECEIVE_USERS
    users: User[]
}

export type UsersActionTypes = ReceivesUsers