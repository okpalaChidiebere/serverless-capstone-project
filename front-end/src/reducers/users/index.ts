import { RECEIVE_USERS, UsersActionTypes } from "../../actions/users/types";
import { User } from "../../types/User";


const initialState: User[] = []

export default function users(
    state = initialState,
    action: UsersActionTypes
): User[] {
    switch(action.type) {
        case RECEIVE_USERS : 
          return action.users
        default:
            return state
    }
}