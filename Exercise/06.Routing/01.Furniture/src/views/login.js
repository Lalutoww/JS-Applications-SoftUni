import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/userAuth.js';

const loginTemplate = (onLogin) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Login User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${onLogin}>
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
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
            </div>
        </form>
`;

//Render template and add onLogin functionality to the template

export function showLogin(ctx) {
   ctx.render(loginTemplate(onLogin));

   async function onLogin(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData); // returns {email: 'peter@abv.bg', password: '123456'}
      if (!data.email || !data.password) {
         return;
      }

      try {
         await login(data.email, data.password); //use login from userAuth import
         ctx.page.redirect('/dashboard'); //redirect to Dashboard (using page from context)
      } catch (err) {
         console.log(err.message);
      }
   }
}
