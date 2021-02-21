export default {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        AttributeDefinitions: [
            {
                AttributeName: "email",
                AttributeType: "S"
            },
            /*
            Maybe be used for index later
            {
              AttributeName: "userId",
              AttributeType: "S"
            },
            {
                AttributeName: "store",
                AttributeType: "S"
            }*/
        ],
        KeySchema: [
            {
              AttributeName: "email", //partitionKey
              KeyType: "HASH",
            },
        ],
        BillingMode: "PAY_PER_REQUEST",
        TableName: "${self:provider.environment.USERS_TABLE}"
    }    
}