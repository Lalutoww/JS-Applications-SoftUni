export class NavComponent{
    constructor(authService,renderHandler,templateFunction,router){
        //1->class,2->lit-html render,3-> lit-html template,4-> page
        this.authService = authService,
        this.renderHandler = renderHandler,
        this.templateFunction = templateFunction,
        this.router = router,
        this.showView = this._showView.bind(this);
        this.logoutHandler = this._logoutHandler.bind(this);
    }
    async _showView(ctx,next){
        const isUserLoggedIn = this.authService.isUserLoggedIn();
        const template = this.templateFunction(isUserLoggedIn,this.logoutHandler);
        this.renderHandler(template);
        next();
    }

    async _logoutHandler(){
        await this.authService.logout();
        this.router.navigate('/') // Change home to dashboard
    }
}