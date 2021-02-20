import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { User } from '../models/User';

import { createLogger } from '@libs/logger';

const logger = createLogger('userDataAccess');


export class UserAccess {

    constructor(
        private readonly docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', convertEmptyValues: true }), 
        private pid = uuid.v4(),
        private readonly todosTable = process.env.USERS_TABLE,
    ) {}

    async createUser(user: User): Promise<User> {
        logger.info(`Creating a user`, {
            pid: this.pid,
            userId: user.userId
        });

        const params = {
            TableName: this.todosTable,
            Item: { ...user }
        }
    
        await this.docClient.put(params).promise();
    
        return user;
    }
}