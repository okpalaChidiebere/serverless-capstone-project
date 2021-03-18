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

    const query = event['queryStringParameters']?.q??"";
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