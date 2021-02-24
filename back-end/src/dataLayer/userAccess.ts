import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { User } from '../models/User';

import { createLogger } from '@libs/logger';

const logger = createLogger('userDataAccess');


export class UserAccess {

    constructor(
        private readonly docClient = new AWS.DynamoDB.DocumentClient(), 
        private pid = uuid.v4(),
        private readonly usersTable = process.env.USERS_TABLE,
        private readonly userTableUserIDIndex = process.env.USERS_ID_INDEX,
    ) {}

    async createUser(user: User): Promise<User> {
        logger.info(`Creating a user`, {
            pid: this.pid,
            userId: user.userId
        });

        const params = {
            TableName: this.usersTable,
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

    async findUserByID(userId: string): Promise<User> {
        logger.info(`Getting User by ID`, {
            pid: this.pid,
            userId
        });

        let result: any
        const params = {
            TableName: this.usersTable,
            Key: { userId }
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

    async queryUserByEmail (userEmail: string): Promise<User[]> {
        logger.info(`Getting User By Email`, {
            pid: this.pid,
            userEmail
        });

        let user: any;
        
        const params = {
            TableName: this.usersTable,
            IndexName : this.userTableUserIDIndex,
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: { ":email": userEmail }
        }

        try{
            user = await this.docClient.query(params).promise();
        }catch(err){
            logger.info(`Error`, {
                pid: this.pid,
                err
            });
        }

        return user?.Items as User[];
    }

    /*This gets called for EG: after the user has changed password in their account

    All previous version of refreshToken will not longer be valid and all previous 
    version of AccessToken that exists before we change the token version only have 
    a limited amount of time to be user. Like in our APP 15minutes */
    async revokeRefreshTokenForUser(userId: string) {
        logger.info(`Revoking RefreshToken`, {
            pid: this.pid,
            userId
        });

        const params = {
            TableName: this.usersTable,
            Key: { userId }, //HASHKEY
            UpdateExpression: "ADD tokenVersion :x",
            ExpressionAttributeValues: { ":x": 1 },
            ReturnValues: "UPDATED_NEW",
        }

        const result = await this.docClient.update(params).promise();

        logger.info(`Update statement has completed without error`, { result: result });

    }
}