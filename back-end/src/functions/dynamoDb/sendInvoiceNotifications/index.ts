export default {
    environment: { //we set two environment variables that will be available to this function
        STAGE: "${self:provider.stage}", //stage of the environent
        API_ID: { //API Gateway endpoint
            Ref: 'WebsocketsApi' //api ID for web sockets API eg zxqk502s2f
      },
    },
    handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
    events: [
      {
        stream: { //gets events fron dynamodb stream
          type: "dynamodb",
          arn: {
            "Fn::GetAtt" : [ "InvoiceDynamoDBTable" , "StreamArn" ], //specifically from our Invoice table
          }
        }
      }
    ],
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
            "dynamodb:Scan",
        ],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.WEB_SOCKET_CONNECTIONS_TABLE}"
      },
      {
        Effect: "Allow",
        Action: [
            "execute-api:ManageConnections", //allow this function to send websocket operations like POST, DELETE and GET methods. But for this project we are doing just POST like .../POST/@connections/*
        ],
        Resource: "arn:aws:execute-api:${self:provider.region}:*:*/${self:provider.stage}/*/@connections/*"
      },
    ]
  }