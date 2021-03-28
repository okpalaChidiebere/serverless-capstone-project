export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: "user-pool-${self:provider.stage}", //I could have had the name of this pool in the custom section and refered it there because i created the pool resource
        trigger: "PostConfirmation" as any,
        existing: true, //to indicate that this is an existing pool, if not a new one will be created
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [
          "dynamodb:PutItem",
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}"
    },
    { //this might be the only one you really need
      Effect: "Allow",
      Action: [
          "cognito-idp:AdminAddUserToGroup"
      ],
      Resource: {
        "Fn::GetAtt" : [ "CognitoUserPool" , "Arn" ],
      }
    }
  ],
}
//more on other type of triggers
//https://stackoverflow.com/questions/57403579/how-to-configure-serverless-cognito-lambda-triggers