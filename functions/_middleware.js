import { baseResponse } from "./utils";

async function errorHandling(context) {
  try {
    return await context.next();
  } catch (err) {
    console.log(err.message);
    console.log(err.stack);
    return baseResponse(500, {
      error: err.message,
      trace: err.stack
    })
  }
}

export const onRequest = [errorHandling];
