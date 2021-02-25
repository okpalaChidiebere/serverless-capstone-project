import 'source-map-support/register';
import * as AWS  from 'aws-sdk';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { createLogger } from '@libs/logger';
//import { middyfy } from '@libs/lambda';

//import schema from './schema';
const docClient = new AWS.DynamoDB.DocumentClient();

const connectionsTable = process.env.WEB_SOCKET_CONNECTIONS_TABLE;

const logger = createLogger('ConnectHandler');

const connect: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {
    logger.info(`Websocket connect`, {
        event,  
    });

    const connectionId = event.requestContext.connectionId; //get the connection ID
    const timestamp = new Date().toISOString(); //we can have an idea of when a connection was established. We dont need this though but nice to have

    const item = {
        id: connectionId,
        timestamp
        //You can add more info about the connected user but we will have just two information for this project
    };

    logger.info(`Storing item: `, {
        item,  
    });

    await docClient.put({
        TableName: connectionsTable,
        Item: item
    }).promise();

    return formatJSONResponse({
        message: ``,
    }, 200);
}

export const main = connect;