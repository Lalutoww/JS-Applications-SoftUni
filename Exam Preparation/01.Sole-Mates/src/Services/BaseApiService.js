import { UserReadableError } from '../errors/UserReadableError.js';

export class BaseAPIService {
   constructor(baseURL) {
      this.baseURL = baseURL;
   }
   async _internalFetchJSON(url, options) {
      try {
         const response = await fetch(url, options);
         if (response.status === 200) {
            return await response.json();
         } else if (response.status === 204) {
            return undefined; // 204 returns no body
         } else {
            let result = await response.json();
            throw new UserReadableError(result.message);
         }
      } catch (e) {
         throw e;
      }
   }
}
