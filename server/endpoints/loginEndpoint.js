const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');

const { i18n } = require('../language/i18nSetup');

const { 
  generateAccessToken, 
  verifyJwtToken, 
  ClearSessionFromDatabase } = require('../tools/tokenTools');

const serverLogs = require('../tools/server_logs');
const router = express.Router();

// ==========================================================================
// Logowanie
// ==========================================================================
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    // =======================================================================
    // Sprawdzenie czy email lub hasło nie jest puste
    // =======================================================================
    if (!email || !password) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.INCOMPLETE_DATA')}`,
      });
    }
    // =======================================================================
    // Sprawdzenie czy użytkownik istnieje
    // =======================================================================
    const userDetails = await checkUserDetails(email);

    if (!userDetails) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.WRONG_DATA')}`,
      });
    }
    // =======================================================================
    // Sprawdzenie czy użytkownik jest zablokowany
    // =======================================================================
    if (userDetails.userBlock === 1) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.USER_BLOCKED')}`,
      });
    }
    // =======================================================================
    // Sprawdzenie czy użytkownik ma aktywne konto
    // =======================================================================
    if (userDetails.isActivationTokenNull === false) {
      return res.status(400).json({
        messages: 'info',
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.ACCOUNT_ACTIVATE_FALSE')}`,
      });
    }

    if(!userDetails.lastLoginIp === userIp){
      const lastIP = await updateLastLoginIp(email, userIp);
    }
     


     // =======================================================================
    // Sprawdzenie liczby prób logowania
    // =======================================================================
    // if (userDetails.loginAttempts >= 3) {
    //   const timeSinceLastAttempt = Date.now() - new Date(userDetails.lastLoginAttempt).getTime();
    //   const blockTime = 15 * 60 * 1000; // 15 minut w milisekundach

    //   if (timeSinceLastAttempt < blockTime) {
    //     return res.status(403).json({
    //       message: 'Zbyt wiele nieudanych prób logowania. Spróbuj ponownie później.',
    //       messages: 'error',
    //       success: true,
    //       isLoggedIn: false,
    //       code: `${i18n.__('LOGIN.TOO_MANY_ATTEMPTS')}`,
    //       retryAfter: blockTime - timeSinceLastAttempt, // Czas do ponownej próby
    //     });
    //   } else {
    //     // Resetowanie liczby prób po upływie czasu blokady
    //     await resetLoginAttempts(email);
    //   }
    // }


    // =======================================================================
    // Pobieranie ids, email, hasło
    // =======================================================================
   
    
     const user = await getUserByEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.pass);

    if (!isPasswordValid) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.WRONG_DATA')}`,
      });
    }
    console.log(`X: ${JSON.stringify(user)}`);

    const token = await generateAccessToken(user.ids, user.role);

    if (!token) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.WRONG_DATA')}`,
      });
    }

    const isupdateLoginCount = await updateLoginCount(email);

    if (!isupdateLoginCount) {
      return res.status(400).json({
        messages: 'error',
        isLoggedIn: false,
        code: `${i18n.__('LOGIN.WRONG_DATA')}`,
      });
    }
  // =======================================================================
  // Pomyślne logowanie
  // =======================================================================
  // console.log('Ustawiono ciasteczko:', req.cookies);
  res.cookie(process.env.AT_NAME, token.accessToken, {
    httpOnly: true,
    // sameSite: process.env.C_SAMESITE,
    secure: process.env.C_SECURE === 'true', // Upewnij się, że wartość jest logiczna
    maxAge: parseInt(process.env.C_MAX_AGE, 10), // Upewnij się, że wartość jest liczbą
  });
  
  res.cookie(process.env.ST_NAME, token.sessionToken, {
    httpOnly: false,
    // sameSite: process.env.C_SAMESITE,
    secure: process.env.C_SECURE === 'true', // Upewnij się, że wartość jest logiczna
    maxAge: parseInt(process.env.C_MAX_AGE, 10), // Upewnij się, że wartość jest liczbą
  });
  
  console.log('Ustawiam ciasteczka:', {
    accessToken: token.accessToken,
    sessionToken: token.sessionToken,
    httpOnly: true,
    secure: process.env.C_SECURE,
    maxAge: process.env.C_MAX_AGE,
  });
  
  // console.log('Ustawiono ciasteczko:', req.cookies);
   

    return res.status(200).json({
      message: 'Logowanie przebiegło pomyślnie',
      isLoggedIn: true,
      role: 'admin',
    });
  } catch (error) {
    return res.status(500).json({
      message: `Wystąpił błąd podczas logowania`,
      code: `${i18n.__('INTERNAL_SERVER_ERROR')}`,
      messages: 'error',
      isLoggedIn: false,
    });
  }
});
// ==============================================================================
// Logout
// ==============================================================================
router.post('/api/logout', verifyJwtToken, async (req, res, next) => {
  try {
        const userID = req.user.id;
        console.log(`LOGOUT userID${userID}`);
        // return;
        await ClearSessionFromDatabase(userID);
        
        // Usuń ciasteczka zawierające token sesji
        res.clearCookie(process.env.AT_NAME);
        res.clearCookie(process.env.ST_NAME);
        // res.clearCookie(process.env.SESSION_NAME);
        res.status(200).json({
          success: true,
          message: 'Wylogowanie przebiegło pomyślnie',
          isLoggedIn: false,
        });
   
  } catch (error) {
    console.error('Błąd podczas wylogowywania:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
// ===============================================================================
// Funkcja do sprawdzania statusu blokady użytkownika
// ===============================================================================
async function isActivationTokenNull(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT activation_token FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania pola activation_token', error);
        serverLogs(`Błąd podczas sprawdzania pola activation_token', ${error}`);
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(results[0].activation_token === null);
        } else {
          reject(new Error('Nie znaleziono użytkownika'));
        }
      }
    });
  });
}

