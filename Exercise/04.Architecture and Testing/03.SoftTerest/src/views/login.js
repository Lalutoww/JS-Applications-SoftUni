import { login } from '../api/users.js';
import { showSection } from '../utils/utils.js';

const section = document.getElementById('loginPage');

export function showLogin() {
  showSection(section)

   const form = section.querySelector('form');
   form.addEventListener('submit', onLogin);

   async function onLogin() {
      const formData = new FormData(form);
      const email = formData.get('email');
      const password = formData.get('password');

      login(email,password);
   }
}
