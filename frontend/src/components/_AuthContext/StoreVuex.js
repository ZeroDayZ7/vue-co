import { createStore } from 'vuex';
import Cookies from 'js-cookie';
import { fetchUserRoleFromAPI } from './api/api';

const store = createStore({
  state: {
    isAuthenticated: false,
    user: null,
    sessionToken: null,
    customData: null,
    userRole: null,
  },
  mutations: {
    setCustomData(state, data) {
      state.customData = data;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    clearUser(state) {
      state.user = null;
      state.sessionToken = null;
      state.userRole = null;
    },
    setSessionToken(state, token) {
      state.sessionToken = token;
    },
    clearSessionToken(state) {
      state.sessionToken = null;
    },
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
    }
  },
  getters: {
    isAuthenticated(state) {
      const sessionToken = Cookies.get(import.meta.env.VITE_SESSION_KEY);
      // return state.isAuthenticated; // Użyj stanu zamiast cookies
      return sessionToken !== null || sessionToken !== undefined; // Użyj stanu zamiast cookies
    },
    getUserRole(state) {
      return state.userRole;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: "include",
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(JSON.stringify(data));
        if (data.isLoggedIn) {
          commit('setAuthenticated', true);
          commit('setUserRole', data.role);
        }else{
          commit('setAuthenticated', false);
        }
      } catch (error) {
        console.error('Błąd logowania:', error);
      }
    },
    async fetchUserRole({ commit }) {
      try {
        const role = await fetchUserRoleFromAPI();
        commit('setUserRole', role);
        return;       
      } catch (error) {
        console.error('Błąd podczas pobierania roli użytkownika:', error);
      }
    }
  },
});

export default store;
