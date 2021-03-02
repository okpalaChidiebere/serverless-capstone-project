import schema from './schema';

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'login',
        //cors: true, //set cors to allow prefilghts(OPTIONS method) request when submitting a form
        cors: {
          origin: 'http://localhost:3000',
          headers: [
            'Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent', 
            'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers',
          ],
          allowCredentials: true,
          cacheControl: 'max-age=600, s-maxage=600, proxy-revalidate'
        },
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
            "dynamodb:Query",
        ],
        Resource: "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.USERS_TABLE}/index/${self:provider.environment.USERS_ID_INDEX}"
    },
  ]
}