import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { verifyToken } from '@libs/jsonWebToken';

import { addInvoice } from '../../../businessLogic/invoice';

import schema from './schema';

const addInvoiceHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    
    let result: any
    try{
        const { body, headers } = event;
        const user = verifyToken(headers['Authorization']);
        result = await addInvoice({ ...body }, user.userId);
        return formatJSONResponse({
            message: 'SuccessFully created item',
            result,
        }, 200);
    }catch(err){

        return formatJSONResponse({
            message: 'Problem inserting Item',
            error: err || result,
            
        }, 400);
    }
}

export const main = middyfy(addInvoiceHandler);