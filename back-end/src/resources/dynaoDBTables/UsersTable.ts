export default {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        AttributeDefinitions: [
            {
                AttributeName: "email",
                AttributeType: "S"
            },
            {
                AttributeName: "userId",
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
        ],
        GlobalSecondaryIndexes: [
            {
                IndexName: "${self:provider.environment.USERS_ID_INDEX}",
                KeySchema: [
                    {
                        AttributeName: "email",
                        KeyType: "HASH"
                    }
                ],
                Projection: {
                    ProjectionType: "ALL"
                }
            }
        ],
        BillingMode: "PAY_PER_REQUEST",
        TableName: "${self:provider.environment.USERS_TABLE}"
    }    
}