const baseResponse = async (
  statusCode,
  payload = undefined,
  headers = {}
) => {
  const responseHeaders = {
    "content-type": "application/json;charset=UTF-8",
  };
  if (headers) {
    Object.assign(responseHeaders, headers);
  }
  const body = JSON.stringify(payload);
  return new Response(body, {
    status: statusCode,
    headers: responseHeaders,
  });
};

export { baseResponse };
