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
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (isAuthenticated) {
    const userRole = store.state.userRole;

    if (!userRole) {
      // console.log('Rola nie jest ustawiona, pobieranie roli użytkownika...');
      store.dispatch('fetchUserRole');
    } else {
      // console.log('Rola jest już ustawiona:', userRole);
    }
  }

  if (to.path === '/') {
    // Jeśli użytkownik jest zalogowany, przekieruj do '/main', w przeciwnym razie do '/login'
    next(isAuthenticated ? '/main' : '/login');
    return;
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Jeśli użytkownik próbuje uzyskać dostęp do chronionej ścieżki i nie jest zalogowany, przekierowujemy go na stronę logowania
    next('/login');
    return;
  }else{
    next();
  }

});

export default router;
