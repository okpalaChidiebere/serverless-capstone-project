import 'source-map-support/register';
import * as createError from 'http-errors';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createLogger } from '@libs/logger';

import { getAllUsers } from '../../../businessLogic/users';

const logger = createLogger('getUsers');

const getUsers: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {

    logger.info('Processing event: ', {event: event});

    let results: any;
    try{
        results = await getAllUsers();

        return formatJSONResponse({
            items: results,
        }, 200);
    }catch(err){

        logger.info(`getting all users`, {
            message: 'Problem getting users',
            err
        });

        throw createError(400, `Problem getting users`);
    }
    
}

export const main = middyfy(getUsers);
