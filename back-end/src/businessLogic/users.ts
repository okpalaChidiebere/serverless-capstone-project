import * as uuid from 'uuid';

import { User } from '../models/User';
import { UserAccess } from '../dataLayer/userAccess';

//import { createLogger } from '@libs/logger';
import { generatePassword } from '@libs/brcrypt';

//const logger = createLogger('usersBusinessLogic');

const userAccess = new UserAccess()

export async function createUser({ email, full_name, plainTextPassword, store }): Promise<User> {

    const userId = uuid.v4();
    const date = new Date().toISOString();
    const password_hash = await generatePassword(plainTextPassword);

    return await userAccess.createUser({
        userId,
        full_name,
        password_hash,
        email,
        store,
        createdAt: date,
        updatedAt: date,
        salesMade: [],
        tokenVersion: 0
    })
}

export async function queryUserByEmail (email: string){
    return await userAccess.queryUserByEmail(email)
}

export async function findUserByID (id: string){
    return await userAccess.findUserByID(id)
}

export async function revokeRefreshTokenForUser(id: string){
    return await userAccess.revokeRefreshTokenForUser(id)
}
