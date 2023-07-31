import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/userAuth.js';

const registerTemplate = (onRegister) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onRegister}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
`;

export function showRegister(ctx) {
   ctx.render(registerTemplate(onRegister));

   async function onRegister(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData); // returns {email: 'peter@abv.bg', password: '123456'}

      if (!data.email || !data.password || !data.rePass) {
         return;
      }

      if (data.password !== data.rePass) {
         return alert('Passwords are not the same');
      }

      try {
         await register(data.email, data.password);

         ctx.page.redirect('/dashboard');
      } catch (err) {
         console.log(err.message);
      }
   }
}
