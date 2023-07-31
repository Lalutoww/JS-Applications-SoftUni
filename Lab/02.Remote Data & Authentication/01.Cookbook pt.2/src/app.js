import { create } from './create.js';
import { login } from './login.js';
import { register } from './register.js';
import { home } from './home.js';
import { logout } from './logout.js';

const routes = {
   '/': home,
   '/login': login,
   '/register': register,
   '/logout': logout,
   '/create': create,
};
document.querySelector('nav').addEventListener('click', onNavigation);
function onNavigation(event) {
   if (event.target.tagName === 'A' && event.target.href) {
      event.preventDefault();

      const href = new URL(event.target.href).pathname;

      const view = routes[href];

      if (typeof view == 'function') {
         updateNav();
         view();
      }
   }
}
export function updateNav() {
   if (sessionStorage.getItem('authToken') != null) {
      document.getElementById('user').style.display = 'inline-block';
   } else {
      document.getElementById('guest').style.display = 'inline-block';
   }
}
updateNav();
home();
