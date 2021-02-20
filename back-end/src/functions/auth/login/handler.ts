import 'source-map-support/register';

import * as EmailValidator from 'email-validator';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { createAccessToken, createRefreshToken } from '@libs/jsonWebToken';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    const email = event.body.email;
    //const password = event.body.password; //will be used later

    if (!EmailValidator.validate(email)) {
        return formatJSONResponse({
            auth: false, 
            message: 'Email is malformed' 
        }, 400);
    }

    //To replaced with a database check later
    if(email !== 'okpalacollins4@gmail.com') {
        return formatJSONResponse({
            auth: false, 
            message: 'Unauthorized'
        }, 400);
    }

    // check that user exists

    // check that the password matches. We will use brcypt for this

    //Generate Access Token
    const jwt = createAccessToken({ userId: 'S477SRWQZ'});

    /*
    Generate Refresh token. 
    Create token so that we can keep the user logged in for like 7days.
    If the user does not login for 7 days we logged the user out. So they will have to login again*/
    const jwtCookie = createRefreshToken({ userId: 'S477SRWQZ'}); 

    
    return {
        statusCode: 200,
        body: JSON.stringify({
            auth: true,
            token: jwt,
            user: {
                full_name: 'Chidiebere Okpala',
                store: '#123 52 Oguta Road'
            }
        }),
        headers: {
            "Set-Cookie": `jid=${jwtCookie}; HttpOnly`
        }
    };
}

export const main = middyfy(login);