// (request, response) => {
//   const { url, method } = request;

//   if (AppRoute.ROOT === url) {
//     response.setHeader(HeaderName.CONTENT_TYPE, HeaderType.TEXT);
//     response.write(
//       getDefaultHTML(`<form action='message' method='POST'>
//     <input name='message' type='text'>
//     <button type='submit'>Send</button>
//     </form>`)
//     );
//     response.end();

//     return;
//   }

//   if (AppRoute.MESSAGE === url && AppMethod.POST === method) {
//     const body = [];

//     request.on('data', (chunk) => {
//       body.push(chunk);
//     });

//     request.on('end', () => {
//       const parsedBody = Buffer.concat(body).toString('utf-8');
//       const [, message] = parsedBody.split('=');

//       response.write(getDefaultHTML(`<p>Success!</p><p>Your message is: ${message}</p>`));
//       fileSystem.writeFile('messages.txt', message, () => {
//         response.statusCode = AppCodes.REDIRECT;
//         // response.setHeader(HeaderType.LOCATION, AppRoute.ROOT);
//         response.end();
//       });
//     });

//     // setTimeout(() => {
//     //   response.statusCode = AppCodes.REDIRECT;
//     //   response.end();
//     // }, REDIRECT_TIME);

//     return;
//   }

//   // console.log(new URL(request.url, `http://${request.headers.host}`));
//   response.write(getDefaultHTML(`<h1>Hello from NODE</h1>`));
//   response.end();
// });

// server.listen(PORT);
