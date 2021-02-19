import 'source-map-support/register';
import { verifyToken } from '@libs/jsonWebToken'
import { createLogger } from '@libs/logger'
import type { ValidateEventAPIGatewayTokenAuthorizerEven } from '@libs/apiGateway';


const logger = createLogger('requireAuth');

const requireAuth: ValidateEventAPIGatewayTokenAuthorizerEven = async (event) => {

    logger.info('Authorizing a user', {authoriztionToken: event.authorizationToken});

    try {

        const decodedToken = verifyToken(event.authorizationToken);
        logger.info('User was authorized: ', {
            event: event.authorizationToken,
        });
        return { //return a policy that will allow the user access to any Lambda functions
            principalId: decodedToken.userId, //sub is the ID of user that pass authentication with Auth0
            policyDocument: {
              Version: '2012-10-17',
              Statement: [
                {
                  Action: 'execute-api:Invoke',
                  Effect: 'Allow',
                  Resource: '*' //we can specify the arn(s) of the labda functions if we want
                }
              ]
            }
        };
    }catch(e){

        logger.error('User not authorized', { 
            error: e.message,
        })
        return { //return a policy that will deny the user access to any Lambda functions
            principalId: 'user',
            policyDocument: {
            Version: '2012-10-17',
            Statement: [
              {
                Action: 'execute-api:Invoke',
                Effect: 'Deny',
                Resource: '*'
              }
            ]
          }
        };
    }
}

export const main = requireAuth