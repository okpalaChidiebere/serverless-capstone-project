export default {
    Type: "AWS::DynamoDB::Table",
    Properties: {
        AttributeDefinitions: [
            {
                AttributeName: "id",
                AttributeType: "S"
            },
            {
                AttributeName: "total",
                AttributeType: "N" //Number
            },
        ],
        KeySchema: [
            {
              AttributeName: "id", //partitionKey
              KeyType: "HASH",
            },
            {
                AttributeName: "total",
                KeyType: "RANGE" //sortKey
            },
        ],
        BillingMode: "PAY_PER_REQUEST",
        StreamSpecification: {
            StreamViewType: "NEW_IMAGE",
        },
        TableName: "${self:provider.environment.INVOICE_TABLE}"
    }    
}