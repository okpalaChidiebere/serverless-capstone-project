import 'source-map-support/register';
import * as createError from 'http-errors';
import * as jwt from 'jsonwebtoken'
import { User } from '../../../models/User'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createLogger } from '@libs/logger';
import { createAccessToken } from '@libs/jsonWebToken';

import { findUserByID } from '../../../businessLogic/users';
import schema from './schema';

const logger = createLogger('refreshToken');

const refreshToken: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    const { refresh_token } = event.body;

    logger.info('refreshToken', event);

    /*const cookie = event.headers['Cookie']

    if(!cookie) {
        throw new createError.Unauthorized(`accessToken: ''`);
    }*/

    //TODO: get sercret key from resource
    let decodedToken: any;
    try{
        decodedToken = await verifyToken(refresh_token, 'tempSecretSeparateFromAccess');
    }catch(e){
        throw new createError.Unauthorized(`accessToken: ''`);
    }

    // check that user exists
    const user = await findUserByID(decodedToken.userId)

    //return not found response if we dont find the user
    if(!user){
        throw new createError.Unauthorized(`accessToken: ''`);
    }

    /*We make an early return 
    The token version in the palyload could be 0, while we just increated it to 1 in the db due to 
    calling the revoke method maybe by changing password or mannually updated the versin when we detect
     a hack in the account*/
    if(user.tokenVersion !== decodedToken.tokenVersion){
        throw new createError.Unauthorized(`accessToken: ''`);
    }


    //Generate Access Token
    const jwt = createAccessToken({ userId: decodedToken.userId, tokenVersion: user.tokenVersion});

    return formatJSONResponse({
        auth: true, 
        accessToken: jwt,
        user: {
            full_name: user.full_name,
            store: user.store
        }
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