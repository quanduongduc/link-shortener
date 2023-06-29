import { baseResponse } from "../utils"

export async function onRequestGet(context) {
  const { request, env } = context
  try {
    return await baseResponse(200, env);
  } catch (error) {
    return await context.next();
  }
}
