import { UserAccess } from '../dataLayer/userAccess';

//import { createLogger } from '@libs/logger';

//const logger = createLogger('usersBusinessLogic');

const userAccess = new UserAccess()


export async function getAllUsers(){
    return await userAccess.getAllUsers();
}
