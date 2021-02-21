import 'source-map-support/register';

import * as EmailValidator from 'email-validator';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { createAccessToken, createRefreshToken } from '@libs/jsonWebToken';
import { middyfy } from '@libs/lambda';
import { comparePasswords } from '@libs/brcrypt';

import { queryUserByEmail } from '../../../businessLogic/users';
import schema from './schema';

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    const { email, password } = event.body;

    if (!EmailValidator.validate(email)) {
        return formatJSONResponse({
            auth: false, 
            message: 'Email is malformed' 
        }, 400);
    }

    // check that user exists
    const user = await queryUserByEmail(email)

    if(user.length === 0) {
        //early return
        return formatJSONResponse({ auth: false, message: 'Unauthorized' }, 401);
    }

    // check that the password matches. We will use brcypt for this
    const authValid = await comparePasswords(password, user[0].password_hash)

    if(!authValid) {
        //early return
        return formatJSONResponse({ auth: false, message: 'Unauthorized' }, 401);
    }

    //Generate Access Token
    const jwt = createAccessToken({ userId: user[0].userId});

    /*
    Generate Refresh token. 
    Create token so that we can keep the user logged in for like 7days.
    If the user does not login for 7 days we logged the user out. So they will have to login again*/
    const jwtCookie = createRefreshToken({ userId: user[0].userId, tokenVersion: user[0].tokenVersion }); 

    return formatJSONResponse({
        body: {
            token: jwt,
            user: {
                full_name: user[0].full_name,
                store: user[0].store
            }
        },
        message: `successfully logged in`,
        event,
    }, 
    200,
    {
        "Set-Cookie": `jid=${jwtCookie}; HttpOnly`
    })
}

export const main = middyfy(login);