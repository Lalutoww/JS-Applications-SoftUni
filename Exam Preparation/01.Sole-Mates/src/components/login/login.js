import { UserReadableError } from '../../errors/UserReadableError.js';

export class LoginComponent {
   constructor(authService, renderHandler, templateFunction, router) {
      // check nav.js for info about constructor
      (this.authService = authService),
         (this.renderHandler = renderHandler),
         (this.templateFunction = templateFunction),
         (this.router = router),
         (this.showView = this._showView.bind(this));
      this.loginHandler = this._loginHandler.bind(this);
   }
   async _showView() {
      const template = this.templateFunction(this.loginHandler);
      this.renderHandler(template);
   }

   async _loginHandler(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const email = formData.get('email');
      const password = formData.get('password');

      if (email == '' || password == '') {
         alert('Email and Password must not be empty');
         return;
      }

      const user = { email, password };
      try {
         const result = await this.authService.login(user);
         this.router.navigate('/'); //change home to dashboard
      } catch (e) {
         if (e instanceof UserReadableError) {
            alert(e.message);
         }
      }
   }
}
