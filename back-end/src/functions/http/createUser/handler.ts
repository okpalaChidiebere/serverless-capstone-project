import 'source-map-support/register';
import * as createError from 'http-errors';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createLogger } from '@libs/logger';
import { createAccessToken, createRefreshToken } from '@libs/jsonWebToken';

import { createUser, queryUserByEmail } from '../../../businessLogic/users';
import schema from './schema';

const logger = createLogger('createTodos');

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    logger.info('Processing event: ', { event });

    const checkUser = await queryUserByEmail(event.body.email)

    if(checkUser.length > 0) {
        //early return
        throw new createError.Forbidden('User may already exist');
        //return formatJSONResponse({ auth: false, message: 'User may already exist' }, 401);
    }

    const user = await createUser({ ...event.body })

    const jwt = createAccessToken({ userId: user.userId });

    const jwtCookie = createRefreshToken({ userId: user.userId, tokenVersion: user.tokenVersion }); 

    return formatJSONResponse({
        body: {
            token: jwt,
            user: {
                full_name: user.full_name,
                store: user.store
            }
        },
        message: `Successfully Inserted`,
        event,
    }, 
    200,
    {
        "Set-Cookie": `jid=${jwtCookie}; HttpOnly`
    });
}

export const main = middyfy(hello);