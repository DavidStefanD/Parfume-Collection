'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const parfumeStore = {

  store: new JsonStore('./models/parfume-store.json', { parfumeCollection: [] }),
  collection: 'parfumeCollection',
  array: 'parfumes',

  getAllParfumes() {
    return this.store.findAll(this.collection);
  },
  addParfume(id, parfume) {
    this.store.addItem(this.collection, id, this.array, parfume);
},
  removeParfume(id, parfumeId) {
    this.store.removeItem(this.collection, id, this.array, parfumeId);
},


async addcollection(collection, file, response) {
    try {
      collection.picture = await this.store.addToCloudinary(file);
      this.store.addcollection(this.collection, collection);
      response();
    } catch (error) {
      logger.error("Error processing collection:", error);
      response(error);
    }
  },

async removeCollection(id, response) {
    const collection = this.getParfume(id);
    
     if (collection.picture && collection.picture.public_id) {
      try {
        await this.store.deleteFromCloudinary(collection.picture.public_id);
        logger.info("Cloudinary image deleted");
      } catch (err) {
        logger.error("Failed to delete Cloudinary image:", err);
      }
    }
    this.store.removeCollection(this.collection, collection);
    response();
},

updateParfume(collectionId, parfumeId, updatedParfume) {
    this.store.editItem(this.collection, collectionId, parfumeId, this.array, updatedParfume);
},


  
  getParfume(id) {
    return this.store.findOneBy(this.collection, (parfume) => parfume.id === id);
},

 getUserCollections(userid) {
  return this.store.findBy(this.collection, (collection => collection.userid === userid));
},

searchUserCollections(search, userid) {
  return this.store.findBy(
    this.collection,
    (collection => collection.userid === userid && collection.name.toLowerCase().includes(search.toLowerCase())))
}, 

};



export default parfumeStore;
