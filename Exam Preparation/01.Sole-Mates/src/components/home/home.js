export class HomeComponent{
    constructor(renderHandler,templateFunction){
        // check nav.js for info about constructor
        this.renderHandler = renderHandler,
        this.templateFunction = templateFunction,
        this.showView = this._showView.bind(this);
    }
    async _showView(){
        const template = this.templateFunction();
        this.renderHandler(template);
    }
}