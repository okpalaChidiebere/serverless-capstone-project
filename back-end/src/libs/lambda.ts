import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import httpErrorHandler from "@middy/http-error-handler";
import cors from "@middy/http-cors";


export const middyfy = (handler) => {
  return middy(handler)
  .use(middyJsonBodyParser())
  .use(httpErrorHandler())
  .use(cors({
    credentials: true
  }))
}
