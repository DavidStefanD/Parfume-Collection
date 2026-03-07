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
getParfume(id) {
    return this.store.findOneBy(this.collection, (parfume) => parfume.id === id);
},

};

export default parfumeStore;
