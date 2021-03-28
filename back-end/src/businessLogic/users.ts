import { UserAccess } from '../dataLayer/userAccess';
import { User } from '../models/User';

//import { createLogger } from '@libs/logger';

//const logger = createLogger('usersBusinessLogic');

const userAccess = new UserAccess()


export async function getAllUsers(){
    return await userAccess.getAllUsers();
}

export async function createUser({ userId, email, full_name, store }): Promise<User> {

    const date = new Date().toISOString();

    return await userAccess.createUser({
        userId,
        full_name,
        email,
        store,
        createdAt: date,
        updatedAt: date,
    });
}