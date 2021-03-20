//https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpool.html
export default {
    Type: "AWS::Cognito::UserPool",
    Properties: {
        UserPoolName: "user-pool-${self:provider.stage}",
        Policies: {
            PasswordPolicy: {
                MinimumLength: 8
            },
        },
        UsernameConfiguration: {
            CaseSensitive: true
        },
        UsernameAttributes: [ 
            "email"
        ],
        Schema: [
            {
                Name: "email",
                Required: true,
            },
            {
                Name: "name",
                Required: true,
            },
        ]
    }
};