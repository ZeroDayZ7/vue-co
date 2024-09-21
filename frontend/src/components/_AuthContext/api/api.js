// api.js - logika zapytania używająca ciasteczek
export async function fetchUserRoleFromAPI() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/role`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data.role; // Zwracamy rolę użytkownika
  } catch (error) {
    console.error('Błąd zapytania do API:', error);
    throw error;
  }
}
