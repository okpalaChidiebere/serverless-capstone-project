export default {
    environment: {
      ES_ENDPOINT: { //an evnironment variable that contains the name of the elastic search in this function and upload our dynamoDB items
        "Fn::GetAtt" : [ "InvoicesSearch" , "DomainEndpoint" ],
      }
    },
    handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
    events: [ //events for which this lambda will be executed
      {
        stream: {
          type: "dynamodb",
          arn: {
            "Fn::GetAtt" : [ "InvoiceDynamoDBTable" , "StreamArn" ],
          }
        }
      }
    ],
    //Why we need permissions here: https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-aws-integrations.html#es-aws-integrations-dynamodb-es
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "es:ESHttpPost",
          "es:ESHttpPut",
        ],
        Resource: {
          "Fn::Sub": "*"
        }
      }
    ]
}
