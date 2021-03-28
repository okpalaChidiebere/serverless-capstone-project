import 'source-map-support/register';
import * as AWS from 'aws-sdk';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { createLogger } from '@libs/logger';

import { createUser } from '../../../businessLogic/users';

const logger = createLogger('postConfirmation');

const postConfirmation: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

  const addUserParams = {
    GroupName: 'admin', //The name of the group in you cognito user pool that you want to add the user to
    UserPoolId: event['userPoolId'], 
    Username: event['userName'],
  };
  const { sub, name, email } = event['request'].userAttributes;

  try {
    await cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams).promise();
    await createUser({ userId: sub, full_name: name, email, store: "default store name" });
    logger.info('postConfirmation event: ', event);
    return event;
  } catch (e) {
    logger.info('postConfirmation event: ', e);
    return e;
  }

}

export const main = postConfirmation;