import { baseResponse } from "../utils"

export function onRequestGet(context) {
  try {
    return baseResponse(200, "hello world");
  } catch (error) {
    context.error = error;
    context.next(context);
  }
}
