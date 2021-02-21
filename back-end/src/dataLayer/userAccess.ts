import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { User } from '../models/User';

import { createLogger } from '@libs/logger';

const logger = createLogger('userDataAccess');


export class UserAccess {

    constructor(
        private readonly docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' }), 
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
    
        try{
            await this.docClient.put(params).promise();
        }catch(err){
            logger.info(`Error`, {
                pid: this.pid,
                err
            });
        }
    
        return user;
    }

    async findUser(email: string): Promise<User> {
        logger.info(`Getting user`, {
            pid: this.pid,
            email
        });

        let result: any
        const params = {
            TableName: this.todosTable,
            Key: { email }
        }

        try{
            result = await this.docClient.get(params).promise();
        }catch(err){
            logger.info(`Error`, {
                pid: this.pid,
                err
            });
        }

        return result?.Item as User;
    }
}