import type { APIGatewayProxyEvent, APIGatewayProxyResult, 
  Handler, APIGatewayTokenAuthorizerEvent, CustomAuthorizerResult } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

type ValidateAPIGatewayTokenAuthorizerEvent = Omit<APIGatewayTokenAuthorizerEvent, symbol> 
export type ValidateEventAPIGatewayTokenAuthorizerEven = Handler<ValidateAPIGatewayTokenAuthorizerEvent, CustomAuthorizerResult>

export const formatJSONResponse = (response: Record<string, unknown>, 
  statusCode: number, 
  headers: {  } = {  }
) => {
  return {
    statusCode,
    headers,
    body: JSON.stringify(response),
  }
}
//headers: { [header: string]: string | number | boolean } = { 'Access-Control-Allow-Origin': '*' }
