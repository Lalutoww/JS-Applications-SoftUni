import { BaseAPIService } from './BaseApiService.js';

export class AuthService extends BaseAPIService {
   //Extends BaseApiService and gets SessionService class as a parameter which will be bootstrapped in app.js
   constructor(baseURL, sessionService) {
      super(baseURL);
      this.sessionService = sessionService;
   }

   async login(user) {
      const url = `${this.baseURL}/users/login`;
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(user),
      };
      const userData = await this._internalFetchJSON(url,options);
      this.sessionService.setAccessToken(userData.accessToken);
      return userData;
   }
   async register(user) {
      const url = `${this.baseURL}/users/register`;
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(user),
      };
      const userData = await this._internalFetchJSON(url,options);
      this.sessionService.setAccessToken(userData.accessToken);
      return userData;
   }
   async logout() {
      const url = `${this.baseURL}/users/logout`;
      const options = {
         method: 'GET',
         headers: {
            'X-Authorization': this.sessionService.getAccessToken(),
         }
      };
      const userData = await this._internalFetchJSON(url,options);
      this.sessionService.removeAccessToken();
      return userData;
   }
   isUserLoggedIn(){
        return this.sessionService.getAccessToken() != undefined;
   }
}
