import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as uuid from 'uuid';
import { Invoice } from '../models/Invoice';

import { createLogger } from '@libs/logger';

const logger = createLogger('invoiceDataAccess');

export class InvoiceAccess {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private pid = uuid.v4(),
        private readonly invoiceTable = process.env.INVOICE_TABLE,
        private readonly usersTable = process.env.USERS_TABLE,
    ){}

    async addInvoice(invoice: Invoice, userId: string) {
        logger.info(`Adding an Invoice Record`, {
            pid: this.pid,
          invoiceId: invoice.id
        });
    
        try{
            await this.docClient.transactWrite({
                TransactItems: [
                    {
                        Update: {
                            TableName: this.usersTable,
                            Key: { userId }, 
                            //NOTE: although i did not add this attribute while i create the user, PUT/Update in dynamoDb will add this attribute
                            UpdateExpression: "ADD salesMade :newOrderId", //Adding elements to a set of strings. I exppect, the ids for an invoice to be unique
                            ExpressionAttributeValues: { ":newOrderId": this.docClient.createSet([invoice.id]) },
                            //UpdateExpression: "SET salesMade = list_append(salesMade, :newOrderId)", //list_append can be read as a concatenate operation. You give it two lists. 
                            //ExpressionAttributeValues: { ":newOrderId": [invoice.id] },
                        }
                    },
                    {
                        Put: {
                            TableName: this.invoiceTable,
                            Item: invoice
                        }
                    }
                ]
            }).promise();
        }catch(err){
            logger.info(`Error`, {
                pid: this.pid,
                err
            });
            return err
        }
    }
    
}