import type { AWS } from '@serverless/typescript';

import { hello } from './src/functions';
import { requireAuth, login, refreshToken } from './src/functions/auth';
import { createUser, addInvoice, GetUsers, GetInvoices } from './src/functions/http';
import { ConnectHandler, DisconnectHandler } from './src/functions/websocket'; //functions that listen for websocekt connections to our app
import { sendInvoiceNotifications, elasticSearchSync } from './src/functions/dynamoDb';

import { UsersDynamoDBTable, InvoiceDynamoDBTable, 
  WebSocketConnectionsDynamoDBTable, KMSKey, KMSKeyAlias, 
  JwtAuthSecret, InvoicesSearch } from './src/resources';

const serverlessConfiguration: AWS = {
  service: 'serverless-invoice-app',
  frameworkVersion: '2',
  custom: {
    'serverless-iam-roles-per-function': {
      defaultInherit: true //without this the 'provider' level iam permissions will not work
      //https://www.serverless.com/plugins/serverless-iam-roles-per-function
    },
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: [
    'serverless-webpack',
    'serverless-iam-roles-per-function',
    ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: "${opt:stage, 'dev'}",
    region: "ca-central-1",
    apiName: "${self:service}-${self:provider.stage}",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      USERS_TABLE: 'Users-${self:provider.stage}-v0',
      USERS_ID_INDEX: 'UsersIdIndex-${self:provider.stage}',
      INVOICE_TABLE: 'Invoice-${self:provider.stage}-v1',
      WEB_SOCKET_CONNECTIONS_TABLE: "Web-Socket-Connections-${self:provider.stage}", //This table keeps a list of connections for our webScoket API. This way we can easily send notifications to our connections
      JWT_AUTH_SECRET_ID: "JwtAuthSecret-${self:provider.stage}",
      JWT_AUTH_ACESSTOKEN_SECRET_FIELD: "accessTokenSecret",
      JWT_AUTH_REFRESHTOKEN_SECRET_FIELD: "refreshTokenSecret",
    },
    iamRoleStatements: [
      { //read the secret value from this resource
        Effect: "Allow",
        Action: [
            "secretsmanager:GetSecretValue",
        ],
        Resource: { Ref: "JwtAuthSecret" } 
      },
      { //allow to use the KMs Key to decrypt te secret value
        Effect: "Allow",
        Action: [
            "kms:Decrypt",
        ],
        Resource: { "Fn::GetAtt": ["KMSKey", "Arn"]}
      },
    ],
    lambdaHashingVersion: '20201221',
  },
  functions: { 
    hello,
    requireAuth,
    login,
    refreshToken,
    createUser,
    addInvoice,
    ConnectHandler, 
    DisconnectHandler,
    sendInvoiceNotifications,
    GetUsers,
    GetInvoices,
    elasticSearchSync,
  },
  resources: {
    Resources: {
      GatewayResponseDefault4XX: {
        //APIGateway::GatewayResponse type sets correct CORS headers if our custom authorizer fails and denies access to any function
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
          ResponseParameters:{
            "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
            "gatewayresponse.header.Access-Control-Allow-Methods": "'GET,OPTIONS,POST'" //list all the http method that will need authentication in your app. The help witl preFlight request like for forms
          },
          ResponseType: "DEFAULT_4XX",
          RestApiId: {
            Ref: "ApiGatewayRestApi"
          }
          
        }
      },
      UsersDynamoDBTable,
      InvoiceDynamoDBTable,
      WebSocketConnectionsDynamoDBTable,
      KMSKey, 
      KMSKeyAlias, 
      JwtAuthSecret,
      InvoicesSearch,
    }
  }
}

module.exports = serverlessConfiguration;
