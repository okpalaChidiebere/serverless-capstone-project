import 'source-map-support/register';
import * as createError from 'http-errors';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { verifyToken } from '@libs/jsonWebToken';

import { addInvoice } from '../../../businessLogic/invoice';

import schema from './schema';

const accessTokenSecretField = process.env.JWT_AUTH_ACESSTOKEN_SECRET_FIELD;

const addInvoiceHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context: any) => {
    
    let result: any
    try{
        const { body, headers } = event;
        const user = verifyToken(headers['Authorization'], 
        context.JWT_AUTH_SECRET[accessTokenSecretField]);
        result = await addInvoice({ ...body }, user.userId);
        return formatJSONResponse({
            message: 'SuccessFully created item',
            result,
        }, 200);
    }catch(err){
        throw new createError.BadRequest('Problem inserting Item');
    }
}

export const main = middyfy(addInvoiceHandler);