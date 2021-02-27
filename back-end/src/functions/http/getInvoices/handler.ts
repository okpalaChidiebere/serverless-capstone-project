import 'source-map-support/register';

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
        return formatJSONResponse({
            message: 'Problem getting Invoice Records',
            error: err
        }, 400);
    }
    
}

export const main = middyfy(getInvoices);