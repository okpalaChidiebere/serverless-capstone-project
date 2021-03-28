export default {
    Type: "AWS::Cognito::UserPoolClient", //client(eg: native client to pool as required by amplify to import this pool) to access our pool
    Properties: {
        ClientName: "user-pool-native-client-${self:provider.stage}",
        UserPoolId: { Ref: "CognitoUserPool" },
        ExplicitAuthFlows: [
            "ADMIN_NO_SRP_AUTH"
        ],
        GenerateSecret: true,
    }
}