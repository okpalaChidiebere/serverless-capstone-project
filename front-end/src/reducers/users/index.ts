import { RECEIVE_USERS, UPDATE_USER_SALES, UsersActionTypes } from "../../actions/users/types";
import { User } from "../../types/User";


const initialState: User[] = []

export default function users(
    state = initialState,
    action: UsersActionTypes
): User[] {
    switch(action.type) {
        case RECEIVE_USERS : 
          return action.users
        case UPDATE_USER_SALES :
          const { meta } = action

          return state.map((user) => user.full_name !== meta.full_name 
            ? user 
            : Object.assign({}, user, { salesMade: new Set<string>(user.salesMade).add(meta.invoice_id) }))
        default:
            return state
    }
}