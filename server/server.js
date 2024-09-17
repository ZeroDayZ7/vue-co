const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const i18n = require('./language/i18nSetup');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT;
const { consoleLogHeaders } = require('./tools/tools');

const registrationEndpoint = require('./endpoints/registrationEndpoint');
const loginEndpoint = require('./endpoints/loginEndpoint');
const contactEndpoint = require('./endpoints/contactEndpoint');
const userEndpoint = require('./endpoints/userEndpoint');

app.use(cookieParser());
app.use(express.json());

 // Middleware ustawiający język
app.use(consoleLogHeaders);
app.use(i18n.setLocale);
// Middleware do serwowania plików statycznych
app.use(express.static(path.join(__dirname, '..', 'frontend/dist')));
// Middleware dla CORS
app.use(
  cors({
    origin: process.env.API_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Length',
    maxAge: parseInt(process.env.C_MAX_AGE),
    optionsSuccessStatus: 204,
  })
);

// Middleware do logowania żądań
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});


app.use(registrationEndpoint);
app.use(loginEndpoint);
app.use(contactEndpoint);
app.use(userEndpoint);




// // Funkcje szyfrowania i deszyfrowania
// const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);
// const text = 'Maharadża';

// function encrypt(text) {
//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   let encrypted = cipher.update(text, 'utf8', 'hex');
//   encrypted += cipher.final('hex');
//   return `${iv.toString('hex')}:${encrypted}`;
// }

// function decrypt(encryptedText) {
//   const [ivHex, encrypted] = encryptedText.split(':');
//   const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
//   let decrypted = decipher.update(encrypted, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }

// // Szyfrowania
// const encryptedText = encrypt(text);
// console.log('Zaszyfrowany tekst:', encryptedText);

//  // Deszyfrowanie
//  const decryptedText = decrypt(encryptedText);
//  console.log('Odszyfrowany tekst:', decryptedText);

// ================ Obsługa żądań, które nie pasują do żadnego endpointu =======================

// const staticFileMiddleware = express.static(path.join(__dirname, '..', 'frontend/dist'));
// app.use(staticFileMiddleware);
// app.get('/', function (req, res) {
//   console.log(`${'/'}`);
//   res.render(path.join(__dirname, '..', 'frontend/dist/index.html'));
// });
// app.get('*', function (req, res) {
//   console.log(`${'*'}`);
//   res.sendFile(path.join(__dirname, '..', 'frontend/dist/index.html'));
// });



// // Obsługuje wszystkie inne żądania, które nie pasują do plików statycznych
app.get('*', (req, res) => {
  console.log("xDDDDD");
  res.sendFile(path.join(__dirname, '..', 'frontend/dist/index.html'));
});

// Nasłuchiwanie na określonym porcie
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
