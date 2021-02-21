import 'source-map-support/register';
import * as jwt from 'jsonwebtoken'
import { User } from '../../../models/User'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createLogger } from '@libs/logger';
import { createAccessToken } from '@libs/jsonWebToken';

import { findUserByID } from '../../../businessLogic/users';

const logger = createLogger('refreshToken');

const refreshToken: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {

    logger.info('refreshToken', event.headers['Cookie']);

    const cookie = event.headers['Cookie']

    if(!cookie) {
        return formatJSONResponse({
            auth: false, 
            accessToken: ''
        }, 400);
    }

    //TODO: get sercret key from resource
    let decodedToken: any;
    try{
        decodedToken = await verifyToken(cookie.split('=')[1], 'tempSecretSeparateFromAccess');
    }catch(e){
        return formatJSONResponse({
            auth: false, 
            accessToken: ''
        }, 401);
    }

    // check that user exists
    const user = await findUserByID(decodedToken.userId)

    //return not found response if we dont find the user
    if(!user){
        return formatJSONResponse({
            auth: false, 
            accessToken: ''
        }, 401);
    }

    /*We make an early return 
    The token version in the palyload could be 0, while we just increated it to 1 in the db due to 
    calling the revoke method maybe by changing password or mannually updated the versin when we detect
     a hack in the account*/
    if(user.tokenVersion !== decodedToken.tokenVersion){
        return formatJSONResponse({
            auth: false, 
            accessToken: ''
        }, 401);
    }


    //Generate Access Token
    const jwt = createAccessToken({ userId: decodedToken.userId, tokenVersion: user.tokenVersion});

    return formatJSONResponse({
        auth: true, 
        accessToken: jwt
    }, 200);
}

async function verifyToken(refreshToken: string, authSecret: string): Promise<User>{ //returns jwt token
  
    return jwt.verify(
        refreshToken,
        authSecret,
        { algorithms: ['HS256'] }
    ) as User;
  }

export const main = middyfy(refreshToken);