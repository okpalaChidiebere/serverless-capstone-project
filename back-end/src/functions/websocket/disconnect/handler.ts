import 'source-map-support/register';
import * as AWS  from 'aws-sdk'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { createLogger } from '@libs/logger';

//import { middyfy } from '@libs/lambda';

//import schema from './schema';
const docClient = new AWS.DynamoDB.DocumentClient();

const connectionsTable = process.env.WEB_SOCKET_CONNECTIONS_TABLE;

const logger = createLogger('DisconnectHandler');

const disconnect: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {

    logger.info(`Websocket disconnect`, {
        event,  
    });

    const connectionId = event.requestContext.connectionId
    const key = { //we need the primary key in order to delete an item. I our case the partion key is only we we specified for this table
      id: connectionId
    };

    logger.info(`Removing item with key: `, {
        key,  
    });

    await docClient.delete({
        TableName: connectionsTable,
        Key: key
    }).promise();

    return formatJSONResponse({
        //message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
        //event,
    }, 200);
}

export const main = disconnect;