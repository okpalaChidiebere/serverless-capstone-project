//https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html
export default {
    Type: "AWS::Cognito::UserPoolClient", //client(eg: web app) to access our pool
    Properties: {
        ClientName: "user-pool-client-${self:provider.stage}",
        UserPoolId: { Ref: "CognitoUserPool" },
        ExplicitAuthFlows: [
            "ADMIN_NO_SRP_AUTH"
        ],
        GenerateSecret: false,
    }
}