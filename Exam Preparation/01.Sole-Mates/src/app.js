import page from '../../../node_modules/page/page.mjs'
import { SessionService } from './Services/SesssionService.js';
import { AuthService } from './Services/AuthService.js';
import {BaseCrudApiService} from './Services/BaseCrudApiService.js'
import { render } from '../../../node_modules/lit-html/lit-html.js';
import { NavComponent } from "./components/navigation/nav.js";
import { navTemplate } from "./components/navigation/navTemplate.js";
import { HomeComponent } from "./components/home/home.js";
import { homeTemplate } from "./components/home/homeTemplate.js";
import { LoginComponent } from "./components/login/login.js";
import { loginTemplate } from "./components/login/loginTemplate.js";

const main = document.querySelector('#wrapper main');
const nav = document.querySelector('#wrapper header');

//Router
const router = {
    navigate: page.show, //identical to just page
    redirect: page.redirect
}

//Base URL
const baseURL = `http://localhost:3030`;

//Render Handlers
const renderBody = (template) => render(template, main);
const renderNav = (template) => render(template, nav);

//Services
const sessionService = new SessionService();
const authService = new AuthService(baseURL,sessionService);
const shoesService = new BaseCrudApiService(baseURL, '/data/shoes',sessionService);

//Components
const navComponent = new NavComponent(authService,renderNav,navTemplate,router);
const homeComponent = new HomeComponent(renderBody, homeTemplate);
const loginComponent = new LoginComponent(authService,renderBody,loginTemplate,router);

//Routing
page('/index.html', '/');
page(navComponent.showView);

page('/', homeComponent.showView);
page('/login', loginComponent.showView)
page.start();