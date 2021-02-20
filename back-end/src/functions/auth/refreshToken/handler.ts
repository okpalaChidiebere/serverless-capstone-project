import 'source-map-support/register';
import * as jwt from 'jsonwebtoken'
import { User } from '../../../models/User'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createLogger } from '@libs/logger';
import { createAccessToken } from '@libs/jsonWebToken';



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
        }, 400);
    }

    // check that user exists

    //return not found response if we dont find the user


    //Generate Access Token
    const jwt = createAccessToken({ userId: decodedToken.userId});

    return formatJSONResponse({
        auth: false, 
        accessToken: jwt
    }, 404);
}

async function verifyToken(refreshToken: string, authSecret: string): Promise<User>{ //returns jwt token
  
    return jwt.verify(
        refreshToken,
        authSecret,
        { algorithms: ['HS256'] }
    ) as User;
  }

export const main = middyfy(refreshToken);