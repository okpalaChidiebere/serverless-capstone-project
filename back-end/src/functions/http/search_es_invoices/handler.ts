import 'source-map-support/register';
import * as createError from 'http-errors';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createLogger } from '@libs/logger';

import { searchInvoice } from '../../../businessLogic/invoice';

const logger = createLogger('searchInvoicesES');

const search_es_invoices: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {

    logger.info('Processing event: ', {event: event});

    //we now get the user search value from 'query' instead of 'queryStringParameters' which is default due to the 'integration:lambda' settings we made as we customize the auth events 
    const query = event['query']?.q??"";
    try{
        const results = await searchInvoice(query);

        return formatJSONResponse({
            items: results,
        }, 200);
    }catch(err){

        logger.info(`getting search results`, {
            message: 'Problem getting search results',
            err
        });
        throw createError(400, `Problem searching ES cluster`);
    };
}

export const main = middyfy(search_es_invoices);