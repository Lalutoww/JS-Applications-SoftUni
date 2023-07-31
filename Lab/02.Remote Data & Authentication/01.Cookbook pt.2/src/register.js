import { home } from "./home.js";

export function register() {
   const main = document.querySelector('main')
   main.innerHTML = `<article id="article-register">
   <h2>Register</h2>
   <form id="register-form">
       <label>E-mail: <input type="text" name="email"></label>
       <label>Password: <input type="password" name="password"></label>
       <label>Repeat: <input type="password" name="rePass"></label>
       <input type="submit" value="Register">
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
      if (data.password != data.rePass) {
         return console.error("Passwords don't match");
      }

      const body = JSON.stringify({
         email: data.email,
         password: data.password,
      });

      try {
         const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
               'Content-Type': 'application/json',
            },
            body,
         });
         const data = await response.json();
         if (response.status == 200) {
            sessionStorage.setItem('authToken', data.accessToken);
            home()
         } else {
            throw new Error(data.message);
         }
      } catch (err) {
         console.error(err.message);
      }
   }
}
