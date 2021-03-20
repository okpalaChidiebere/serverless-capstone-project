export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'search-es-invoices',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              q: true
            }
          }
        }
      }
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: [
        "es:ESHttpPost",
      ],
      Resource: {
        "Fn::Sub": "*"
      }
    }
  ],
}