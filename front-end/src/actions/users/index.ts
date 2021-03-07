import { User } from "../../types/User";
import { RECEIVE_USERS, UsersActionTypes } from "./types";


export const receiveUsers = (users: User[]): UsersActionTypes =>
({
    type: RECEIVE_USERS,
    users,
})