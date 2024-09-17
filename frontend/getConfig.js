const getConfig = () => {
  const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://c4.ct8.pl'
    : 'http://localhost:3000';

  return {
    API_URL,
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export const config = getConfig();
export const { API_URL } = config;