import * as navigation from './utils/utils.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import { showCreate } from './views/create.js';
import { logout } from './api/users.js';

const user = sessionStorage.getItem('user');
if (user) {
   document.getElementById('logoutBtn').addEventListener('click', (e) => {
      e.preventDefault();
      logout();
      showHome();
      navigation.updateNavBar();
   });
}
const routes = {
   '/register': showRegister,
   '/login': showLogin,
   '/catalog': showCatalog,
   '/details': showDetails,
   '/create': showCreate,
};

//helper

const nav = document.querySelector('nav');
nav.addEventListener('click', onNavigate);

document.getElementById('homeAnchor').addEventListener('click', showHome)

function onNavigate(event) {
   if (event.target.tagName === 'A' && event.target.href) {
      event.preventDefault();

      const url = new URL(event.target.href);

      const view = routes[url.pathname];

      if (typeof view === 'function') {
         view();
      }
   }
}
showHome();
navigation.updateNavBar();
