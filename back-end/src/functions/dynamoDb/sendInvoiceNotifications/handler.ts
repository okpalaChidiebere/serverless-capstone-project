import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda';
import 'source-map-support/register';

import { docClient, connectionsTable, sendMessageToClient } from './utils';


const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
    console.log('Processing events batch from DynamoDB', JSON.stringify(event));

    for (const record of event.Records) {

        //we make an early return if the event of a record in a dynamodb is not insert
        if (record.eventName !== 'INSERT') {
            continue;
        }

        //At this point, its an insert record, so we can send notifications
        const newItem = record.dynamodb.NewImage

        const payload = {
            id: newItem.id.S,
            date: newItem.date.S,
            orders: newItem.orders.L,
            soldTo: newItem.soldTo.S,
            billTo: newItem.billTo.S,
            paymentStatus: newItem.paymentStatus.S,
            paymentType: newItem.paymentType.S,
            total: newItem.total.N,
            amountPaid: newItem.amountPaid.N,
            salesPerson: newItem.salesPerson.S,
        };

        const connections = await docClient.scan({
            TableName: connectionsTable
        }).promise();
    
        const messages = connections.Items.map(async connection => {
            return sendMessageToClient(connection.id, payload);
        });

        // make sure they all send
        await Promise.all(messages);
    }
}

export const main = handler;