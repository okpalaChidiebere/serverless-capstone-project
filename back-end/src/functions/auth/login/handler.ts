import 'source-map-support/register';
import * as createError from 'http-errors';
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
        throw new createError.BadRequest(`Email is malformed`);
    }

    // check that user exists
    const user = await queryUserByEmail(email)

    if(user.length === 0) {
        //early return
        throw new createError.Unauthorized(`User may not exist`);
    }

    // check that the password matches. We will use brcypt for this
    const authValid = await comparePasswords(password, user[0].password_hash)

    if(!authValid) {
        //early return
        throw new createError.Unauthorized(`InCorrectPassword`);
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
            access_token: jwt,
            refresh_token: jwtCookie,
            user: {
                full_name: user[0].full_name,
                store: user[0].store
            }
        },
        message: `successfully logged in`,
        event,
    }, 
    200,
    /*{
        "Set-Cookie": `jid=${jwtCookie}; HttpOnly; path=/dev/refresh_token; sameSite=None; Secure`
    }*/)
}

export const main = middyfy(login);