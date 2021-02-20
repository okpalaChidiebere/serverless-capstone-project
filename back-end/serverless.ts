import type { AWS } from '@serverless/typescript';

import { hello } from './src/functions';
import { requireAuth, login, refreshToken } from './src/functions/auth';
import { createUser } from './src/functions/http';

import { UsersDynamoDBTable } from './src/resources/dynaoDBTables'

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
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { 
    hello,
    requireAuth,
    login,
    refreshToken,
    createUser,
  },
  resources: {
    Resources: {
      UsersDynamoDBTable
    }
  }
}

module.exports = serverlessConfiguration;
