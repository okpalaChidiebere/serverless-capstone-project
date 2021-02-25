export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      websocket: {
        route: '$connect', //$connect is a special route in API Gateway sent to a Lambda when a user connects from a websocket
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [
          "dynamodb:PutItem",
      ],
      Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.WEB_SOCKET_CONNECTIONS_TABLE}"
    },
  ]
}