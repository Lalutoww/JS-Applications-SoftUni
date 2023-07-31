import * as api from './api.js';

export async function getAllFurniture() {
   return api.get('/data/catalog');
}

export async function getFurnitureById(id) {
   return api.get('/data/catalog/' + id);
}

export async function createFurniture(data) {
   return api.post('/data/catalog', data);
}

export async function updateFurnitureById(id, data) {
   return api.put('/data/catalog/' + id, data);
}

export async function deleteFurnitureById(id) {
   return api.del('/data/catalog/' + id);
}
