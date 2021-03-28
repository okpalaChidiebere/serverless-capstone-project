import type { AWS } from '@serverless/typescript';

import { addInvoice, GetUsers, GetInvoices, searchInvoicesES } from './src/functions/http';
import { ConnectHandler, DisconnectHandler } from './src/functions/websocket'; //functions that listen for websocekt connections to our app
import { sendInvoiceNotifications, elasticSearchSync } from './src/functions/dynamoDb';
import { postConfirmation } from './src/functions/auth';

import { UsersDynamoDBTable, InvoiceDynamoDBTable, 
  WebSocketConnectionsDynamoDBTable, InvoicesSearch, CognitoUserPool, CognitoUserPoolClient, 
  CognitoUserPoolNativeClient, CognitoUserPoolGroupAdmin  } from './src/resources';

const serverlessConfiguration: AWS = {
  service: 'serverless-invoice-app',
  frameworkVersion: '2',
  custom: {
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
      ES_ENDPOINT: { //an evnironment variable that contains the name of the elastic search in this function and upload our dynamoDB items
        "Fn::GetAtt" : [ "InvoicesSearch" , "DomainEndpoint" ],
      }
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    postConfirmation, 
    addInvoice,
    ConnectHandler, 
    DisconnectHandler,
    sendInvoiceNotifications,
    GetUsers,
    GetInvoices,
    elasticSearchSync,
    searchInvoicesES,
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
      GatewayAuthorizer: {
        Type: 'AWS::ApiGateway::Authorizer',
        Properties: {
          AuthorizerResultTtlInSeconds: 300,
          IdentitySource: "method.request.header.Authorization",
          Name: "Cognito",
          RestApiId: { Ref: "ApiGatewayRestApi" },
          Type: "COGNITO_USER_POOLS", 
          ProviderARNs: [
            {
              "Fn::GetAtt" : [ "CognitoUserPool" , "Arn" ],
            },
          ]
          
        }
      },
      UsersDynamoDBTable,
      InvoiceDynamoDBTable,
      WebSocketConnectionsDynamoDBTable,
      InvoicesSearch,
      CognitoUserPool,
      CognitoUserPoolClient,
      CognitoUserPoolNativeClient,
      CognitoUserPoolGroupAdmin,
    }
  }
}

module.exports = serverlessConfiguration;
