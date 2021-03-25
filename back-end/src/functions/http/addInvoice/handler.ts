import 'source-map-support/register';
import * as createError from 'http-errors';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { addInvoice } from '../../../businessLogic/invoice';

import schema from './schema';


const addInvoiceHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context: any) => {
    
    let result: any
    const userId = event['cognitoPoolClaims']?.sub;
    try{
        const { body } = event;

        result = await addInvoice({ ...body }, userId);
        return formatJSONResponse({
            message: 'SuccessFully created item',
            result,
        }, 200);
    }catch(err){
        throw new createError.BadRequest('Problem inserting Item');
    }
}

export const main = middyfy(addInvoiceHandler);