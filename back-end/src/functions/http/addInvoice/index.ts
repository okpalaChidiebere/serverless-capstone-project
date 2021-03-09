import schema from './schema';


export default {
    handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
    events: [
      {
        http: {
          method: 'post',
          path: 'addInvoice',
          cors: true,
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
            "dynamodb:UpdateItem",
        ],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}"
    },
      {
          Effect: "Allow",
          Action: [
              "dynamodb:PutItem",
          ],
          Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.INVOICE_TABLE}"
      },
    ]
  }