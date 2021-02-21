import schema from './schema';

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'login',
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ],
  iamRoleStatements: [
    {
        Effect: "Allow",
        Action: [
            "dynamodb:Query",
        ],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}/index/${self:provider.environment.USERS_ID_INDEX}"
    },
  ]
}