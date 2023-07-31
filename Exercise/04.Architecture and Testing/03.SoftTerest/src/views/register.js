import { register } from '../api/users.js';
import { showSection } from '../utils/utils.js';

const section = document.getElementById('registerPage');

export function showRegister() {
   showSection(section);

   const form = section.querySelector('form');
   form.addEventListener('submit', onRegister);

   async function onRegister() {
      const formData = new FormData(form);
      const email = formData.get('email');
      const password = formData.get('password');
      const rePass = formData.get('repeatPassword');

      if (email.length < 3) {
         return alert('Email shoud be at least 3 characters long');
      } else if (password.length < 3) {
         return alert('Password shoud be at least 3 characters long');
      } else if (password !== rePass) {
         return alert('Passwords must match');
      }
      register(email, password);
   }
}
