import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as uuid from 'uuid';
import { Invoice } from '../models/Invoice';
import * as elasticsearch from 'elasticsearch';
import * as httpAwsEs from 'http-aws-es';

import { createLogger } from '@libs/logger';

const logger = createLogger('invoiceDataAccess');

export class InvoiceAccess {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly esClient = new elasticsearch.Client({
            hosts: [ process.env.ES_ENDPOINT ],
            connectionClass: httpAwsEs,
            log: "trace",
            apiVersion: "7.4",
          }),
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

    async getAllInvoiceRecords(): Promise<Invoice[]>{
        logger.info(`getting all Invoice records`, {
            pid: this.pid,
        });

        const result = await this.docClient.scan({
            TableName: this.invoiceTable,
            ProjectionExpression: "#id, #orders, #soldTo, #billTo, #paymentStatus, #paymentType, #date, #total, #amountPaid, #salesPerson",
            ExpressionAttributeNames: {
                "#id":"id",
                "#orders":"orders",
                "#soldTo":"soldTo",
                "#billTo":"billTo",
                "#paymentStatus":"paymentStatus",
                "#paymentType":"paymentType",
                "#date":"date",
                "#total":"total",
                "#amountPaid":"amountPaid",
                "#salesPerson":"salesPerson",
            }
        }).promise();

        logger.info(`Successfully getting all users`, {
            result
        });
        return result.Items as Invoice[];
    }

    async syncInvoiceToES(body: any): Promise<any>{
        logger.info(`synching INSERT invoice to ES`, {
            pid: this.pid,
            invoiceId: body.id
        });

        await this.esClient.index({
            index: 'invoices-index', //You will use this to create an index pattern in Kibana dashboard
            type: 'invoices',
            id: body.id,
            body
        })
    }

    async searchInvoice(query: string): Promise<any>{
        return new Promise((resolve, reject) => {
            this.esClient.search({
                index: 'invoices-index',
                type: 'invoices',
                //size: 25, //default 10
                body: {
                    query: {
                        multi_match: { 
                            query,
                            type: "phrase_prefix",
                            fields: [ "id", "paymentStatus^2", "salesPerson^4", 
                            "total", "amountPaid", "soldTo"]
                        }
                    }
                }
            }).then((resp) => {
                return resolve(resp.hits.hits)
            }).catch((err) => {
                return reject(err.message)
                //console.trace(err.message)
            });
        });
    };
}