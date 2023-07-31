import { BaseAPIService } from './BaseApiService.js';

export class BaseCrudApiService extends BaseAPIService {
   constructor(baseURL, path, sessionService) {
      //Example path: /data/shoes/shoeID
      super(baseURL);
      this.resourceURL = `${this.baseURL}${path}`;
      this.sessionService = sessionService;
   }

   async getAll() {
      const options = {
         method: 'GET',
      };
      const result = await this._internalFetchJSON(this.resourceURL, options);
      return result;
   }
   async getByID(id) {
    const url = `${this.resourceURL}/${id}`
      const options = {
         method: 'GET',
      };
      const result = await this._internalFetchJSON(url, options);
      return result;
   }
   async create(item) {
      const options = {
         method: 'POST',
         headers:{
            'Content-Type': 'application/json',
            'X-Authorization': this.sessionService.getAccessToken(),
         },
         body: JSON.stringify(item)
      };
      const result = await this._internalFetchJSON(this.resourceURL, options);
      return result;
   }
   async edit(id, item) {
    const url = `${this.resourceURL}/${id}`
    const options = {
       method: 'PUT',
       headers:{
          'Content-Type': 'application/json',
          'X-Authorization': this.sessionService.getAccessToken(),
       },
       body: JSON.stringify(item)
    };
    const result = await this._internalFetchJSON(url, options);
    return result;
 }
 async delete(id) {
    const url = `${this.resourceURL}/${id}`
    const options = {
       method: 'DELETE',
       headers:{
          'X-Authorization': this.sessionService.getAccessToken(),
       },
    };
    const result = await this._internalFetchJSON(url, options);
    return result;
 }
}
