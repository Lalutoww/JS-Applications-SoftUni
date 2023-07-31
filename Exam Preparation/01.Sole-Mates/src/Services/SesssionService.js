const key = 'accessToken';

export class SessionService {
   // no constructor because there will only be functions
   getAccessToken() {
      return sessionStorage.getItem(key);
   }
   setAccessToken(userAccessToken) {
      return sessionStorage.setItem(key, userAccessToken);
   }
   removeAccessToken() {
      return sessionStorage.removeItem(key);
   }
}
