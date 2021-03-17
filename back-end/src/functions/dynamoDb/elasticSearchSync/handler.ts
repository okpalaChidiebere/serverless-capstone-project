import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as elasticsearch from 'elasticsearch';
import * as httpAwsEs from 'http-aws-es';

const esHost = process.env.ES_ENDPOINT;

//create an instance of elastic search client to write to ES
const es = new elasticsearch.Client({
  hosts: [ esHost ],
  connectionClass: httpAwsEs,
});


const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
    console.log('Processing events batch from DynamoDB to sync to Elastic Search', JSON.stringify(event));

    for (const record of event.Records) {
        console.log('Processing record', JSON.stringify(record))
        //Check the name of the event
        if (record.eventName !== 'INSERT') {
            //If the event name is not insert we skip this record. Remember, you dont want to 'return'
            //becuase we are in an array. You want the loop to finish and not exit
            continue;
            /*For this capstone this will do. But ideally in a real app, you will have to REMOVE or UPDATE records from ES as well as they are done in dynamoDB
            We will have to use a switch statement  or elseIF on record.eventname for that */
        }

        const newItem = record.dynamodb.NewImage;

        const invoiceId = newItem.id.S;

        const body = {
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

        await es.index({
            index: 'invoices-index', //You will use this to create an index pattern in Kibana dashboard
            type: 'invoices',
            id: invoiceId,
            body
        })
    }
}

export const main = handler;