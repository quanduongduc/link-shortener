import { baseResponse } from "../utils"

export async function onRequestGet(context) {
  try {
    return await baseResponse(200, "hello world");
  } catch (error) {
    return await context.next();
  }
}
