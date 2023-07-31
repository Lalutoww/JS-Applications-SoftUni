import { home } from "./home.js";

export function login() {
   const main = document.querySelector('main')
   main.innerHTML = `<article id="article-login">
   <h2>Login</h2>
   <form id="login-form">
       <label>E-mail: <input type="text" name="email"></label>
       <label>Password: <input type="password" name="password"></label>
       <input type="submit" value="Login">
   </form>
</article>`
   const form = document.querySelector('form');

   form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const formData = new FormData(ev.target);
      onSubmit(
         [...formData.entries()].reduce(
            (p, [k, v]) => Object.assign(p, { [k]: v }),
            {}
         )
      );
   });

   async function onSubmit(data) {
      const body = JSON.stringify({
         email: data.email,
         password: data.password,
      });

      try {
         const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json',
            },
            body,
         });
         const data = await response.json();
         if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
            home();
         } else {
            throw new Error(data.message);
         }
      } catch (err) {
         console.error(err.message);
      }
   }
}
