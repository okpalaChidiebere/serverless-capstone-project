export default {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        AttributeDefinitions: [
            {
              AttributeName: "userId",
              AttributeType: "S"
            },
            {
                AttributeName: "createdAt",
                AttributeType: "S"
            },
            /*
            Maybe be used for index later
            {
                AttributeName: "store",
                AttributeType: "S"
            }*/
        ],
        KeySchema: [
            {
              AttributeName: "userId", //partitionKey
              KeyType: "HASH",
            },
            {
                AttributeName: "createdAt", //sort key
                KeyType: "RANGE"
            },
        ],
        BillingMode: "PAY_PER_REQUEST",
        TableName: "${self:provider.environment.USERS_TABLE}"
    }    
}