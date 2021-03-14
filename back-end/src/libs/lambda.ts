import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import httpErrorHandler from "@middy/http-error-handler";
import cors from "@middy/http-cors";
import secretsManager from "@middy/secrets-manager";

const secretId = process.env.JWT_AUTH_SECRET_ID

export const middyfy = (handler) => {
  return middy(handler)
  .use(secretsManager({
    awsSdkOptions: { region: 'ca-central-1' },
    cache: true, //cache the secret value
    cacheExpiryInMillis: 60000, //cache the result for one minute
    throwOnFailedCall: true,  // Throw an error if can't read the secret
    secrets: {  //what secrets to fetch
      JWT_AUTH_SECRET: secretId //we fetch the secret with secretId and store it in JWT_AUTH_SECRET field
    }
  }))
  .use(middyJsonBodyParser())
  .use(httpErrorHandler())
  .use(cors({
    credentials: true
  }))
}
