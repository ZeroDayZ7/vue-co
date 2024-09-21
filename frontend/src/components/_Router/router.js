import { createRouter, createWebHistory } from 'vue-router';
import store from '../_AuthContext/StoreVuex';

// import Cookies from 'js-cookie';

import GameMain from '../Game/GameMain.vue';

import CookiesInfo from '../_App/CookiesInfo.vue';
// import ForgotPassword from '../_AuthContext/ForgotPassword.vue';
import ActivateAccount from '../_AuthContext/ActivateAccount.vue';
// import ResetPassword from '../_AuthContext/ResetPassword.vue';
import ContactForm from '../_App/ContactForm.vue';
import ForgotPasswordComponent from '../_AuthContext/ForgotPasswordComponent.vue';
import LoginComponent from '../_AuthContext/LoginComponent.vue';
import RegistrationComponent from '../_AuthContext/RegistrationComponent.vue';
import AdminPanel from '../Game/Admin/AdminPanel.vue';

import UsersPanel from '../Game/Admin/UsersPanel.vue';
import HarmonogramPanel from '../Game/Harmonogram/HarmonogramPanel.vue';
import AddEmployee from '../Game/Admin/Core/addEmployee.vue';
import ShowEmployee from '../Game/Admin/Core/showEmployee.vue';
import SettingsComponent from '../Game/Settings/SettingsComponent.vue';
import NotFound from '../NotFound.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/',
    //   name: 'Main',
    //   components: {
    //     main: LoginComponent,
    //   },
    //   meta: { requiresAuth: false }, // Nie wymaga autoryzacji
    // },

    {
      path: '/',
      redirect: '/login', // Przekierowuje na /login
      meta: { requiresAuth: false }, // Nie wymaga autoryzacji
    },
    { path: '/:catchAll(.*)', component: NotFound },
    // { path: '*', component: NotFound },
    {
      path: '/login',
      name: 'login',
      components: {
        main: LoginComponent,
      },
      meta: { requiresAuth: false }, // Nie wymaga autoryzacji
    },
    {
      path: '/registration',
      name: 'registration',
      components: {
        main: RegistrationComponent,
      },
      meta: { requiresAuth: true }, // Nie wymaga autoryzacji
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      components: {
        main: ForgotPasswordComponent,
      },
      meta: { requiresAuth: false }, // Nie wymaga autoryzacji
    },
    {
      path: '/cookie',
      name: 'Cookie',
      components: {
        main: CookiesInfo,
      },
      meta: { requiresAuth: false }, // Nie wymaga autoryzacji
    },
    {
      path: '/contact',
      name: 'Contact',
      components: {
        main: ContactForm,
      },
      meta: { requiresAuth: false }, // Nie wymaga autoryzacji
    },
    {
      path: '/activation',
      name: 'Activation',
      components: {
        main: ActivateAccount,
      },
      props: true, // Przekazanie parametrów z trasy do komponentu jako props
      meta: { requiresAuth: false }, // Nie wymaga autoryzacji
    },
    {
      path: '/activation/:token',
      name: 'ActivationWithToken',
      components: {
        main: ActivateAccount,
      },
      props: true, // Przekazanie parametrów z trasy do komponentu jako props
      meta: { requiresAuth: false }, // Nie wymaga autoryzacji
    },
    // {
    //   path: '/reset-password',
    //   name: 'ResetPassword',
    //   components: {
    //     main: ResetPassword,
    //   },
    //   props: true, // Przekazanie parametrów z trasy do komponentu jako props
    //   meta: { requiresAuth: false }, // Nie wymaga autoryzacji
    // },
    {
      path: '/main',
      name: 'Game',
      components: {
        mainIn: GameMain,
      },
      meta: { requiresAuth: true }, // Wymaga autoryzacji
    },
    {
      path: '/panel',
      name: 'Panel',
      components: {
        mainIn: AdminPanel, // Główny panel administracyjny
      },
      meta: { requiresAuth: true }, // Wymaga autoryzacji
      children: [
        {
          path: 'settings',
          name: 'Settings',
          components: {
            mainIn2: SettingsComponent,
          },
          meta: { requiresAuth: true }, // Wymaga autoryzacji
        },
        {
          path: 'users',
          components: {
            mainIn2: UsersPanel, // Panel użytkowników ładowany w nazwanym widoku "mainIn"
          },
          meta: { requiresAuth: true }, // Wymaga autoryzacji
          children: [
            {
              path: 'addEmployee',
              name: 'AddEmployee',
              components: {
                mainIn3: AddEmployee,
              },
              meta: { requiresAuth: true }, // Wymaga autoryzacji
            },
            {
              path: 'showEmployee',
              name: 'ShowEmployee',
              components: {
                mainIn3: ShowEmployee,
              },
              meta: { requiresAuth: true }, // Wymaga autoryzacji
            },
          ],
        },
      ],
    },
    {
      path: '/harmonogram',
      name: 'Harmonogram',
      components: {
        mainIn: HarmonogramPanel,
      },
      meta: { requiresAuth: true }, // Wymaga autoryzacji
    },
  ],
});

// Globalna funkcja middleware sprawdzająca autoryzację użytkownika
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  console.log(`isAU: ${isAuthenticated}`);

  // Jeśli użytkownik nie jest uwierzytelniony, sprawdź jego status
  if (!isAuthenticated) {
    await store.dispatch('checkUser');
  }

  // Sprawdź ponownie isAuthenticated po dispatch
  const updatedIsAuthenticated = store.getters.isAuthenticated;
  console.log(`Updated isAU: ${updatedIsAuthenticated}`);

  const userRole = store.state.userRole;

  // Jeśli nie ma roli, pobierz ją
  if (!userRole && (!isAuthenticated || !updatedIsAuthenticated)) {
    console.log('Rola nie jest ustawiona, pobieranie roli użytkownika...');
    await store.dispatch('fetchUserRole'); // Użyj await, aby upewnić się, że rola jest pobierana przed dalszym działaniem
  }

  if (to.path === '/') {
    // Przekierowanie do '/main' lub '/login'
    next((isAuthenticated || updatedIsAuthenticated) ? '/main' : '/login');
  } else if (to.meta.requiresAuth && !updatedIsAuthenticated) {
    // Przekierowanie na stronę logowania, jeśli użytkownik próbuje uzyskać dostęp do chronionej ścieżki
    next('/login');
  } else {
    next(); // Jeśli nic nie blokuje, przejdź do następnej trasy
  }
});


export default router;
