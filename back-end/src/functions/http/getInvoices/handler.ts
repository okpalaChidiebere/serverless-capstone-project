import 'source-map-support/register';
import * as createError from 'http-errors';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { createLogger } from '@libs/logger';

import { getAllInvoiceRecords } from '../../../businessLogic/invoice';

const logger = createLogger('getInvoices');

const getInvoices: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {

    logger.info('Processing event: ', { event });

    let results: any;
    try{
        results = await getAllInvoiceRecords();

        return formatJSONResponse({
            items: results
        }, 200);
    }catch(err){

        logger.info(`Problem getting Invoice Records`, {
            err
        });
        
        throw createError(400, `Problem getting Invoice Records`);
    }
    
}

export const main = middyfy(getInvoices);


/*
status: number;
        statusCode: number;
        expose: boolean;
        headers?: {
            [key: string]: string;
        };
        [key: string]: any;
*/