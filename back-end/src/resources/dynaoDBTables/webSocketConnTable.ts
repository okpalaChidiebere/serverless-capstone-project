export default {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        AttributeDefinitions: [
            {
                AttributeName: "id",
                AttributeType: "S"
            },
        ],
        KeySchema: [
            {
              AttributeName: "id", //partitionKey
              KeyType: "HASH",
            },
        ],
        BillingMode: "PAY_PER_REQUEST",
        TableName: "${self:provider.environment.WEB_SOCKET_CONNECTIONS_TABLE}"
    }    
}