async function errorHandling(context) {
  try {
    return await context.next();
  } catch (err) {
    print(err.message);
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}

export const onRequest = [errorHandling];