// ===============================================================================
// Funkcja do sprawdzania statusu blokady użytkownika
// ===============================================================================
async function checkUserBlock(email) {
  return new Promise((resolve, reject) => {
    // Tutaj wykonaj zapytanie do bazy danych, aby sprawdzić pole userBlock
    const query = 'SELECT userBlock FROM users WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania pola userBlock:', error);
        reject(error);
      } else {
        // Jeśli zapytanie zwróciło wynik, zwróć status blokady użytkownika (0 lub 1)
        if (results.length > 0) {
          resolve(results[0].userBlock);
        } else {
          reject(new Error('Nie znaleziono użytkownika'));
        }
      }
    });
  });
}
// ===============================================================================
// UPDATE LOGIN_COUNT +1
// ===============================================================================
async function updateLoginCount(email) {
  return new Promise((resolve, reject) => {
    // Pobierz aktualną liczbę logowań użytkownika
    const queryGetCount = 'SELECT login_count FROM users WHERE email = ?';
    db.query(queryGetCount, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania liczby logowań użytkownika:', error);
        reject(error);
      } else {
        if (results.length > 0) {
          const loginCount = results[0].login_count;
          const updatedLoginCount = loginCount + 1;

          // Zaktualizuj liczbę logowań użytkownika w bazie danych
          const queryUpdateCount = 'UPDATE users SET login_count = ?, login_date = NOW() WHERE email = ?';
          db.query(queryUpdateCount, [updatedLoginCount, email], (error) => {
            if (error) {
              console.error('Błąd podczas aktualizacji liczby logowań użytkownika:', error);
              reject(error);
            } else {
              resolve(true);
            }
          });
        } else {
          reject(new Error('Nie znaleziono użytkownika'));
        }
      }
    });
  });
}
// ===============================================================================
// Sprawdzenie czy użytkownik jest zablokowany i czy aktywował konto
// ===============================================================================
async function checkUserDetails(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT activation_token, userBlock, email, lastLoginIp, loginAttempts, lastLoginAttempt FROM users WHERE email = ? LIMIT 1';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas sprawdzania użytkownika:', error);
        reject(error);
      } else {
        if (results.length > 0) {
          const { activation_token, userBlock, email: userEmail, lastLoginIp = null, loginAttempts = 0, lastLoginAttempt = null } = results[0];
          resolve({
            isActivationTokenNull: activation_token === null,
            userBlock,
            email: userEmail,
            lastLoginIp,
            loginAttempts,
            lastLoginAttempt,
          });
        } else {
          resolve(false);
        }
      }
    });
  });
}

// ===============================================================================
// Funkcja do pobierania użytkownika z bazy danych na podstawie adresu e-mail
// ===============================================================================
async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT pass, ids, role FROM users WHERE email = ? LIMIT 1';
    db.query(query, [email], (error, results) => {
      if (error) {
        console.error('Błąd podczas pobierania użytkownika:', error);
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(results[0]); // Zwróć użytkownika, jeśli został znaleziony
        } else {
          resolve(false); // Zwróć null, jeśli użytkownik nie został znaleziony
        }
      }
    });
  });
}
// ===============================================================================
// Funkcja dodaje IP
// ===============================================================================
async function updateLastLoginIp(email, ip) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET lastLoginIp = ? WHERE email = ?';
    db.query(query, [ip, email], (error, results) => {
      if (error) {
        console.error('Błąd podczas aktualizacji pola lastLoginIp:', error);
        reject(error);
      } else {
        if (results.affectedRows > 0) {
          resolve('Zaktualizowano lastLoginIp');
        } else {
          reject(new Error('Nie znaleziono użytkownika'));
        }
      }
    });
  });
}


module.exports = router;
