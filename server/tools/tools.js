function consoleLogHeaders(req, res, next) {
  console.log(`= 1 => req.headers: ${JSON.stringify(req.headers, null, 2)}`);
  
  if (req.headers.cookie) {
    const cookies = req.headers.cookie.split('; ').reduce((acc, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});

    req.sessionToken = cookies['Oo!SK'];
    req.accessToken = cookies['access_token'];
  } else {
    console.log('=> Brak ciasteczek w nagłówkach.');
  }
  console.log(`next(consoleLogHeaders)`);
  next();
  
}

module.exports = { consoleLogHeaders };
