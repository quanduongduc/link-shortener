const baseResponse = async (
  statusCode,
  message,
  payload = undefined,
  headers = {}
) => {
  const responseHeaders = {
    "content-type": "application/json;charset=UTF-8",
  };
  if (headers) {
    Object.assign(responseHeaders, headers);
  }
  const body = {
    message: message,
    data: payload,
  };
  const json = JSON.stringify(body);
  return new Response(json, {
    status: statusCode,
    headers: responseHeaders,
  });
};

export { baseResponse };
