import page from '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js';

import { showDashboard } from './views/dashboard.js';
// import { showCreate } from './views/create.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { getUserData } from './authService.js';
// import { showDetails } from './views/details.js';
// import { showEdit } from './views/edit.js';
import { logout } from './api/userAuth.js';

//Navigation Template
const navTemplate = (user) => html`
   <a id="catalogLink" href="/">Dashboard</a>
   ${user
      ? html`<div id="user" style="display: none;">
           <a id="createLink" href="create.html" class="active">Create Furniture</a>
           <a id="profileLink" href="my-furniture.html">My Publications</a>
           <a id="logoutBtn" href="javascript:void(0)">Logout</a>
        </div>`
      : html`<div id="guest" style="display: none;">
           <a id="loginLink" href="/login" class="active">Login</a>
           <a id="registerLink" href="register.html">Register</a>
        </div>`}
`;

//UpdateNav Func
function updateNav(ctx, next) {
   render(navTemplate(ctx.user), document.querySelector('nav'));
   next();
}

//Add user obj to context {_id, email, password, accessToken}
function session(ctx, next) {
   const user = getUserData();

   if (user) {
      ctx.user = user;
   }

   next();
}

//Add lit-html render function to context
function decorateContext(ctx, next) {
   ctx.render = function (content) {
      render(content, document.querySelector('div.container'));
   };

   next();
}

//Logout function
function onLogout() {
   logout();

   page.redirect('/dashboard');
}

//Routing
//Firstly add render to context
page(decorateContext);
//Then add user obj to context
page(session);
//Last update navigation bar by rendering it again
page(updateNav);
//DO ALL THAT BEFORE REDIRECTING TO A NEW PAGE USING {PAGE}

page('index.html', '/dashboard');
page('/dashboard', showDashboard);
page('/login', showLogin);
page('/register', showRegister);
// page('/create', showCreate);
// page('/edit/:id', showEdit);
// page('/data/facts/:id', showDetails);
page.start();
