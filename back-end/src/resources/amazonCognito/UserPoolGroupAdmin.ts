//https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolgroup.html
export default {
    Type: "AWS::Cognito::UserPoolGroup",
    Properties: {
        Description: "These users have access to all APIs for the app",
        GroupName: "admin",
        Precedence: 0,
        UserPoolId: { Ref: "CognitoUserPool" },
    },
}