export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'refresh_token',
      }
    }
  ],
  iamRoleStatements: [
    {
        Effect: "Allow",
        Action: [
            "dynamodb:GetItem",
        ],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}"
    },
  ]
}
